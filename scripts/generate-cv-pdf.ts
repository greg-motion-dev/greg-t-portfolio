import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import { parseArgs } from "node:util";

interface CdpResponse {
  readonly id: number;
  readonly result?: unknown;
  readonly error?: { readonly message: string };
}

interface CdpTarget {
  readonly type: string;
  readonly webSocketDebuggerUrl: string;
}

interface EvaluateResult {
  readonly result: { readonly value?: unknown };
  readonly exceptionDetails?: unknown;
}

interface PrintResult {
  readonly data: string;
}

const projectRoot = resolve(import.meta.dirname, "..");
const cvLocales = {
  en: { path: "/cv", fileName: "greg-telakis-cv.pdf" },
  de: { path: "/de/cv", fileName: "greg-telakis-cv-de.pdf" },
} as const;
const devServerOrigin = "http://localhost:3000";
const defaultChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const edgeTrimPoints = 0.5;

const { values: options } = parseArgs({
  options: {
    locale: { type: "string", default: "en" },
    url: { type: "string" },
    out: { type: "string" },
  },
});

function fail(message: string): never {
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
  fail("Could not find a Chrome page to print.");
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

function trimRightEdge(pdf: Buffer): Buffer {
  const text = pdf.toString("latin1");
  const match = /\/MediaBox \[0 0 ([0-9.]+) ([0-9.]+)\]/.exec(text);
  if (match === null) {
    return pdf;
  }
  const [box, width] = match;
  const decimals = width.split(".")[1]?.length ?? 0;
  const trimmedWidth = (Number.parseFloat(width) - edgeTrimPoints).toFixed(decimals);
  const trimmedBox = box.replace(width, trimmedWidth);
  if (trimmedBox.length !== box.length) {
    return pdf;
  }
  return Buffer.from(text.replaceAll(box, trimmedBox), "latin1");
}

const overflowScript = `(() => {
  const article = document.querySelector("article");
  return article ? article.scrollHeight - article.clientHeight : -1;
})()`;

function isCvLocale(value: string): value is keyof typeof cvLocales {
  return Object.hasOwn(cvLocales, value);
}

async function main(): Promise<void> {
  if (!isCvLocale(options.locale)) {
    fail(`Unknown locale "${options.locale}". Use ${Object.keys(cvLocales).join(" or ")}.`);
  }
  const cvLocale = cvLocales[options.locale];
  const url = options.url ?? `${devServerOrigin}${cvLocale.path}`;
  const outPath = resolve(options.out ?? join(projectRoot, "public", cvLocale.fileName));

  const profileDir = await mkdtemp(join(tmpdir(), "cv-pdf-"));
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
    await devTools.send("Page.navigate", { url });
    await wait(3000);
    await devTools.send("Runtime.evaluate", {
      expression: "document.fonts.ready.then(() => true)",
      awaitPromise: true,
    });

    const overflow = await devTools.send<EvaluateResult>("Runtime.evaluate", {
      expression: overflowScript,
      returnByValue: true,
    });
    if (overflow.result.value === -1) {
      fail(`No CV found at ${url}. Start the site with npm run dev or npm run start.`);
    }
    if (typeof overflow.result.value === "number" && overflow.result.value > 0) {
      fail(`The CV overflows its page by ${overflow.result.value}px. Shorten the content first.`);
    }

    const { data } = await devTools.send<PrintResult>("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });
    devTools.close();

    await writeFile(outPath, trimRightEdge(Buffer.from(data, "base64")));
    console.log(`✓ CV saved to ${outPath}`);
  } finally {
    const exited = once(chrome, "exit");
    chrome.kill();
    await Promise.race([exited, wait(5000)]);
    await rm(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

try {
  await main();
} catch (error) {
  console.error(`✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
