import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills(), // Use polyfills for Node.js core modules
  ],
  resolve: {
    alias: {
      path: 'path-browserify', // Resolve 'path' to the browser-friendly version
      // Other necessary aliases, if needed
    },
  },
});
