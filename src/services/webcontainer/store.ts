import { create } from 'zustand';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';

interface WebContainerState {
  instance: WebContainer | null;
  terminal: Terminal | null;
  isBooted: boolean;
  serverUrl: string | null;
}

export const useWebContainerStore = create<WebContainerState>(() => ({
  instance: null,
  terminal: null,
  isBooted: false,
  serverUrl: null,
}));

export const setWebContainerInstance = (instance: WebContainer | null) => {
  useWebContainerStore.setState({ instance });
};

export const setTerminal = (terminal: Terminal | null) => {
  useWebContainerStore.setState({ terminal });
};

export const setIsBooted = (isBooted: boolean) => {
  useWebContainerStore.setState({ isBooted });
};

export const setServerUrl = (serverUrl: string | null) => {
  useWebContainerStore.setState({ serverUrl });
};