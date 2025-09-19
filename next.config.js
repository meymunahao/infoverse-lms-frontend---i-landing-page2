/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'picsum.photos', 'cdn.pixabay.com'],
  },
  compress: true,
};

module.exports = nextConfig;
