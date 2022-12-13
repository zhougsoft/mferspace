/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['plain.mfers.dev'],
  },
  compiler: {
    styledComponents: true,
  },
}
