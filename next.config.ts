import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/fullstack-portfolio',
  assetPrefix: '/fullstack-portfolio/',
  
  distDir: 'docs',
}

export default nextConfig
