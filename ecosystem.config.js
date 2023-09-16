module.exports = {
  apps: [
    {
      name: "SHOE-API",
      script: "./index.js",
      env: {
        NODE_ENV: "production",
        PORT: 1001,
      },
    },
  ],
};
