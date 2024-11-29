import { WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';
import { initialFileTree } from './config';

let webcontainerInstance: WebContainer | null = null;
let terminal: Terminal | null = null;

export async function getWebContainer() {
  if (!webcontainerInstance) {
    try {
      webcontainerInstance = await WebContainer.boot();
      await webcontainerInstance.mount(initialFileTree);
      
      // Install dependencies after mounting files
      const installProcess = await webcontainerInstance.spawn('npm', ['install']);
      
      if (terminal) {
        const installOutput = new WritableStream({
          write(data) {
            terminal.write(data);
          }
        });
        installProcess.output.pipeTo(installOutput);
      }
      
      await installProcess.exit;
      
      // Start the dev server
      const serverProcess = await webcontainerInstance.spawn('npm', ['run', 'dev']);
      
      if (terminal) {
        const serverOutput = new WritableStream({
          write(data) {
            terminal.write(data);
          }
        });
        serverProcess.output.pipeTo(serverOutput);
      }
    } catch (error) {
      console.error('Failed to boot WebContainer:', error);
      throw error;
    }
  }
  return webcontainerInstance;
}

export function setTerminal(xterm: Terminal) {
  terminal = xterm;
}

export function getTerminal() {
  return terminal;
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