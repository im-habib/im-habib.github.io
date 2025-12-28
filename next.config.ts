import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactCompiler: true,
  images: { unoptimized: true },
  basePath: "https://habib.scholariest.com"
};

export default nextConfig;
