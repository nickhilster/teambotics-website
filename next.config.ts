import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.gamma.app",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "https://blog.teambotics.app/",
        permanent: false,
      },
      {
        source: "/blog/:path*",
        destination: "https://blog.teambotics.app/:path*",
        permanent: false,
      },
      {
        source: "/articles",
        destination: "https://blog.teambotics.app/",
        permanent: false,
      },
      {
        source: "/articles/:path*",
        destination: "https://blog.teambotics.app/:path*",
        permanent: false,
      },
      {
        source: "/insights",
        destination: "https://blog.teambotics.app/",
        permanent: false,
      },
      {
        source: "/insights/:path*",
        destination: "https://blog.teambotics.app/:path*",
        permanent: false,
      },
      {
        source: "/field-notes",
        destination: "https://blog.teambotics.app/",
        permanent: false,
      },
      {
        source: "/field-notes/:path*",
        destination: "https://blog.teambotics.app/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
