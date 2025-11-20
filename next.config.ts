import { withWhopAppConfig } from "@whop/react/next.config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "**" }],
  },
  transpilePackages: ['radix-ui', '@radix-ui/react-accessible-icon'],
};

export default withWhopAppConfig(nextConfig);
