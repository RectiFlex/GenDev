import React, { useState } from 'react';
import { FolderPlus, Code, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Project } from '../../types';

interface ProjectsListProps {
  isCollapsed: boolean;
}

export default function ProjectsList({ isCollapsed }: ProjectsListProps) {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const { projects, addProject, setCurrentProject, currentProject, deleteProject } = useStore();

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: newProjectName,
      files: {
        'src/App.tsx': '// Start coding here\n',
      },
    };

    addProject(newProject);
    setCurrentProject(newProject);
    setNewProjectName('');
    setShowNewProjectDialog(false);
  };

  return (
    <div className="h-full bg-[#0D0D1E]/50 flex flex-col overflow-hidden border-r border-white/10">
      <div className="p-4 border-b border-white/10">
        {!isCollapsed ? (
          <button
            onClick={() => setShowNewProjectDialog(true)}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                     hover:from-purple-500 hover:to-pink-500 flex items-center justify-center 
                     space-x-2 transition-all duration-300"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        ) : (
          <button
            onClick={() => setShowNewProjectDialog(true)}
            className="w-full flex justify-center p-2 rounded-lg bg-gradient-to-r 
                     from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 
                     transition-all duration-300"
            title="New Project"
          >
            <FolderPlus className="w-5 h-5" />
          </button>
        )}
      </div>

      {showNewProjectDialog && !isCollapsed && (
        <div className="absolute top-16 left-4 right-4 p-4 rounded-lg glass-effect backdrop-blur-lg z-50">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name"
            className="w-full px-3 py-2 rounded-lg glass-effect bg-white/5 text-white 
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleCreateProject}
              className="flex-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => setShowNewProjectDialog(false)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group rounded-lg glass-effect hover:bg-white/10 flex items-center 
                     justify-between transition-all duration-300 ${
                       currentProject?.id === project.id ? 'bg-white/10 ring-2 ring-purple-500' : ''
                     } ${isCollapsed ? 'p-2' : 'p-3'}`}
          >
            <button
              onClick={() => setCurrentProject(project)}
              className="flex items-center space-x-3 flex-1 min-w-0"
            >
              <Code className="w-5 h-5 text-purple-400 flex-shrink-0" />
              {!isCollapsed && (
                <span className="truncate">{project.name}</span>
              )}
            </button>
            {!isCollapsed && (
              <button
                onClick={() => deleteProject(project.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 
                         text-red-400 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}