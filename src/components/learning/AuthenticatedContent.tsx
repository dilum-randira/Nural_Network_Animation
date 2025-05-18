"use client";

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';

interface AuthenticatedContentProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiredLevel?: 'free' | 'basic' | 'premium';
}

export function AuthenticatedContent({ 
  children, 
  fallback, 
  requiredLevel = 'basic' 
}: AuthenticatedContentProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLevel, setUserLevel] = useState<'free' | 'basic' | 'premium'>('free');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    // For demo purposes, we just check for a token in localStorage
    // In a real implementation, this would verify with an auth provider or backend
    const token = localStorage.getItem('auth-token');
    
    if (token) {
      setIsLoggedIn(true);
      
      // Mock user subscription level - in a real app this would come from a user profile
      const email = localStorage.getItem('user-email');
      // Demo: premium access for our test user, basic for everyone else
      setUserLevel(email === 'demo@example.com' ? 'premium' : 'basic');
    } else {
      setIsLoggedIn(false);
      setUserLevel('free');
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading content...</p>
      </div>
    );
  }

  // If user is logged in and has required access level, show the content
  if (isLoggedIn && (
    userLevel === 'premium' || 
    (userLevel === 'basic' && requiredLevel !== 'premium') ||
    requiredLevel === 'free'
  )) {
    return <>{children}</>;
  }

  // If fallback is provided, show it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default fallback
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {isLoggedIn 
          ? "Upgrade Required"
          : "Please Log In to Continue"
        }
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {isLoggedIn
          ? `This content requires ${requiredLevel === 'premium' ? 'Premium' : 'Basic'} access.`
          : "Sign in to access exclusive learning content and track your progress."
        }
      </p>
      {isLoggedIn ? (
        <Link 
          href="/pricing"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Upgrade Your Account
        </Link>
      ) : (
        <div className="space-x-4">
          <Link 
            href="/auth/login"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </Link>
          <Link 
            href="/auth/signup"
            className="px-6 py-2 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}