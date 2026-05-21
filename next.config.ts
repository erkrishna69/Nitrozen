import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://n7.nexcloud.in:2030/api/:path*', // Proxy to HTTP Bot API
      },
    ];
  },
};

export default nextConfig;
