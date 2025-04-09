import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // it is essential to while fetch image from API, we need to provide the domain
  images: {
    domains: ["files.stripe.com"],
  }
};

export default nextConfig;
