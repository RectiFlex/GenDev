import { WebContainer } from '@webcontainer/api';
import { initialFileTree } from './config';
import { setWebContainerInstance, setIsBooted, setServerUrl, useWebContainerStore } from './store';

export async function bootWebContainer() {
  try {
    // Check if headers are supported
    if (!crossOriginIsolated) {
      throw new Error('Cross-Origin-Isolation is not enabled');
    }

    const instance = await WebContainer.boot();
    setWebContainerInstance(instance);

    // Mount the initial file system
    await instance.mount(initialFileTree);

    // Install dependencies
    const installProcess = await instance.spawn('npm', ['install']);
    const terminal = useWebContainerStore.getState().terminal;

    if (terminal) {
      const installOutput = new WritableStream({
        write(data) {
          terminal.write(data);
        }
      });
      installProcess.output.pipeTo(installOutput);
    }

    await installProcess.exit;

    // Start the development server
    const serverProcess = await instance.spawn('npm', ['run', 'dev']);

    if (terminal) {
      const serverOutput = new WritableStream({
        write(data) {
          terminal.write(data);
        }
      });
      serverProcess.output.pipeTo(serverOutput);
    }

    // Wait for the server URL
    const serverUrl = await new Promise<string>((resolve) => {
      let url = '';
      const outputStream = new WritableStream({
        write(data) {
          url += data;
          if (url.includes('Local:')) {
            const match = url.match(/Local:\s+(http:\/\/localhost:\d+)/);
            if (match) {
              resolve(match[1]);
            }
          }
        }
      });
      serverProcess.output.pipeTo(outputStream);
    });

    setServerUrl(serverUrl);
    setIsBooted(true);
    return instance;
  } catch (error) {
    console.error('Failed to boot WebContainer:', error);
    throw error;
  }
}