export interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  name: string;
  files: {
    [path: string]: string;
  };
}