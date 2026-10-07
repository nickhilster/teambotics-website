import { NextRequest, NextResponse } from "next/server";

const subdomainRoutes: Record<string, string> = {
  easybuddy: "/easybuddy",
  poko: "/poko",
  symphony: "/symphony",
  codexsidecar: "/codexsidecar",
  muse: "/muse",
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const subdomain = hostname.split(".")[0];
  const targetRoute = subdomainRoutes[subdomain];

  // FeedbackFish is a NikDesign product; the old subdomain redirects there.
  if (subdomain === "feedbackfish") {
    return NextResponse.redirect("https://www.nikdesign.ca/feedbackfish", 308);
  }

  const pathname = request.nextUrl.pathname;

  // Serve the standalone Muse proposal page and its audio assets from public/muse.
  // The HTML is rewritten at the host root, so its relative `assets/...` URLs
  // arrive at `/assets/...` and need the same host-scoped prefix.
  if (subdomain === "muse") {
    const musePath =
      pathname === "/" || pathname === "/muse" || pathname === "/muse/"
        ? "/muse/index.html"
        : pathname.startsWith("/muse/")
          ? pathname
          : `/muse${pathname}`;

    if (musePath !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = musePath;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

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
