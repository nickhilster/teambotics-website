import { NextRequest, NextResponse } from "next/server";

const subdomainRoutes: Record<string, string> = {
  easybuddy: "/easybuddy",
  feedbackfish: "/feedbackfish",
  poko: "/poko",
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const subdomain = hostname.split(".")[0];
  const targetRoute = subdomainRoutes[subdomain];

  if (!targetRoute) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  if (pathname === targetRoute || pathname.startsWith(`${targetRoute}/`)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? targetRoute : `${targetRoute}${pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|robots.txt|sitemap.xml).*)",
  ],
};
