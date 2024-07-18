import path from 'path';
const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },
};

export default nextConfig;
