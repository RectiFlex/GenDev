import React from 'react';
import { 
  FileCode, 
  User, 
  Key, 
  Settings, 
  Zap,
  Github,
  HelpCircle
} from 'lucide-react';
import ProjectsList from '../projects/ProjectsList';
import { useNavigation } from '../../services/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  onSectionChange: (section: string) => void;
  currentSection: string;
}

export default function Sidebar({ isCollapsed, onSectionChange, currentSection }: SidebarProps) {
  const { goToGitHub, goToHelp } = useNavigation();

  const navigationItems = [
    {
      id: 'projects',
      icon: <FileCode className="w-5 h-5" />,
      label: 'Projects',
      onClick: () => onSectionChange('projects'),
      divider: false
    },
    {
      id: 'profile',
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
      onClick: () => onSectionChange('profile'),
      divider: false
    },
    {
      id: 'api-keys',
      icon: <Key className="w-5 h-5" />,
      label: 'API Keys',
      onClick: () => onSectionChange('api-keys'),
      divider: true
    },
    {
      id: 'settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      onClick: () => onSectionChange('settings'),
      divider: false
    },
    {
      id: 'upgrade',
      icon: <Zap className="w-5 h-5" />,
      label: 'Upgrade Plan',
      onClick: () => onSectionChange('upgrade'),
      divider: false
    },
    {
      id: 'github',
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub Integration',
      onClick: goToGitHub,
      divider: true
    },
    {
      id: 'help',
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'Help & Support',
      onClick: goToHelp,
      divider: false
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <ProjectsList isCollapsed={isCollapsed} />
      
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
                  <span className="text-gray-300">{item.label}</span>
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
  );
}