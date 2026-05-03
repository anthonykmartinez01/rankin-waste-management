// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rankinwaste.com',

  // URL convention preservation — see migration-baseline.md §5c.
  // Inner pages have NO trailing slash, root is just '/'.
  trailingSlash: 'never',

  // Emits dist/<route>/index.html. Netlify serves this at /<route>
  // with no redirect — matches today's URL paths byte-for-byte.
  build: {
    format: 'directory',
  },

  integrations: [
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
