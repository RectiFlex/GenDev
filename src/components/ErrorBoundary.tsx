// src/components/ErrorBoundary.tsx
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D1E] p-4">
          <div className="glass-effect-strong rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
            {this.state.error && (
              <pre className="text-sm text-gray-400 bg-black/20 p-4 rounded-lg mb-4 overflow-auto">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;