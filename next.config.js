/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["nicovideo.cdn.nimg.jp"],
  },
  experimental: {
    appDir: true,
  },
}
module.exports = nextConfig
