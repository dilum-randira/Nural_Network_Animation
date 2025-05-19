"use client";

import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Sample data for analytics
const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 156 },
  { month: 'Mar', users: 198 },
  { month: 'Apr', users: 245 },
  { month: 'May', users: 310 },
];

const courseEnrollmentData = [
  { course: 'Neural Networks Fundamentals', enrollments: 342 },
  { course: 'Python for Machine Learning', enrollments: 256 },
  { course: 'Advanced Deep Learning', enrollments: 178 },
  { course: 'JavaScript Neural Networks', enrollments: 209 },
  { course: 'Data Preprocessing for AI', enrollments: 124 },
];

const recentUserActivities = [
  {
    id: 1,
    user: 'John Doe',
    email: 'john@example.com',
    activity: 'Completed Neural Networks Fundamentals course',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: 'Jane Smith',
    email: 'jane@example.com',
    activity: 'Started Advanced Deep Learning course',
    time: '4 hours ago',
  },
  {
    id: 3,
    user: 'Alex Johnson',
    email: 'alex@example.com',
    activity: 'Submitted exercise for Python for Machine Learning',
    time: '6 hours ago',
  },
  {
    id: 4,
    user: 'Maria Garcia',
    email: 'maria@example.com',
    activity: 'Posted a question in the Neural Networks forum',
    time: '8 hours ago',
  },
  {
    id: 5,
    user: 'Robert Chen',
    email: 'robert@example.com',
    activity: 'Registered for a new account',
    time: '10 hours ago',
  },
];

const trafficSourceData = [
  { source: 'Google', percentage: 45 },
  { source: 'Direct', percentage: 30 },
  { source: 'Social Media', percentage: 15 },
  { source: 'Referrals', percentage: 10 },
];

const userRetentionData = [
  { week: 'Week 1', percentage: 100 },
  { week: 'Week 2', percentage: 82 },
  { week: 'Week 3', percentage: 78 },
  { week: 'Week 4', percentage: 70 },
  { week: 'Week 5', percentage: 65 },
  { week: 'Week 6', percentage: 62 },
  { week: 'Week 7', percentage: 60 },
  { week: 'Week 8', percentage: 58 },
];

const platformUsageData = [
  { device: 'Desktop', percentage: 58 },
  { device: 'Mobile', percentage: 32 },
  { device: 'Tablet', percentage: 10 },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d'); // Options: 7d, 30d, 90d, 1y
  const [compareWithPrevious, setCompareWithPrevious] = useState(true);

  // Sample metrics
  const metrics = {
    activeUsers: {
      value: 1240,
      change: 15.8,
      isPositive: true
    },
    courseCompletions: {
      value: 342,
      change: 8.6,
      isPositive: true
    },
    averageEngagementTime: {
      value: '45m',
      change: 12.3,
      isPositive: true
    },
    bounceRate: {
      value: '24%',
      change: -5.2,
      isPositive: true
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Time range filter */}
            <div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
            
            {/* Compare with previous period toggle */}
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={compareWithPrevious} 
                  onChange={() => setCompareWithPrevious(!compareWithPrevious)} 
                />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className={`absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition ${
                  compareWithPrevious ? 'transform translate-x-full bg-blue-600' : 'bg-white'
                }`}></div>
              </div>
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Compare with previous period</span>
            </label>
            
            {/* Export button */}
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
              Export Report
            </button>
          </div>
        </div>
        
        {/* Key metrics cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Active Users</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {metrics.activeUsers.value}
                  </div>
                  {compareWithPrevious && (
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metrics.activeUsers.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metrics.activeUsers.isPositive ? (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="sr-only">
                        {metrics.activeUsers.isPositive ? 'Increased' : 'Decreased'} by
                      </span>
                      {metrics.activeUsers.change}%
                    </div>
                  )}
                </dd>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Course Completions</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {metrics.courseCompletions.value}
                  </div>
                  {compareWithPrevious && (
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metrics.courseCompletions.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metrics.courseCompletions.isPositive ? (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="sr-only">
                        {metrics.courseCompletions.isPositive ? 'Increased' : 'Decreased'} by
                      </span>
                      {metrics.courseCompletions.change}%
                    </div>
                  )}
                </dd>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Avg. Engagement Time</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {metrics.averageEngagementTime.value}
                  </div>
                  {compareWithPrevious && (
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metrics.averageEngagementTime.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metrics.averageEngagementTime.isPositive ? (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="sr-only">
                        {metrics.averageEngagementTime.isPositive ? 'Increased' : 'Decreased'} by
                      </span>
                      {metrics.averageEngagementTime.change}%
                    </div>
                  )}
                </dd>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Bounce Rate</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {metrics.bounceRate.value}
                  </div>
                  {compareWithPrevious && (
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metrics.bounceRate.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metrics.bounceRate.isPositive ? (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="sr-only">
                        {metrics.bounceRate.isPositive ? 'Increased' : 'Decreased'} by
                      </span>
                      {Math.abs(metrics.bounceRate.change)}%
                    </div>
                  )}
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main analytics content - using grid layout for organization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User growth chart - takes up two thirds of the space on large screens */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2 dark:bg-gray-800">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Growth</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium dark:bg-blue-800 dark:text-blue-100">
                  By Month
                </button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium dark:text-gray-300 dark:hover:bg-gray-700">
                  By Week
                </button>
              </div>
            </div>
            
            {/* Simplified chart representation - in a real app, you'd use a chart library */}
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {userGrowthData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center w-1/5">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.users / 310) * 100}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2 dark:text-gray-400">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <div>Total Users: 1,240</div>
              <div>Growth Rate: +15.8%</div>
            </div>
          </div>
          
          {/* Course enrollment charts */}
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Course Enrollments</h2>
            
            {/* Course enrollment bars */}
            <div className="space-y-4">
              {courseEnrollmentData.map((course, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 truncate dark:text-gray-300" style={{ maxWidth: '70%' }}>{course.course}</span>
                    <span className="text-gray-500 dark:text-gray-400">{course.enrollments}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(course.enrollments / 342) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                View all courses →
              </button>
            </div>
          </div>
          
          {/* Traffic sources pie chart */}
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Traffic Sources</h2>
            
            {/* Simple representation of a pie chart - would use real chart library in production */}
            <div className="flex items-center justify-center h-48">
              <div className="relative h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="absolute top-0 right-0 bottom-0 left-0" 
                     style={{ 
                       backgroundImage: 'conic-gradient(#3B82F6 0% 45%, #10B981 45% 75%, #6366F1 75% 90%, #F59E0B 90% 100%)',
                       borderRadius: '100%'
                     }}>
                </div>
                <div className="absolute top-2.5 right-2.5 bottom-2.5 left-2.5 bg-white dark:bg-gray-800 rounded-full"></div>
              </div>
            </div>
            
            {/* Traffic source legend */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {trafficSourceData.map((source, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2" 
                    style={{ 
                      backgroundColor: index === 0 ? '#3B82F6' : 
                                      index === 1 ? '#10B981' : 
                                      index === 2 ? '#6366F1' : 
                                      '#F59E0B' 
                    }}
                  ></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{source.source} ({source.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* User retention graph */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Retention</h2>
            
            {/* Simple representation of a line chart - would use real chart library in production */}
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {userRetentionData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-2 bg-green-500 rounded-t"
                      style={{ height: `${data.percentage}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2 rotate-45 origin-top-left dark:text-gray-400">{data.week}</div>
                  </div>
                ))}
              </div>
              
              {/* Drawing a curved line connecting the points */}
              <svg className="absolute inset-0" style={{ height: '90%' }}>
                <path 
                  d="M30,0 C80,40 160,50 240,100 C280,130 320,150 400,170" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2"
                />
              </svg>
            </div>
            
            <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <div>Starting Cohort: 100%</div>
              <div>8-Week Retention: 58%</div>
            </div>
          </div>
          
          {/* Device usage representation */}
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Platform Usage</h2>
            
            {/* Device usage stats */}
            <div className="space-y-6">
              {platformUsageData.map((device, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{device.device}</span>
                    <span className="text-gray-500 dark:text-gray-400">{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-purple-600' : 'bg-yellow-500'
                      }`} 
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Device icons */}
            <div className="mt-6 flex justify-around">
              <div className="flex flex-col items-center">
                <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">Desktop</span>
              </div>
              <div className="flex flex-col items-center">
                <svg className="h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">Mobile</span>
              </div>
              <div className="flex flex-col items-center">
                <svg className="h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">Tablet</span>
              </div>
            </div>
          </div>
          
          {/* Recent activities table */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-3 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent User Activities</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                View all
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentUserActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center dark:bg-gray-700">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {activity.user.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{activity.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">{activity.activity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}