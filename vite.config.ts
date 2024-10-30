import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// const env = loadEnv('development', process.cwd(), 'XYZ');
// console.log(env);

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __TEAM__: JSON.stringify('team'),
  },
  server: {
    port: 3000,
  },
  // vendor - all dependencies from node_modules
  // index - all dependencies from src/index.tsx
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    ViteImageOptimizer({
      png: {
        quality: 50,
      },
    }),
    process.env.VITE_ENVIRONMENT === 'Production' &&
      sentryVitePlugin({
        org: 'kalabanga',
        project: 'rm-kalabanga-catalog',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
  ],
});

// cross env library - for windows inline command environment variable
