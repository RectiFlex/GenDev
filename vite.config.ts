import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react-split'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['lucide-react'],
          'clerk': ['@clerk/clerk-react'],
          'monaco': ['@monaco-editor/react'],
          'xterm': ['@xterm/xterm', 'xterm-addon-fit'],
          'utils': ['react-split']
        },
        globals: {
          'react-split': 'Split',
          'lucide-react': 'LucideReact'
        }
      }
    }
  },
  resolve: {
    alias: {
      'react-split': 'react-split/dist/react-split.es.js'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@clerk/clerk-react',
      'react-split',
      'lucide-react'
    ],
    exclude: ['@webcontainer/api']
  },
  server: {
    host: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  }
});