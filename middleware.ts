import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["ja", "en"],
  defaultLocale: "ja",
  urlMappingStrategy: "rewriteDefault",
});

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    const res = NextResponse.next();
    const session = await getSession(req, res);
    if (session?.user) return NextResponse.redirect(new URL("/home", req.url));
  }

  return I18nMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
