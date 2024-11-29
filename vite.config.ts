import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "blockfix",
    project: "javascript-react"
  })],
  optimizeDeps: {
    exclude: ['@webcontainer/api']
  },
  server: {
    host: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'editor': ['@monaco-editor/react'],
          'terminal': ['@xterm/xterm', 'xterm-addon-fit'],
          'ai': ['openai'],
          'auth': ['@clerk/clerk-react']
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild', // Changed from 'terser' to 'esbuild'
    // Removed terserOptions since we're not using Terser anymore
  }
});