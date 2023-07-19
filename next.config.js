/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
  },
  images: {
    domains: ['placehold.it'],
  },
  images: {
    domains: ['placehold.it'],
  },
};

module.exports = nextConfig;
