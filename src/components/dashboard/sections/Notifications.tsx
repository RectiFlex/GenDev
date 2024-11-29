import React, { useState } from 'react';
import { Bell, Settings, Check } from 'lucide-react';
import { Notification } from '../../../types';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Feature Available',
      message: 'Try out our new AI code generation capabilities!',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      title: 'System Update',
      message: 'We've improved the web container performance.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: false
    },
    {
      id: '3',
      title: 'Welcome to Aikode',
      message: 'Get started by creating your first AI-powered project.',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  return (
    <div className="h-full glass-effect-strong rounded-lg mx-2 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold">Notifications</h2>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={markAllAsRead}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Mark all as read
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg glass-effect transition-all duration-300 
                        ${notification.read ? 'opacity-60' : 'opacity-100'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{notification.title}</h3>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 rounded-full hover:bg-purple-500/20 transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4 text-purple-400" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
              <span className="text-xs text-gray-500">
                {notification.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })} - {notification.timestamp.toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}