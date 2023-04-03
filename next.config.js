/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  async rewrites () {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:3000/api/:slug*',
      },
    ]
  },
}

module.exports = nextConfig
