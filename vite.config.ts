import rsc from '@vitejs/plugin-rsc/plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import devtoolsJson from 'vite-plugin-devtools-json';
import netlifyPlugin from '@netlify/vite-plugin-react-router';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    netlifyPlugin(),
    rsc({
      entries: {
        client: 'src/entry.browser.tsx',
        rsc: 'src/entry.rsc.tsx',
        ssr: 'src/entry.ssr.tsx',
      },
    }),
    devtoolsJson(),
  ],
  build: {
    outDir: 'dist',
  },
  ssr: {
    noExternal: true,
  },
});
