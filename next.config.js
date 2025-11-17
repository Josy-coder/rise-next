/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Configure redirects if needed
  async redirects() {
    return []
  },
  // Configure rewrites if needed
  async rewrites() {
    return []
  },
}

module.exports = nextConfig
