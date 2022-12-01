/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://december-and-company.herokuapp.com/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
