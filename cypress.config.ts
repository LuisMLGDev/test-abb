import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    // SOLUTION: Full HD resolution so the banner doesn't cover anything
    viewportWidth: 1920,
    viewportHeight: 1080,
    // SOLUTION: More time for network response (Fix 'products' timeout)
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    setupNodeEvents() { // implement node event listeners here
    },
  },
});
