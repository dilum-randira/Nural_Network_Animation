"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Button } from '@/components/ui/button';

interface UserData {
  name: string;
  email: string;
  bio: string;
  profileImage?: string;
}

export function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load user data
  useEffect(() => {
    // In a real app, this would be an API call to fetch user data
    // For demo purposes, we'll simulate loading user data from localStorage
    const loadUserData = () => {
      const email = localStorage.getItem('user-email') || 'user@example.com';
      
      // Mock user data (in a real app, this would come from an API)
      const mockData: UserData = {
        name: 'Demo User',
        email: email,
        bio: 'Interested in neural networks and machine learning. Currently learning about deep learning architectures.',
        profileImage: '/profile-placeholder.png',
      };
      
      setUserData(mockData);
    };
    
    loadUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // In a real app, this would be an API call to update user data
    // For demo purposes, we'll simulate a save with a timeout
    setTimeout(() => {
      // Update localStorage for demo purposes
      localStorage.setItem('user-name', userData.name);
      
      setIsEditing(false);
      setIsSaving(false);
    }, 800);
  };

  return (
    <div>
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {userData.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt={userData.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-3xl text-gray-500 dark:text-gray-400">
                {userData.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  disabled
                  className="bg-gray-50 dark:bg-gray-800"
                />
                <p className="text-xs text-gray-500 mt-1">Contact support to change your email address</p>
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Name</h3>
                <p className="text-base font-medium">{userData.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Email</h3>
                <p className="text-base">{userData.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Bio</h3>
                <p className="text-base">{userData.bio || 'No bio available'}</p>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}