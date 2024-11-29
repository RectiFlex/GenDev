import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D1E] p-4">
      <div className="glass-effect-strong rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
        <pre className="text-sm text-gray-400 bg-black/20 p-4 rounded-lg mb-4 overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="w-full px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}