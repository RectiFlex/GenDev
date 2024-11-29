import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D1E]">
      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    </div>
  );
}