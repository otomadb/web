/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "nicovideo.cdn.nimg.jp",
      "img.cdn.nimg.jp",
      "i.ytimg.com",
      "s.gravatar.com",
      "secure.gravatar.com",
    ],
    unoptimized: process.env.NODE_ENV === "production",
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
    mdxRs: true,
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

const withMDX = require("@next/mdx")();

module.exports = withMDX(nextConfig);
