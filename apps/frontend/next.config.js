/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['shared', 'ui-components'],
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Only enable this in development.
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors. Only enable this in development.
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
