import { useState, useEffect } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';
import { initialFileTree } from '../config/webcontainer';

export function useWebContainer() {
  const [instance, setInstance] = useState<WebContainer | null>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function bootWebContainer() {
      if (!crossOriginIsolated) {
        setError(new Error('Cross-Origin-Isolation is not enabled'));
        return;
      }

      try {
        const webcontainerInstance = await WebContainer.boot();
        await webcontainerInstance.mount(initialFileTree);

        // Install dependencies
        const installProcess = await webcontainerInstance.spawn('npm', ['install']);
        await installProcess.exit;

        // Start dev server
        const serverProcess = await webcontainerInstance.spawn('npm', ['run', 'dev']);
        
        // Wait for server URL
        serverProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              if (data.includes('Local:')) {
                const match = data.match(/Local:\s+(http:\/\/localhost:\d+)/);
                if (match) {
                  setServerUrl(match[1]);
                }
              }
            }
          })
        );

        setInstance(webcontainerInstance);
        setIsBooted(true);
      } catch (error) {
        console.error('Failed to boot WebContainer:', error);
        setError(error as Error);
      }
    }

    if (!instance && !isBooted && !error) {
      bootWebContainer();
    }
  }, [instance, isBooted, error]);

  return {
    instance,
    terminal,
    isBooted,
    serverUrl,
    error,
    setTerminal,
    setServerUrl
  };
}