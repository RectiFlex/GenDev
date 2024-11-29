import React from 'react';
import Split from 'react-split';
import { Editor } from '@monaco-editor/react';
import Terminal from './Terminal';
import FileExplorer from './FileExplorer';
import { useWebContainer } from '../../hooks/useWebContainer';
import LoadingSpinner from '../common/LoadingSpinner';
import { AlertCircle } from 'lucide-react';

export default function WebContainer() {
  const { isBooted, instance, error } = useWebContainer();

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0D0D1E] rounded-lg glass-effect">
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to initialize development environment</h3>
          <p className="text-gray-400 mb-4">{error.message}</p>
          <p className="text-sm text-gray-500">
            Please ensure you're using a supported browser and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  if (!isBooted || !instance) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0D0D1E] rounded-lg glass-effect">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-full glass-effect rounded-lg">
      <Split
        direction="vertical"
        sizes={[70, 30]}
        minSize={[200, 100]}
        gutterSize={4}
        className="h-full flex flex-col rounded-lg overflow-hidden"
      >
        <div className="h-full flex">
          <FileExplorer />
          <div className="flex-1 bg-[#0D0D1E]">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                padding: { top: 20 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>
        <Terminal />
      </Split>
    </div>
  );
}