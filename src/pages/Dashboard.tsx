import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Split from 'react-split';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WebContainer from '../components/webcontainer/WebContainer';
import ProjectsList from '../components/projects/ProjectsList';
import AIPrompt from '../components/ai/AIPrompt';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import APIKeys from '../components/dashboard/sections/APIKeys';
import Settings from '../components/dashboard/sections/Settings';
import UpgradePlan from '../components/dashboard/sections/UpgradePlan';

type DashboardSection = 'main' | 'api-keys' | 'settings' | 'upgrade';

export default function Dashboard() {
  const { user } = useUser();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState<DashboardSection>('main');

  if (!user) return null;

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
          <Split
            className="flex h-full"
            sizes={[40, 60]}
            minSize={[400, 500]}
            gutterSize={4}
            gutterAlign="center"
            direction="horizontal"
          >
            {/* AI Assistant */}
            <div className="h-full">
              <AIPrompt />
            </div>

            {/* Web Container */}
            <div className="h-full border-l border-white/10">
              <WebContainer />
            </div>
          </Split>
        );
    }
  };

  return (
    <div className="h-screen bg-[#0D0D1E] text-white flex flex-col">
      <DashboardHeader user={user} />
      <div className="flex-1 flex overflow-hidden">
        {/* Projects Sidebar */}
        <div 
          className={`relative transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? 'w-[60px]' : 'w-[250px]'}`}
        >
          <ProjectsList 
            isCollapsed={isSidebarCollapsed} 
            onSectionChange={(section) => setCurrentSection(section as DashboardSection)}
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
        <div className="flex-1">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}