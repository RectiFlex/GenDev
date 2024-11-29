import React from 'react';
import { File, FolderOpen } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function FileExplorer() {
  const { currentProject } = useStore();
  const files = currentProject?.files || {};

  return (
    <div className="w-48 border-r border-white/10 bg-[#0D0D1E]/50">
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <FolderOpen className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-gray-300">Project Files</span>
        </div>
      </div>
      <div className="p-2">
        {Object.entries(files).map(([path, content]) => (
          <button
            key={path}
            className="w-full px-3 py-2 rounded-lg flex items-center space-x-2 text-sm
                      text-gray-400 hover:bg-white/5 transition-colors duration-200"
          >
            <File className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{path.split('/').pop()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}