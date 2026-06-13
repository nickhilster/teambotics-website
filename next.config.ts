import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/recruiterbuddy",
        destination: "/products/recruiterbuddy",
        permanent: true,
      },
      // Product sites now live on their own domains
      {
        source: "/MdownManager",
        destination: "https://mdownmanager.com",
        permanent: true,
      },
      {
        source: "/mdownmanager",
        destination: "https://mdownmanager.com",
        permanent: true,
      },
      {
        source: "/RedactorBuddy",
        destination: "https://redactorbuddy.com",
        permanent: true,
      },
      {
        source: "/redactorbuddy",
        destination: "https://redactorbuddy.com",
        permanent: true,
      },
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.gamma.app",
      },
    ],
  },
};

export default nextConfig;
