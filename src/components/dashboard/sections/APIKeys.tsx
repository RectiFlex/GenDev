import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: Date;
  lastUsed: Date | null;
}

export default function APIKeys() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Development Key',
      key: 'ak_dev_123456789',
      created: new Date(),
      lastUsed: new Date()
    }
  ]);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const createNewKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey: APIKey = {
      id: crypto.randomUUID(),
      name: newKeyName,
      key: `ak_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date(),
      lastUsed: null
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setShowNewKeyForm(false);
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  return (
    <div className="h-full glass-effect-strong rounded-lg mx-2 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Key className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold">API Keys</h2>
        </div>
        <button
          onClick={() => setShowNewKeyForm(true)}
          className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
        >
          <Plus className="w-5 h-5 text-purple-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showNewKeyForm && (
          <div className="p-4 rounded-lg glass-effect">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={createNewKey}
                className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
              >
                Create Key
              </button>
              <button
                onClick={() => setShowNewKeyForm(false)}
                className="px-4 py-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="p-4 rounded-lg glass-effect">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{apiKey.name}</h3>
                <p className="text-sm text-gray-400">Created: {apiKey.created.toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => deleteKey(apiKey.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <code className="flex-1 px-3 py-2 rounded-lg bg-black/20 font-mono text-sm">
                {showKey === apiKey.id ? apiKey.key : '••••••••••••••••'}
              </code>
              <button
                onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {showKey === apiKey.id ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(apiKey.key)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}