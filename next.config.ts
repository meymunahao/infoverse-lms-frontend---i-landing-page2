import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudinary-res.thenational.academy',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
