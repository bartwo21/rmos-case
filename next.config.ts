import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.rmosyazilim.com",
      },
    ],
  },
};

export default nextConfig;
