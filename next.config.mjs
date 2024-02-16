import createJiti from "jiti";

// This is validation for the environment variables early in the build process.
const jiti = createJiti(new URL(import.meta.url).pathname);
jiti("./src/lib/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "urban-wheels.rajputhemant.me",
      },
      {
        protocol: "https",
        hostname: "urban-wheels.vercel.app",
      },
      {
        protocol: "https",
        hostname: "urban-wheels.netlify.app",
      },
    ],
  },
  experimental: {},
  // ...
};

export default nextConfig;
