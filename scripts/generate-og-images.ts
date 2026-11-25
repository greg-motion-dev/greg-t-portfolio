import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { devServerOrigin, fail, withChromePage } from "./chrome.ts";

interface ScreenshotResult {
  readonly data: string;
}

interface CardBox {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = join(projectRoot, "public", "og");
const cardLocales = [
  { path: "/og-card", fileName: "greg-telakis-en.png" },
  { path: "/de/og-card", fileName: "greg-telakis-de.png" },
] as const;
const cardWidth = 600;
const cardHeight = 315;
const pixelRatio = 2;

const hideDevOverlayScript = `(() => {
  const style = document.createElement("style");
  style.textContent = "nextjs-portal { display: none !important; }";
  document.head.append(style);
  return true;
})()`;

const cardBoxScript = `(() => {
  const card = document.querySelector("[data-og-card]");
  if (!card) return null;
  const { x, y, width, height } = card.getBoundingClientRect();
  return { x, y, width, height };
})()`;

function isCardBox(value: unknown): value is CardBox {
  return typeof value === "object" && value !== null && "width" in value && "height" in value;
}

async function main(): Promise<void> {
  await mkdir(outputDir, { recursive: true });

  await withChromePage(async (page) => {
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: cardWidth + 200,
      height: cardHeight + 200,
      deviceScaleFactor: pixelRatio,
      mobile: false,
    });

    for (const card of cardLocales) {
      const url = `${devServerOrigin}${card.path}`;
      await page.open(url);
      await page.evaluate(hideDevOverlayScript);

      const box = await page.evaluate(cardBoxScript);
      if (!isCardBox(box)) {
        fail(`No preview card found at ${url}. Start the site with npm run dev.`);
      }
      if (Math.round(box.width) !== cardWidth || Math.round(box.height) !== cardHeight) {
        fail(
          `The card at ${url} is ${box.width}×${box.height}, expected ${cardWidth}×${cardHeight}.`,
        );
      }

      const { data } = await page.send<ScreenshotResult>("Page.captureScreenshot", {
        format: "png",
        clip: { ...box, scale: 1 },
      });
      const outPath = join(outputDir, card.fileName);
      await writeFile(outPath, Buffer.from(data, "base64"));
      console.log(`✓ Preview image saved to ${outPath}`);
    }
  });
}

try {
  await main();
} catch (error) {
  console.error(`✗ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
