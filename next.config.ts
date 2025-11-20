import { withWhopAppConfig } from "@whop/react/next.config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "**" }],
  },
  transpilePackages: ['radix-ui', '@radix-ui/react-accessible-icon'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.whop.com https://whop.com",
          },
        ],
      },
    ];
  },
};

export default withWhopAppConfig(nextConfig);
