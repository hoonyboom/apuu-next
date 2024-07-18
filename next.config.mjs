import path from 'path';
const __dirname = path.resolve();

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
