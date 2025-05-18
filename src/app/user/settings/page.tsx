"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    notifications: {
      email: true,
      marketing: false,
      updates: true
    },
    preferences: {
      darkMode: true,
      autoplay: false,
      language: 'en'
    }
  });
  
  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      router.push('/auth/login?redirect=/user/settings');
      return;
    }
    
    setIsAuthenticated(true);
    
    // In a real app, this would be an API call to get user data
    // For demo purposes, we simulate fetching user data with a timeout
    setTimeout(() => {
      setFormData({
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        notifications: {
          email: true,
          marketing: false,
          updates: true
        },
        preferences: {
          darkMode: true,
          autoplay: false,
          language: 'en'
        }
      });
      
      setIsLoading(false);
    }, 800);
  }, [router]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [category, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [category, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    // In a real app, this would be an API call to update user settings
    // For demo purposes, we simulate updating with a timeout
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Settings</h1>
          
          <button 
            onClick={() => router.push('/user/profile')}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Profile
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Profile Information */}
          <Card className="p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>
          
          {/* Notification Settings */}
          <Card className="p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifications.email"
                    name="notifications.email"
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="notifications.email">Email Notifications</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive course updates and important announcements</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifications.marketing"
                    name="notifications.marketing"
                    type="checkbox"
                    checked={formData.notifications.marketing}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="notifications.marketing">Marketing Emails</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive special offers and promotions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifications.updates"
                    name="notifications.updates"
                    type="checkbox"
                    checked={formData.notifications.updates}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="notifications.updates">Product Updates</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Be notified about new features and platform updates</p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Application Preferences */}
          <Card className="p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Application Preferences</h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="preferences.darkMode"
                    name="preferences.darkMode"
                    type="checkbox"
                    checked={formData.preferences.darkMode}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="preferences.darkMode">Dark Mode</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Use dark theme across the application</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="preferences.autoplay"
                    name="preferences.autoplay"
                    type="checkbox"
                    checked={formData.preferences.autoplay}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="preferences.autoplay">Autoplay Videos</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Automatically play course videos when loading a lesson</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="preferences.language">Language</Label>
                <select
                  id="preferences.language"
                  name="preferences.language"
                  value={formData.preferences.language}
                  onChange={handleSelectChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </Card>
          
          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/user/profile')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em]"></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your password for increased security</p>
              </div>
              <Button 
                variant="outline" 
                className="mt-2 sm:mt-0"
                onClick={() => router.push('/user/password')}
              >
                Change Password
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-400">Delete Account</h3>
                <p className="text-sm text-red-600 dark:text-red-300">Permanently delete your account and all data</p>
              </div>
              <Button 
                variant="destructive" 
                className="mt-2 sm:mt-0"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    alert('In a real application, your account would be scheduled for deletion.');
                    router.push('/auth/login');
                  }
                }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}