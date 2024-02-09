const { hostname } = require('os');

const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gyuewfxjtepmucihzmss.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
};

module.exports = removeImports(nextConfig);