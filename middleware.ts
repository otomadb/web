import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.nextUrl.pathname === "/") {
    const session = await getSession(req, res);
    if (session?.user) return NextResponse.redirect(new URL("/home", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/me") ||
    req.nextUrl.pathname === "/home"
  ) {
    const session = await getSession(req, new NextResponse());
    if (!session?.user) return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/", "/home", "/me", "/me/(.*)"],
};
