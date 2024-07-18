import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname),
      '%': path.join(__dirname, 'components')
    }
  }
};

export default nextConfig;
