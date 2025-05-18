"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  requireRole?: 'admin' | 'superadmin';
}

export function AdminLayout({ children, requireRole = 'admin' }: AdminLayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // In a real application, this would check the user's authentication status
    // and redirect if not authenticated or not an admin
    const checkAuth = async () => {
      try {
        // Simulate checking auth with a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock authentication - in a real app, this would check a token or session
        // and verify the user has admin privileges
        const user = localStorage.getItem('user');
        const userObj = user ? JSON.parse(user) : null;
        
        if (!userObj || !userObj.role || !['admin', 'superadmin'].includes(userObj.role)) {
          // Not authenticated or not admin, redirect to login
          router.push('/auth/login?redirect=/admin/dashboard');
          return;
        }
        
        // Check if user has the required role
        if (requireRole === 'superadmin' && userObj.role !== 'superadmin') {
          router.push('/admin/dashboard');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed", error);
        router.push('/auth/login?redirect=/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router, requireRole]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}