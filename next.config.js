/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    VERCEL_API_URL: process.env.VERCEL_API_URL,
    VERCEL_WEBHOOK_URL: process.env.VERCEL_WEBHOOK_URL,
  },
  images: {
    domains: ['placehold.it'],
  },
  optimizeFonts: false,
};

module.exports = nextConfig;
