import { WebContainer } from '@webcontainer/api';
import { initialFileTree } from '../webcontainer/config';

let webcontainerInstance: WebContainer | null = null;

export async function initializeWebContainer() {
  if (!webcontainerInstance) {
    try {
      webcontainerInstance = await WebContainer.boot();
      await webcontainerInstance.mount(initialFileTree);
      return webcontainerInstance;
    } catch (error) {
      console.error('Failed to initialize WebContainer:', error);
      throw error;
    }
  }
  return webcontainerInstance;
}

export async function writeFiles(files: Record<string, string>) {
  if (!webcontainerInstance) {
    throw new Error('WebContainer not initialized');
  }

  for (const [path, content] of Object.entries(files)) {
    const dir = path.split('/').slice(0, -1).join('/');
    if (dir) {
      await webcontainerInstance.fs.mkdir(dir, { recursive: true });
    }
    await webcontainerInstance.fs.writeFile(path, content);
  }
}

export async function runCommand(command: string, args: string[] = []) {
  if (!webcontainerInstance) {
    throw new Error('WebContainer not initialized');
  }

  const process = await webcontainerInstance.spawn(command, args);
  return process;
}