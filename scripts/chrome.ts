import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as wait } from "node:timers/promises";

interface CdpResponse {
  readonly id: number;
  readonly result?: unknown;
  readonly error?: { readonly message: string };
}

interface CdpTarget {
  readonly type: string;
  readonly webSocketDebuggerUrl: string;
}

export interface EvaluateResult {
  readonly result: { readonly value?: unknown };
  readonly exceptionDetails?: unknown;
}

export interface ChromePage {
  readonly send: <Result>(method: string, params?: object) => Promise<Result>;
  readonly evaluate: (expression: string) => Promise<unknown>;
  readonly open: (url: string) => Promise<void>;
}

export const devServerOrigin = "http://localhost:3000";
const defaultChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const pageSettleMs = 3000;

export function fail(message: string): never {
  throw new Error(message);
}

async function readDevToolsPort(profileDir: string): Promise<number> {
  for (let attempt = 0; attempt < 100; attempt++) {
    const contents = await readFile(join(profileDir, "DevToolsActivePort"), "utf8").catch(() => "");
    const port = Number.parseInt(contents.split("\n")[0] ?? "", 10);
    if (Number.isInteger(port) && port > 0) {
      return port;
    }
    await wait(100);
  }
  fail("Chrome did not start. Set CHROME_PATH if Chrome is installed somewhere else.");
}

async function findPageTarget(port: number): Promise<CdpTarget> {
  for (let attempt = 0; attempt < 50; attempt++) {
    const targets = (await fetch(`http://127.0.0.1:${port}/json/list`)
      .then((response) => response.json())
      .catch(() => [])) as readonly CdpTarget[];
    const page = targets.find((target) => target.type === "page");
    if (page !== undefined) {
      return page;
    }
    await wait(100);
  }
  fail("Could not find a Chrome page to open.");
}

function connect(target: CdpTarget) {
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map<number, (response: CdpResponse) => void>();
  let nextId = 0;

  socket.addEventListener("message", (event: MessageEvent<string>) => {
    const message = JSON.parse(event.data) as Partial<CdpResponse>;
    if (typeof message.id === "number") {
      pending.get(message.id)?.(message as CdpResponse);
      pending.delete(message.id);
    }
  });

  const send = async <Result>(method: string, params: object = {}): Promise<Result> => {
    const id = ++nextId;
    const response = await new Promise<CdpResponse>((resolveResponse) => {
      pending.set(id, resolveResponse);
      socket.send(JSON.stringify({ id, method, params }));
    });
    if (response.error !== undefined) {
      fail(`${method} failed: ${response.error.message}`);
    }
    return response.result as Result;
  };

  const opened = new Promise<void>((resolveOpen, rejectOpen) => {
    socket.addEventListener("open", () => resolveOpen());
    socket.addEventListener("error", () => rejectOpen(new Error("DevTools connection failed")));
  });

  return { opened, send, close: () => socket.close() };
}

export async function withChromePage<Result>(
  run: (page: ChromePage) => Promise<Result>,
): Promise<Result> {
  const profileDir = await mkdtemp(join(tmpdir(), "portfolio-chrome-"));
  const chrome: ChildProcess = spawn(
    process.env.CHROME_PATH ?? defaultChromePath,
    ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profileDir}`, "about:blank"],
    { stdio: "ignore" },
  );

  try {
    const port = await readDevToolsPort(profileDir);
    const devTools = connect(await findPageTarget(port));
    await devTools.opened;
    await devTools.send("Page.enable");

    const evaluate = async (expression: string): Promise<unknown> => {
      const { result } = await devTools.send<EvaluateResult>("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      return result.value;
    };

    const open = async (url: string): Promise<void> => {
      await devTools.send("Page.navigate", { url });
      await wait(pageSettleMs);
      await evaluate("document.fonts.ready.then(() => true)");
    };

    try {
      return await run({ send: devTools.send, evaluate, open });
    } finally {
      devTools.close();
    }
  } finally {
    const exited = once(chrome, "exit");
    chrome.kill();
    await Promise.race([exited, wait(5000)]);
    await rm(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}
