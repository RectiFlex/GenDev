import React, { useState } from 'react';
import { 
  FolderPlus, 
  Code, 
  Trash2, 
  User,
  FileCode,
  Key,
  Settings,
  Zap,
  Github,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Project } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

interface ProjectsListProps {
  isCollapsed: boolean;
  onSectionChange: (section: string) => void;
  currentSection: string;
}

export default function ProjectsList({ isCollapsed, onSectionChange, currentSection }: ProjectsListProps) {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const { projects, addProject, setCurrentProject, currentProject, deleteProject } = useStore();
  const navigate = useNavigate();
  const { openUserProfile } = useClerk();

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
    onSectionChange('main');
  };

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'profile':
        openUserProfile();
        break;
      case 'api-keys':
      case 'settings':
      case 'upgrade':
        onSectionChange(section);
        break;
      case 'github':
        window.open('https://github.com/settings/connections', '_blank');
        break;
      case 'help':
        window.open('/docs', '_blank');
        break;
      default:
        onSectionChange('main');
        break;
    }
  };

  const navigationItems = [
    {
      id: 'projects',
      icon: <FileCode className="w-5 h-5" />,
      label: 'Projects',
      onClick: () => handleNavigation('main'),
      divider: false
    },
    {
      id: 'profile',
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
      onClick: () => handleNavigation('profile'),
      divider: false
    },
    {
      id: 'api-keys',
      icon: <Key className="w-5 h-5" />,
      label: 'API Keys',
      onClick: () => handleNavigation('api-keys'),
      divider: true
    },
    {
      id: 'settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      onClick: () => handleNavigation('settings'),
      divider: false
    },
    {
      id: 'upgrade',
      icon: <Zap className="w-5 h-5" />,
      label: 'Upgrade Plan',
      onClick: () => handleNavigation('upgrade'),
      divider: false
    },
    {
      id: 'github',
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub Integration',
      onClick: () => handleNavigation('github'),
      divider: true
    },
    {
      id: 'help',
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'Help & Support',
      onClick: () => handleNavigation('help'),
      divider: false
    }
  ];

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

      <div className="flex-1 overflow-y-auto">
        {/* Projects Section */}
        <div className="p-4 space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-lg glass-effect hover:bg-white/10 flex items-center 
                       justify-between transition-all duration-300 ${
                         currentProject?.id === project.id && currentSection === 'main' ? 'bg-white/10 ring-2 ring-purple-500' : ''
                       } ${isCollapsed ? 'p-2' : 'p-3'}`}
            >
              <button
                onClick={() => {
                  setCurrentProject(project);
                  onSectionChange('main');
                }}
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

        {/* Navigation Items */}
        <div className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <React.Fragment key={item.id}>
              <button
                onClick={item.onClick}
                className={`w-full rounded-lg flex items-center ${
                  isCollapsed ? 'justify-center p-2' : 'justify-between p-3'
                } hover:bg-white/10 transition-all duration-300 ${
                  currentSection === item.id ? 'bg-white/10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-purple-400">{item.icon}</div>
                  {!isCollapsed && (
                    <>
                      <span className="text-gray-300">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                    </>
                  )}
                </div>
              </button>
              {item.divider && !isCollapsed && (
                <div className="my-2 border-t border-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}