import { NextRequest, NextResponse } from "next/server";

const subdomainRoutes: Record<string, string> = {
  easybuddy: "/easybuddy",
  feedbackfish: "/feedbackfish",
  poko: "/poko",
  symphony: "/symphony",
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const subdomain = hostname.split(".")[0];
  const targetRoute = subdomainRoutes[subdomain];

  const pathname = request.nextUrl.pathname;
  const effectivePath =
    targetRoute && !(pathname === targetRoute || pathname.startsWith(`${targetRoute}/`))
      ? pathname === "/"
        ? targetRoute
        : `${targetRoute}${pathname}`
      : pathname;

  // AgentSurface: route "*.md" discovery requests to a dedicated internal handler.
  // A bare "/<path>.md" would otherwise collide with the existing [lang] dynamic
  // segment at the app root — Next.js resolves that single dynamic segment before a
  // catch-all gets a chance for a single path segment. See
  // app/agentsurface-md/[...agentsurfaceSlug]/route.ts. (Note: a leading-underscore
  // folder name was tried first but Next.js treats "_name" as a private, routing-
  // excluded folder, so the segment must not start with "_".)
  if (effectivePath.endsWith(".md")) {
    const url = request.nextUrl.clone();
    url.pathname = `/agentsurface-md${effectivePath}`;
    return NextResponse.rewrite(url);
  }

  if (effectivePath !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = effectivePath;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|robots.txt|sitemap.xml).*)",
  ],
};
