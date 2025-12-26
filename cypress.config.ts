import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    // SOLUCIÓN: Resolución Full HD para que el banner no tape nada
    viewportWidth: 1920,
    viewportHeight: 1080,
    // SOLUCIÓN: Más tiempo para que la red responda (Fix 'products' timeout)
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
