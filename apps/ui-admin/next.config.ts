import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  
  // Transpile shared workspace packages
  transpilePackages: [
    "@digital-market/api-client",
    "@digital-market/shared-types",
  ],

  // Optimize production build
  reactStrictMode: true,
  
  // Enable static optimization where possible
  output: "standalone",

  // Configure image domains if needed
  images: {
    remotePatterns: [],
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Forge Admin",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  },
};

export default nextConfig;
