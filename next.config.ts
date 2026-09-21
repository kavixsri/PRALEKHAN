import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/PRALEKHAN",
  assetPrefix: "/PRALEKHAN/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
