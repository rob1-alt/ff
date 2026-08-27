import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://getrefine.ai",
        permanent: true,
      },
      {
        source: "/:path*",
        destination: "https://getrefine.ai/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
