import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateCode } from '../../services/ai';
import { Message } from '../../types';

export default function AIPrompt() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentProject, updateProjectFiles } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. Describe what you want to build, and I\'ll help you create it in real-time.',
      timestamp: new Date()
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading || !currentProject) return;

    const userMessage: Message = {
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const generatedCode = await generateCode(prompt);
      const fileName = `generated_${Date.now()}.tsx`;
      const filePath = `src/${fileName}`;

      updateProjectFiles(currentProject.id, {
        [filePath]: generatedCode
      });

      const aiResponse: Message = {
        type: 'assistant',
        content: `I've generated the code and created ${fileName}. The changes are now live in the editor.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        type: 'assistant',
        content: 'Sorry, I encountered an error while generating the code. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="h-full flex flex-col glass-effect rounded-lg">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex space-x-3 ${message.type === 'assistant' ? 'items-start' : 'items-start'}`}
          >
            <div className={`p-3 rounded-lg ${
              message.type === 'assistant' ? 'glass-effect' : 'bg-white/5'
            }`}>
              <p className="text-sm text-gray-200">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to build..."
            className="w-full px-4 py-3 pr-12 rounded-lg glass-effect bg-white/5 text-white 
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500
                     min-h-[80px] max-h-[200px] resize-y"
            disabled={isLoading || !currentProject}
          />
          <button
            type="submit"
            disabled={isLoading || !currentProject || !prompt.trim()}
            className={`absolute right-2 bottom-2 p-2 rounded-lg 
                      ${!prompt.trim() || isLoading || !currentProject ? 
                        'bg-gray-600 cursor-not-allowed opacity-50' : 
                        'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'}
                      transition-all duration-300`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        {!currentProject && (
          <p className="mt-2 text-sm text-gray-400">Create or select a project to start using AI assistance</p>
        )}
      </form>
    </div>
  );
}