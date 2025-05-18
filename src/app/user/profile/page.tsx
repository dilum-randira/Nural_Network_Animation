"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { UserProfile } from '@/components/user/UserProfile';
import { UserCourseProgress } from '@/components/user/UserCourseProgress';
import { UserSubscription } from '@/components/user/UserSubscription';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: '',
    joinDate: '',
    subscription: 'free',
    courseProgress: [] as Array<{id: string, name: string, progress: number}>
  });
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      router.push('/auth/login?redirect=/user/profile');
      return;
    }
    
    setIsAuthenticated(true);
    
    // In a real app, this would be an API call to get user data
    setTimeout(() => {
      setUserData({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://i.pravatar.cc/150?img=68',
        joinDate: 'May 2023',
        subscription: 'premium',
        courseProgress: [
          { id: 'neural-networks', name: 'Neural Networks Fundamentals', progress: 75 },
          { id: 'deep-learning', name: 'Deep Learning Applications', progress: 45 },
          { id: 'computer-vision', name: 'Computer Vision with Neural Networks', progress: 30 }
        ]
      });
      setIsLoading(false);
    }, 800);
  }, [router]);
  
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Profile</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings and track your learning progress
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-md h-full">
              <UserProfile 
                name={userData.name}
                email={userData.email}
                avatar={userData.avatar}
                joinDate={userData.joinDate}
              />
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-2">
                  <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Home
                  </Link>
                  <Link
                    href="/user/settings"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Account Settings
                  </Link>
                  <Link
                    href="/user/password"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Change Password
                  </Link>
                  <button 
                    className="text-sm text-red-600 dark:text-red-400 hover:underline text-left"
                    onClick={() => {
                      localStorage.removeItem('auth-token');
                      router.push('/auth/login');
                    }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Course Progress */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <Card className="p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Subscription</h2>
                <UserSubscription subscription={userData.subscription} />
              </Card>
              
              <Card className="p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
                <UserCourseProgress courses={userData.courseProgress} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}