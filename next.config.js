/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
          "facebook.com",
          "instagram.com",
          "linkedin.com",
        ],
      },
}

module.exports = nextConfig
