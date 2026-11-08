/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@platform/ui', '@platform/api-client', '@platform/shared-types'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
};

export default nextConfig;

