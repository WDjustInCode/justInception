import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.wsimg.com",
      },
    ],
  },
};

export default nextConfig;

