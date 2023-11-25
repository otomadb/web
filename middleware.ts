import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.nextUrl.pathname === "/") {
    const session = await getSession(req, res);
    if (session?.user) return NextResponse.redirect(new URL("/me", req.url));
  }
}
