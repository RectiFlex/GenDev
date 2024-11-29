import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { SignupCredentials } from '../types/auth';

export default function SignupForm() {
  const [credentials, setCredentials] = useState<SignupCredentials>({
    name: '',
    email: '',
    password: '',
  });
  const { signup, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/20 text-red-200 text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={credentials.name}
          onChange={e => setCredentials(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={credentials.email}
          onChange={e => setCredentials(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
                 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg
                 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}