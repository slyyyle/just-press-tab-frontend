module.exports = {
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
  esbuildOptions: (options) => {
    options.define = {
      "process.env.__NEXT_TRAILING_SLASH": '""',
      "process.env.__NEXT_CROSS_ORIGIN": '""',
      "process.env.__NEXT_I18N_SUPPORT": '""',
      "process.env.__NEXT_ROUTER_BASEPATH": '""',
      "process.env.__NEXT_SCROLL_RESTORATION": '""',
      "process.env.__NEXT_HAS_REWRITES": '""',
    };
    return options;
  },
}; 