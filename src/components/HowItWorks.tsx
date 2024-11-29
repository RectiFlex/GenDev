import React from 'react';
import { Lightbulb, Code2, Rocket, Repeat } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Lightbulb className="w-8 h-8 text-purple-400" />,
      title: "Describe Your Idea",
      description: "Start by describing what you want to build in plain English. Our AI understands your requirements and context."
    },
    {
      icon: <Code2 className="w-8 h-8 text-pink-400" />,
      title: "AI Generates Code",
      description: "Watch as our AI transforms your description into production-ready code in seconds."
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-400" />,
      title: "Deploy Instantly",
      description: "Deploy your application with one click to your preferred hosting platform."
    },
    {
      icon: <Repeat className="w-8 h-8 text-pink-400" />,
      title: "Iterate & Refine",
      description: "Easily modify and enhance your code through natural language commands."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1E] via-purple-900/10 to-[#0D0D1E] pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into reality with our simple four-step process. No coding experience required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-lg glass-effect hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}