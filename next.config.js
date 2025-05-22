module.exports = {
  basePath: '/gui',
  experimental: {
    allowedDevOrigins: ['https://just-press-tab.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
}; 