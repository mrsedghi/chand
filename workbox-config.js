module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
  swDest: "dist/sw.js",
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/brsapi\.ir\/Api\/Market/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
  ],
};
