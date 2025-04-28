import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,


  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '0db050a7012aa9001c4c2f363030fad1.r2.cloudflarestorage.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Webpack configuration if needed
  webpack(config) {
    return config;
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();