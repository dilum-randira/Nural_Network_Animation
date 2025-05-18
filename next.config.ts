import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This setting allows production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This setting allows production builds to successfully complete even with TypeScript errors
    ignoreBuildErrors: true,
  },
  output: "standalone", // This helps with deploying to various platforms
};

export default nextConfig;
