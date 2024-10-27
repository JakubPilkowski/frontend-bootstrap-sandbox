import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom to simulate the DOM environment
    setupFiles: './vitest.setup.ts', // Optional setup file
  },
});
