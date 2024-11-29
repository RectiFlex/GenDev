import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Aikode?",
      answer: "Aikode is an AI-powered code generation platform that helps developers create applications faster by converting natural language descriptions into production-ready code."
    },
    {
      question: "Do I need coding experience?",
      answer: "While coding experience is helpful, Aikode is designed to be accessible to users with varying levels of expertise, from beginners to experienced developers."
    },
    {
      question: "What programming languages are supported?",
      answer: "Aikode supports multiple programming languages including JavaScript, TypeScript, Python, Java, and more. We're constantly adding support for new languages."
    },
    {
      question: "Can I deploy my applications directly from Aikode?",
      answer: "Yes! Aikode integrates with popular hosting platforms, allowing you to deploy your applications with just a few clicks."
    },
    {
      question: "Is my code secure?",
      answer: "Yes, we take security seriously. Your code is encrypted, and we never share or store your proprietary code. You retain full ownership of all generated code."
    }
  ];

  return (
    <section id="faq" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1E] via-purple-900/10 to-[#0D0D1E] pointer-events-none"></div>
      
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="glass-effect rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-400 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}