import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const subdomainRoutes: Record<string, string> = {
  "easybuddy.teambotics.app": "/easybuddy",
  "feedbackfish.teambotics.app": "/feedbackfish",
};

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  const targetRoute = host ? subdomainRoutes[host] : undefined;

  if (!targetRoute) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = targetRoute;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|robots.txt|sitemap.xml).*)",
  ],
};
