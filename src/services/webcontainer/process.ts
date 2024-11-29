import { getWebContainer } from './instance';
import { getTerminal } from './instance';

export async function installDependencies() {
  const webcontainerInstance = await getWebContainer();
  const terminal = getTerminal();

  if (!terminal) {
    throw new Error('Terminal not initialized');
  }

  try {
    terminal.write('\x1b[1;34mInstalling dependencies...\x1b[0m\r\n');
    
    const installProcess = await webcontainerInstance.spawn('npm', ['install']);
    
    const outputStream = new WritableStream({
      write(data) {
        terminal.write(data);
      }
    });

    installProcess.output.pipeTo(outputStream);
    await installProcess.exit;
    
    terminal.write('\x1b[1;32mDependencies installed successfully!\x1b[0m\r\n');
  } catch (error) {
    terminal.write('\x1b[1;31mFailed to install dependencies\x1b[0m\r\n');
    console.error('Failed to install dependencies:', error);
    throw error;
  }
}

export async function startDevServer() {
  const webcontainerInstance = await getWebContainer();
  const terminal = getTerminal();

  if (!terminal) {
    throw new Error('Terminal not initialized');
  }

  try {
    terminal.write('\x1b[1;34mStarting development server...\x1b[0m\r\n');
    
    const serverProcess = await webcontainerInstance.spawn('npm', ['run', 'dev']);
    
    const outputStream = new WritableStream({
      write(data) {
        terminal.write(data);
      }
    });

    serverProcess.output.pipeTo(outputStream);
    return serverProcess;
  } catch (error) {
    terminal.write('\x1b[1;31mFailed to start development server\x1b[0m\r\n');
    console.error('Failed to start dev server:', error);
    throw error;
  }
}