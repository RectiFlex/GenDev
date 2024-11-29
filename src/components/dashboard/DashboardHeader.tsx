import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, UserResource } from '@clerk/clerk-react';
import { 
  Code2, 
  Settings, 
  LogOut, 
  Menu,
  User,
  FileCode,
  Key,
  HelpCircle,
  Bell,
  Zap,
  Github
} from 'lucide-react';

interface DashboardHeaderProps {
  user: UserResource;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    {
      icon: <User className="w-4 h-4" />,
      label: 'Profile',
      onClick: () => console.log('Profile clicked'),
      divider: false
    },
    {
      icon: <FileCode className="w-4 h-4" />,
      label: 'My Projects',
      onClick: () => console.log('Projects clicked'),
      divider: false
    },
    {
      icon: <Bell className="w-4 h-4" />,
      label: 'Notifications',
      onClick: () => console.log('Notifications clicked'),
      divider: false
    },
    {
      icon: <Key className="w-4 h-4" />,
      label: 'API Keys',
      onClick: () => console.log('API Keys clicked'),
      divider: true
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
      onClick: () => console.log('Settings clicked'),
      divider: false
    },
    {
      icon: <Zap className="w-4 h-4" />,
      label: 'Upgrade Plan',
      onClick: () => console.log('Upgrade clicked'),
      divider: false
    },
    {
      icon: <Github className="w-4 h-4" />,
      label: 'GitHub Integration',
      onClick: () => console.log('GitHub clicked'),
      divider: true
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: 'Help & Support',
      onClick: () => console.log('Help clicked'),
      divider: true
    },
    {
      icon: <LogOut className="w-4 h-4" />,
      label: 'Sign Out',
      onClick: handleSignOut,
      divider: false
    }
  ];

  return (
    <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between bg-[#0D0D1E]/95 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 group">
          <Code2 className="w-6 h-6 text-purple-400 transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg font-semibold text-white">Aikode</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              className="w-8 h-8 rounded-full border border-white/10"
            />
            <span className="hidden md:block text-sm text-gray-300">{user.fullName}</span>
            <Menu className="w-4 h-4 text-gray-400" />
          </div>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1A1A2E] border border-white/10 shadow-lg py-1 z-50 animate-fadeIn">
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <button
                    onClick={() => {
                      item.onClick();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center space-x-2"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                  {item.divider && (
                    <div className="my-1 border-t border-white/10" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}