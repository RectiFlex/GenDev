import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useAuthStore } from '../auth/store/authStore';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl animate-pulse-glow delay-1000"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
          <span className="text-sm text-gray-300">AI-Powered Development</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 leading-tight">
          Generate Full-Stack Apps With AI
        </h1>
        
        <p className="text-xl text-gray-400 mb-12">
          Transform your ideas into production-ready applications instantly.
          Let AI handle the coding while you focus on innovation.
        </p>

        <div className="max-w-2xl mx-auto relative">
          {isAuthenticated ? (
            <div className="glass-effect rounded-lg p-2 transition-all duration-300 hover:border-purple-500/30">
              <div className="flex items-center">
                <Search className="w-5 h-5 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Describe your app idea..."
                  className="w-full bg-transparent border-none focus:ring-0 text-white px-4 py-2"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105">
                  Generate App
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium text-lg"
            >
              Start Building Free
            </button>
          )}
          
          <p className="text-sm text-gray-400 mt-4">
            🚀 No credit card required • Free 14-day trial
          </p>
        </div>
      </div>
    </div>
  );
}