import { writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { devServerOrigin, fail, withChromePage } from "./chrome.ts";

interface PrintResult {
  readonly data: string;
}

const projectRoot = resolve(import.meta.dirname, "..");
const cvLocales = {
  en: { path: "/cv", fileName: "greg-telakis-cv.pdf" },
  de: { path: "/de/cv", fileName: "greg-telakis-cv-de.pdf" },
} as const;
const edgeTrimPoints = 0.5;

const { values: options } = parseArgs({
  options: {
    locale: { type: "string", default: "en" },
    url: { type: "string" },
    out: { type: "string" },
  },
});

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

  const pdf = await withChromePage(async (page) => {
    await page.open(url);

    const overflow = await page.evaluate(overflowScript);
    if (overflow === -1) {
      fail(`No CV found at ${url}. Start the site with npm run dev or npm run start.`);
    }
    if (typeof overflow === "number" && overflow > 0) {
      fail(`The CV overflows its page by ${overflow}px. Shorten the content first.`);
    }

    const { data } = await page.send<PrintResult>("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });
    return Buffer.from(data, "base64");
  });

  await writeFile(outPath, trimRightEdge(pdf));
  console.log(`✓ CV saved to ${outPath}`);
}

try {
  await main();
} catch (error) {
  console.error(`✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
