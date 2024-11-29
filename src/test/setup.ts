import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock WebContainer API
vi.mock('@webcontainer/api', () => ({
  WebContainer: {
    boot: vi.fn().mockResolvedValue({
      mount: vi.fn(),
      spawn: vi.fn(),
      fs: {
        writeFile: vi.fn(),
        mkdir: vi.fn()
      }
    })
  }
}));

// Mock environment variables
vi.mock('../env', () => ({
  VITE_CLERK_PUBLISHABLE_KEY: 'test_key',
  VITE_OPENAI_API_KEY: 'test_key'
}));

// Setup global fetch mock
global.fetch = vi.fn();

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});