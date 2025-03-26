/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress specific hydration warnings
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Add custom webpack config to handle specific warnings
  webpack: (config, { dev, isServer }) => {
    // Suppress specific warnings
    if (!dev && !isServer) {
      Object.assign(config, {
        ignoreWarnings: [
          { module: /node_modules\/grammarly-languageserver/ },
          { message: /(?:data-new-gr-c-s-check-loaded|data-gr-ext-installed)/ },
        ],
      });
    }
    return config;
  },
};

module.exports = nextConfig; 