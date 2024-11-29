import React from 'react';
import { Zap, Check, Star } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export default function UpgradePlan() {
  const plans: Plan[] = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '5 projects per month',
        'Basic code generation',
        'Community support',
        'Basic templates'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      features: [
        'Unlimited projects',
        'Advanced code generation',
        'Priority support',
        'Custom templates',
        'API access',
        'Team collaboration'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'Training sessions',
        'SLA guarantee',
        'Custom AI models'
      ]
    }
  ];

  return (
    <div className="h-full glass-effect-strong rounded-lg mx-2 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <Zap className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold">Upgrade Plan</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-lg glass-effect hover:bg-white/10 transition-all duration-300
                        ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-purple-500 text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Popular</span>
                  </div>
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full px-6 py-2.5 rounded-lg transition-all duration-300
                          ${plan.popular
                            ? 'bg-purple-500 hover:bg-purple-600'
                            : 'bg-white/10 hover:bg-white/20'}`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}