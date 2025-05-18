"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    premiumUsers: 0,
    totalCourses: 0
  });
  
  // In a real app, this would fetch data from your API
  useEffect(() => {
    // Mock data for demo purposes
    setStats({
      totalUsers: 1250,
      activeUsers: 876,
      premiumUsers: 324,
      totalCourses: 24
    });
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <Link 
            href="/admin/users" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Manage Users
          </Link>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stats.totalUsers}</p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.activeUsers}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
            </p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Premium Users</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.premiumUsers}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((stats.premiumUsers / stats.totalUsers) * 100)}% conversion rate
            </p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Courses</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.totalCourses}</p>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent User Registrations</h2>
            <div className="space-y-4">
              {/*
                Mock data for recent user registrations
              */}
              {/*
                In a real app, this data would be fetched from your API
              */}
              {/*
                For demo purposes, we're using static data here
              */}
              {/*
                You can replace this with a map function to render dynamic data
              */}
              {/*
                Example:
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.date}</p>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                        user.subscription === 'Premium' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {user.subscription}
                      </span>
                    </div>
                  </div>
                ))}
              */}
            </div>
            <Link href="/admin/users" className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all users →
            </Link>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Platform Activity</h2>
            <div className="space-y-4">
              {/*
                Mock data for platform activity
              */}
              {/*
                In a real app, this data would be fetched from your API
              */}
              {/*
                For demo purposes, we're using static data here
              */}
              {/*
                You can replace this with a map function to render dynamic data
              */}
              {/*
                Example:
                {activityLogs.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{activity.event}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.details}</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                ))}
              */}
            </div>
            <Link href="/admin/activity" className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all activity →
            </Link>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}