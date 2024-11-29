import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../../types';

export default function ChatMessage({ type, content, timestamp }: Message) {
  return (
    <div className={`flex space-x-3 ${type === 'assistant' ? 'items-start' : 'items-start'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        type === 'assistant' ? 'bg-purple-500/20' : 'bg-pink-500/20'
      }`}>
        {type === 'assistant' ? (
          <Bot className="w-5 h-5 text-purple-400" />
        ) : (
          <User className="w-5 h-5 text-pink-400" />
        )}
      </div>
      <div className="flex-1">
        <div className={`p-3 rounded-lg ${
          type === 'assistant' ? 'glass-effect' : 'bg-white/5'
        }`}>
          <p className="text-sm text-gray-200">{content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}