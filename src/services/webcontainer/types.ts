import { WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';

export interface WebContainerState {
  instance: WebContainer | null;
  terminal: Terminal | null;
  isBooted: boolean;
  serverUrl: string | null;
}

export interface FileContent {
  file: {
    contents: string;
  };
}

export interface DirectoryContent {
  directory: {
    [key: string]: FileContent | DirectoryContent;
  };
}

export type FileSystemContent = FileContent | DirectoryContent;