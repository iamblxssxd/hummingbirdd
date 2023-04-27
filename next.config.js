/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  async rewrites () {
    return [
      {
        source: '/api/v1/:slug*',
        destination: 'http://localhost:3000/api/v1/:slug*',
      },
    ]
  },
}

module.exports = nextConfig
