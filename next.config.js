/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['discord.js', '@discordjs/ws', 'zlib-sync'],
  },
  webpack: (config) => {
    config.externals.push({
      'zlib-sync': 'commonjs zlib-sync',
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
}

module.exports = nextConfig
