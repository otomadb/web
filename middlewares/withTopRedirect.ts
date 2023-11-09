import { getSession } from "@auth0/nextjs-auth0/edge";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export function withTopRedirect(middleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    if (req.nextUrl.pathname !== "/") return middleware(req, event);

    const res = NextResponse.next();
    const session = await getSession(req, res);

    if (session?.user) return NextResponse.redirect(new URL("/me", req.url));

    return middleware(req, event);
  };
}
