"use client";

import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Neural Network Explorer',
    siteDescription: 'Learn about neural networks and AI through interactive explorations',
    maintenanceMode: false,
    allowSignups: true,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'notifications@example.com',
    smtpPassword: '••••••••',
    senderName: 'Neural Network Explorer',
    senderEmail: 'notifications@example.com',
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#6366f1',
    darkMode: 'auto',
    highlightStyle: 'github',
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save to a database
    console.log('Saving settings:', {
      general: generalSettings,
      email: emailSettings,
      appearance: appearanceSettings
    });
    
    // Show the success message
    setSaved(true);
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  const updateGeneralSettings = (field: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value,
    });
  };
  
  const updateEmailSettings = (field: string, value: string) => {
    setEmailSettings({
      ...emailSettings,
      [field]: value,
    });
  };
  
  const updateAppearanceSettings = (field: string, value: any) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [field]: value,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>
          
          {saved && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Settings saved successfully!
            </div>
          )}
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('general')}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === 'general' 
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                General
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('email')}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === 'email' 
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Email
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('appearance')}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === 'appearance' 
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Appearance
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab('security')}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === 'security' 
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Security
              </button>
            </li>
          </ul>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <form onSubmit={handleSaveSettings}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => updateGeneralSettings('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Site Description
                  </label>
                  <textarea
                    value={generalSettings.siteDescription}
                    onChange={(e) => updateGeneralSettings('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onChange={(e) => updateGeneralSettings('maintenanceMode', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Maintenance Mode
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowSignups"
                    checked={generalSettings.allowSignups}
                    onChange={(e) => updateGeneralSettings('allowSignups', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowSignups" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Allow New User Registrations
                  </label>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Email Settings */}
          {activeTab === 'email' && (
            <form onSubmit={handleSaveSettings}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      SMTP Server
                    </label>
                    <input
                      type="text"
                      value={emailSettings.smtpServer}
                      onChange={(e) => updateEmailSettings('smtpServer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      SMTP Port
                    </label>
                    <input
                      type="text"
                      value={emailSettings.smtpPort}
                      onChange={(e) => updateEmailSettings('smtpPort', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      SMTP Username
                    </label>
                    <input
                      type="text"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => updateEmailSettings('smtpUsername', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      SMTP Password
                    </label>
                    <input
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => updateEmailSettings('smtpPassword', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      value={emailSettings.senderName}
                      onChange={(e) => updateEmailSettings('senderName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sender Email
                    </label>
                    <input
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => updateEmailSettings('senderEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    className="mr-4 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Test Connection
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <form onSubmit={handleSaveSettings}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Primary Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => updateAppearanceSettings('primaryColor', e.target.value)}
                        className="h-10 w-10 border-0 p-0"
                      />
                      <input
                        type="text"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => updateAppearanceSettings('primaryColor', e.target.value)}
                        className="ml-2 w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Secondary Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => updateAppearanceSettings('secondaryColor', e.target.value)}
                        className="h-10 w-10 border-0 p-0"
                      />
                      <input
                        type="text"
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) => updateAppearanceSettings('secondaryColor', e.target.value)}
                        className="ml-2 w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Dark Mode
                    </label>
                    <select
                      value={appearanceSettings.darkMode}
                      onChange={(e) => updateAppearanceSettings('darkMode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="auto">Auto (follow system preference)</option>
                      <option value="light">Light Mode</option>
                      <option value="dark">Dark Mode</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Code Highlight Style
                    </label>
                    <select
                      value={appearanceSettings.highlightStyle}
                      onChange={(e) => updateAppearanceSettings('highlightStyle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="github">GitHub</option>
                      <option value="dracula">Dracula</option>
                      <option value="monokai">Monokai</option>
                      <option value="solarized-light">Solarized Light</option>
                      <option value="solarized-dark">Solarized Dark</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Settings
                  </button>
                  <button
                    type="button"
                    className="ml-4 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Authentication Settings</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="twoFactor"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Require Two-Factor Authentication for Admin Users
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="strongPasswords"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="strongPasswords" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enforce Strong Password Policy
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="loginAttempts"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="loginAttempts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Limit Failed Login Attempts
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Session Settings</h3>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={60}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Maximum Active Sessions
                      </label>
                      <input
                        type="number"
                        value={5}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Security Log</h3>
                  <div className="mt-4">
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-4 max-h-64 overflow-y-auto">
                      <div className="space-y-2 text-sm">
                        <div className="flex">
                          <span className="font-medium text-gray-500 dark:text-gray-400 w-32">May 19, 2025 14:32</span>
                          <span className="text-gray-800 dark:text-gray-200">Admin login from IP 192.168.1.105</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium text-gray-500 dark:text-gray-400 w-32">May 19, 2025 12:15</span>
                          <span className="text-gray-800 dark:text-gray-200">Failed login attempt for admin@example.com</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium text-gray-500 dark:text-gray-400 w-32">May 19, 2025 10:03</span>
                          <span className="text-gray-800 dark:text-gray-200">Settings updated by admin</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium text-gray-500 dark:text-gray-400 w-32">May 18, 2025 22:47</span>
                          <span className="text-gray-800 dark:text-gray-200">New user account created</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium text-gray-500 dark:text-gray-400 w-32">May 18, 2025 16:30</span>
                          <span className="text-gray-800 dark:text-gray-200">Admin user password changed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Security Settings
                  </button>
                  <button
                    type="button"
                    className="ml-4 px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Clear Security Log
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}