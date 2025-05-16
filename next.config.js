const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // The following is needed for GitHub Pages deployment
  // The basePath should match your GitHub repository name
  basePath: process.env.NODE_ENV === 'production' ? '/OpenHouseApp' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/OpenHouseApp/' : '',
  trailingSlash: true, // This helps with GitHub Pages routing
  distDir: process.env.DIST_DIR || '.next', // Allows customizing the output directory
}

module.exports = withPWA(nextConfig) 