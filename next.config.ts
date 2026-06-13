import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Pin the workspace root to this project — a stray lockfile in the home
  // directory otherwise makes Next.js infer the wrong root for file tracing.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
