import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import { Editor } from '@monaco-editor/react';
import Terminal from './Terminal';
import { bootWebContainer } from '../../services/webcontainer/boot';
import { useWebContainerStore } from '../../services/webcontainer/store';
import FileExplorer from './FileExplorer';
import { Loader2 } from 'lucide-react';

export default function WebContainer() {
  const [isBooting, setIsBooting] = useState(true);
  const { isBooted, serverUrl } = useWebContainerStore();

  useEffect(() => {
    const init = async () => {
      try {
        await bootWebContainer();
      } catch (error) {
        console.error('Failed to initialize WebContainer:', error);
      } finally {
        setIsBooting(false);
      }
    };

    init();
  }, []);

  if (isBooting) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0D0D1E] rounded-lg glass-effect-strong mx-2">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Initializing development environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full glass-effect-strong rounded-lg mx-2">
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