/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["nicovideo.cdn.nimg.jp", "img.cdn.nimg.jp"],
  },
  experimental: {
    appDir: true,
  },
  redirects() {
    return [
      {
        source: "/signin",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/signup",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
