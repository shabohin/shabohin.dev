/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/resume.pdf',
        destination: '/api/resume.pdf',
      },
      {
        source: '/cv.pdf',
        destination: '/api/cv.pdf',
      },
    ]
  },
}

export default nextConfig
