/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "experimental-edge",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["nicovideo.cdn.nimg.jp", "img.cdn.nimg.jp"],
  },
  experimental: {
    appDir: true,
  },
};
module.exports = nextConfig;
