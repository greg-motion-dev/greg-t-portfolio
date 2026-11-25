import type { MetadataRoute } from "next";

const aiTrainingCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: [...aiTrainingCrawlers], disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
  };
}
