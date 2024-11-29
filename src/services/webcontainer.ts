import { WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';

let webcontainerInstance: WebContainer | null = null;
let terminal: Terminal | null = null;

export async function getWebContainer() {
  if (!webcontainerInstance) {
    try {
      webcontainerInstance = await WebContainer.boot();
      await initializeFiles();
    } catch (error) {
      console.error('Failed to boot WebContainer:', error);
      throw error;
    }
  }
  return webcontainerInstance;
}

async function initializeFiles() {
  if (!webcontainerInstance) return;

  try {
    // Create src directory
    await webcontainerInstance.fs.mkdir('src');

    // Initialize package.json
    await webcontainerInstance.fs.writeFile('package.json', JSON.stringify({
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
    }, null, 2));

    // Initialize vite.config.ts
    await webcontainerInstance.fs.writeFile('vite.config.ts', `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  }
});
    `.trim());

    // Initialize index.html
    await webcontainerInstance.fs.writeFile('index.html', `
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
</html>
    `.trim());

    // Initialize main.tsx
    await webcontainerInstance.fs.writeFile('src/main.tsx', `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
    `.trim());

    // Initialize App.tsx
    await webcontainerInstance.fs.writeFile('src/App.tsx', `
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>Ready to start coding!</h1>
    </div>
  );
}
    `.trim());

  } catch (error) {
    console.error('Failed to initialize files:', error);
    throw error;
  }
}

export async function writeFile(path: string, content: string) {
  if (!webcontainerInstance) throw new Error('WebContainer not initialized');

  try {
    const dir = path.split('/').slice(0, -1).join('/');
    if (dir) {
      await webcontainerInstance.fs.mkdir(dir, { recursive: true });
    }
    await webcontainerInstance.fs.writeFile(path, content);
  } catch (error) {
    console.error(`Failed to write file ${path}:`, error);
    throw error;
  }
}

export async function installDependencies() {
  if (!webcontainerInstance) throw new Error('WebContainer not initialized');

  try {
    const installProcess = await webcontainerInstance.spawn('npm', ['install']);
    
    const outputStream = new WritableStream({
      write(data) {
        if (terminal) {
          terminal.write(data);
        }
      }
    });

    installProcess.output.pipeTo(outputStream);
    return installProcess.exit;
  } catch (error) {
    console.error('Failed to install dependencies:', error);
    throw error;
  }
}

export async function startDevServer() {
  if (!webcontainerInstance) throw new Error('WebContainer not initialized');

  try {
    const serverProcess = await webcontainerInstance.spawn('npm', ['run', 'dev']);
    
    const outputStream = new WritableStream({
      write(data) {
        if (terminal) {
          terminal.write(data);
        }
      }
    });

    serverProcess.output.pipeTo(outputStream);
    return serverProcess;
  } catch (error) {
    console.error('Failed to start dev server:', error);
    throw error;
  }
}

export function setTerminal(xterm: Terminal) {
  terminal = xterm;
}