/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "lh3.googleusercontent.com",
      "media.newyorker.com",
    ],
  },
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:slug*",
        destination: "http://localhost:3000/api/v1/:slug*",
      },
    ]
  },
}

module.exports = nextConfig
