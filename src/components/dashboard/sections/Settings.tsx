import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, User, Bell, Lock, Monitor } from 'lucide-react';

interface Setting {
  id: string;
  label: string;
  value: boolean;
}

export default function Settings() {
  const [settings, setSettings] = useState<Setting[]>([
    { id: 'emailNotifications', label: 'Email Notifications', value: true },
    { id: 'darkMode', label: 'Dark Mode', value: true },
    { id: 'autoSave', label: 'Auto-save Changes', value: true },
    { id: 'twoFactorAuth', label: '2FA Authentication', value: false }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, value: !setting.value } : setting
    ));
  };

  return (
    <div className="h-full glass-effect-strong rounded-lg mx-2 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <SettingsIcon className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Profile Section */}
          <section>
            <h3 className="flex items-center space-x-2 text-lg font-medium mb-4">
              <User className="w-5 h-5 text-purple-400" />
              <span>Profile Settings</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section>
            <h3 className="flex items-center space-x-2 text-lg font-medium mb-4">
              <Bell className="w-5 h-5 text-purple-400" />
              <span>Notifications</span>
            </h3>
            <div className="space-y-4">
              {settings.map(setting => (
                <div key={setting.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{setting.label}</span>
                  <button
                    onClick={() => toggleSetting(setting.id)}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out 
                              ${setting.value ? 'bg-purple-500' : 'bg-gray-600'}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out 
                                ${setting.value ? 'translate-x-7' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Security Section */}
          <section>
            <h3 className="flex items-center space-x-2 text-lg font-medium mb-4">
              <Lock className="w-5 h-5 text-purple-400" />
              <span>Security</span>
            </h3>
            <button className="w-full px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors">
              Change Password
            </button>
          </section>

          {/* Appearance Section */}
          <section>
            <h3 className="flex items-center space-x-2 text-lg font-medium mb-4">
              <Monitor className="w-5 h-5 text-purple-400" />
              <span>Appearance</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg glass-effect hover:bg-white/10 transition-colors">
                Light Mode
              </button>
              <button className="p-4 rounded-lg glass-effect bg-white/10 ring-2 ring-purple-500">
                Dark Mode
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="w-full px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}