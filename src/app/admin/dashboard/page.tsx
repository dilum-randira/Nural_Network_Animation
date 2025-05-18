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
    totalCourses: 0,
    totalRevenue: 0,
    totalEnrollments: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [coursePerformance, setCoursePerformance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real app, this would fetch data from your API
  useEffect(() => {
    // Simulate loading data
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Wait to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock stats data
      setStats({
        totalUsers: 1250,
        activeUsers: 876,
        premiumUsers: 324,
        totalCourses: 24,
        totalRevenue: 48750,
        totalEnrollments: 3642
      });
      
      // Mock recent users data
      setRecentUsers([
        { 
          id: '1', 
          name: 'Sarah Wilson', 
          email: 'swilson@example.com', 
          date: 'May 18, 2025', 
          subscription: 'Premium',
          avatar: '👩‍💼'
        },
        { 
          id: '2', 
          name: 'James Rodriguez', 
          email: 'jrodriguez@example.com', 
          date: 'May 17, 2025', 
          subscription: 'Basic',
          avatar: '👨‍💻'
        },
        { 
          id: '3', 
          name: 'Linda Chen', 
          email: 'lchen@example.com', 
          date: 'May 16, 2025', 
          subscription: 'Premium',
          avatar: '👩‍🔬'
        },
        { 
          id: '4', 
          name: 'Michael Taylor', 
          email: 'mtaylor@example.com', 
          date: 'May 15, 2025', 
          subscription: 'Basic',
          avatar: '👨‍🎓'
        }
      ]);
      
      // Mock activity logs
      setActivityLogs([
        {
          id: '1',
          event: 'Course Completion',
          details: 'User completed Neural Networks Fundamentals',
          time: '2 hours ago',
          icon: '🎓'
        },
        {
          id: '2',
          event: 'New Enrollment',
          details: '5 users enrolled in Python for ML',
          time: '4 hours ago',
          icon: '📚'
        },
        {
          id: '3',
          event: 'Payment Received',
          details: 'Premium subscription payment processed',
          time: 'Yesterday',
          icon: '💳'
        },
        {
          id: '4',
          event: 'New Tutorial Added',
          details: 'Building Neural Networks with TensorFlow',
          time: '2 days ago',
          icon: '📝'
        }
      ]);
      
      // Mock course performance data
      setCoursePerformance([
        {
          id: '1',
          name: 'Neural Networks Fundamentals',
          enrollments: 782,
          completionRate: 68,
          rating: 4.7
        },
        {
          id: '2',
          name: 'Python for Machine Learning',
          enrollments: 645,
          completionRate: 72,
          rating: 4.9
        },
        {
          id: '3',
          name: 'Deep Learning Applications',
          enrollments: 413,
          completionRate: 56,
          rating: 4.5
        },
        {
          id: '4',
          name: 'Computer Vision with Neural Networks',
          enrollments: 329,
          completionRate: 48,
          rating: 4.6
        }
      ]);
      
      setIsLoading(false);
    };
    
    loadDashboardData();
  }, []);

  const quickActions = [
    { name: 'Add New Course', href: '/admin/courses/new', icon: '📚' },
    { name: 'Create Tutorial', href: '/admin/tutorials/new', icon: '📝' },
    { name: 'Manage Users', href: '/admin/users', icon: '👥' },
    { name: 'View Reports', href: '/admin/reports', icon: '📊' },
    { name: 'Site Settings', href: '/admin/settings', icon: '⚙️' }
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <Link 
            href="/admin/users" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Manage Users
          </Link>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stats.totalUsers.toLocaleString()}</p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.activeUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
            </p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Premium Users</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.premiumUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((stats.premiumUsers / stats.totalUsers) * 100)}% conversion
            </p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Courses</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.totalCourses.toLocaleString()}</p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Enrollments</p>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats.totalEnrollments.toLocaleString()}</p>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${stats.totalRevenue.toLocaleString()}</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action) => (
                <Link 
                  key={action.name} 
                  href={action.href}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="text-2xl mr-3">{action.icon}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{action.name}</span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent User Registrations */}
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md col-span-1 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent User Registrations</h2>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{user.avatar}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
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
            </div>
            <Link href="/admin/users" className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all users →
            </Link>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Platform Activity */}
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Platform Activity</h2>
            <div className="space-y-4">
              {activityLogs.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{activity.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{activity.event}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.details}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              ))}
            </div>
            <Link href="/admin/activity" className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View all activity →
            </Link>
          </Card>
          
          {/* Course Performance */}
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Course Performance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Course</th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Enrollments</th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Completion</th>
                    <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {coursePerformance.map((course) => (
                    <tr key={course.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 text-sm text-gray-900 dark:text-gray-100">{course.name}</td>
                      <td className="py-3 text-sm text-gray-900 dark:text-gray-100">{course.enrollments}</td>
                      <td className="py-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${course.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{course.completionRate}%</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <span className="text-amber-500 mr-1">★</span>
                          <span className="text-sm text-gray-900 dark:text-gray-100">{course.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/admin/courses" className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Manage all courses →
            </Link>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}