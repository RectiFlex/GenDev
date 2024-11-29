import React from 'react';
import { GitBranch, Code, Zap, Globe } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <GitBranch className="w-6 h-6 text-purple-400" />,
      title: "Integrated Collaboration Tools",
      description: "Collaborate with team members in real-time through our integrated tools."
    },
    {
      icon: <Code className="w-6 h-6 text-pink-400" />,
      title: "Fast Code Generation",
      description: "Experience the speed of AI with our advanced algorithms that can generate code in mere seconds."
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "User Friendly Interface",
      description: "Navigate with ease through our sleek, intuitive interface designed for both novice and experienced developers."
    },
    {
      icon: <Globe className="w-6 h-6 text-pink-400" />,
      title: "Multi Language Proficiency",
      description: "Our platform supports various programming languages, including Python, JavaScript, and Ruby."
    }
  ];

  return (
    <section className="relative py-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1E] via-purple-900/10 to-[#0D0D1E] pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Discover the Cutting Edge Features of Our Platform
          </h2>
          <p className="text-gray-400">
            Revolutionize your coding experience with our AI-driven tools designed to enhance productivity and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-lg glass-effect hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}