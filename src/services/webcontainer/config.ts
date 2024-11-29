import { FileSystemTree } from '@webcontainer/api';

export const initialFileTree: FileSystemTree = {
  'package.json': {
    file: {
      contents: JSON.stringify({
        name: 'ai-generated-app',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview'
        },
        dependencies: {
          'react': '^18.3.1',
          'react-dom': '^18.3.1'
        },
        devDependencies: {
          '@types/react': '^18.3.5',
          '@types/react-dom': '^18.3.0',
          '@vitejs/plugin-react': '^4.3.1',
          'typescript': '^5.5.3',
          'vite': '^5.4.2'
        }
      }, null, 2)
    }
  },
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Generated App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
    }
  },
  'vite.config.ts': {
    file: {
      contents: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  }
});`
    }
  },
  'src': {
    directory: {
      'main.tsx': {
        file: {
          contents: `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);`
        }
      },
      'App.tsx': {
        file: {
          contents: `
import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Ready to start coding!</h1>
    </div>
  );
}`
        }
      }
    }
  }
};