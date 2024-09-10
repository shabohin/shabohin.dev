/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/resume.pdf',
        destination: '/api/resume.pdf',
      },
    ]
  },
}

export default nextConfig
