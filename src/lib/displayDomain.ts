const ARCHIVE_PATTERN = /^https?:\/\/web\.archive\.org\/web\/[^/]+\/(https?:\/\/.+)$/;

export function displayDomain(href: string): string {
  const archived = ARCHIVE_PATTERN.exec(href);
  const target = archived?.[1] ?? href;
  try {
    const url = new URL(target);
    const path = url.pathname.replace(/\/$/, "");
    return `${url.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return "";
  }
}
