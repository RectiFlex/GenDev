import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out Aikode",
      features: [
        "5 projects per month",
        "Basic code generation",
        "Community support",
        "Basic templates"
      ]
    },
    {
      name: "Pro",
      price: "$29",
      description: "For professional developers",
      features: [
        "Unlimited projects",
        "Advanced code generation",
        "Priority support",
        "Custom templates",
        "API access",
        "Team collaboration"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large teams and organizations",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "Training sessions",
        "SLA guarantee",
        "Custom AI models"
      ]
    }
  ];

  return (
    <section id="pricing" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1E] via-purple-900/10 to-[#0D0D1E] pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include updates and basic support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="group p-6 rounded-lg glass-effect hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-purple-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}