/* eslint-disable */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 720,
  viewportWidth: 1280,
  retries: {
    runMode: 3,
    openMode: 0,
  },
  e2e: {
    modifyObstructiveCode: false,
    video: false,
    baseUrl: "http://localhost:3001",
  },
});
