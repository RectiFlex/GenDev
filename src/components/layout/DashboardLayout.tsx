import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import WebContainer from '../webcontainer/WebContainer';
import AIPrompt from '../ai/AIPrompt';
import APIKeys from '../dashboard/sections/APIKeys';
import Settings from '../dashboard/sections/Settings';
import UpgradePlan from '../dashboard/sections/UpgradePlan';
import LoadingSpinner from '../common/LoadingSpinner';

type DashboardSection = 'projects' | 'api-keys' | 'settings' | 'upgrade' | string;

export default function DashboardLayout() {
  const { user, isLoaded } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState<DashboardSection>('projects');

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'api-keys':
        return <APIKeys />;
      case 'settings':
        return <Settings />;
      case 'upgrade':
        return <UpgradePlan />;
      default:
        return (
          <div className="h-full flex space-x-4">
            <div className="flex-1">
              <WebContainer />
            </div>
            <div className="w-[400px]">
              <AIPrompt />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-[#0D0D1E] text-white flex flex-col">
      <DashboardHeader user={user} />
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Sidebar */}
        <div 
          className={`relative transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? 'w-[60px]' : 'w-[250px]'}`}
        >
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onSectionChange={setCurrentSection}
            currentSection={currentSection}
          />
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2
                     w-6 h-12 bg-purple-500/20 border border-purple-500/30
                     rounded-full flex items-center justify-center
                     hover:bg-purple-500/30 transition-all duration-300
                     z-10"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-purple-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-purple-400" />
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}