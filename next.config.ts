import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // One 404 for the whole site; needed because each locale has its own root
  // layout (see components/site/RootHtml.tsx).
  experimental: {
    globalNotFound: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
