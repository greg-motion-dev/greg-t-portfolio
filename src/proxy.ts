import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const defaultPrefix = `/${defaultLocale}`;

function hasLocalePrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (hasLocalePrefix(pathname, defaultPrefix)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultPrefix.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const isPrefixed = locales.some((locale) => hasLocalePrefix(pathname, `/${locale}`));
  if (isPrefixed) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? defaultPrefix : `${defaultPrefix}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
