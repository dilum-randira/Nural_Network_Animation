"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SubscriptionPlan {
  name: string;
  level: 'free' | 'basic' | 'premium';
  features: string[];
}

export function UserSubscription() {
  const [currentPlan, setCurrentPlan] = useState<'free' | 'basic' | 'premium'>('free');
  const [subscriptionEnds, setSubscriptionEnds] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Available plans
  const plans: Record<string, SubscriptionPlan> = {
    free: {
      name: 'Free Plan',
      level: 'free',
      features: [
        'Access to free courses',
        'Limited interactive visualizations',
        'Community forum access'
      ]
    },
    basic: {
      name: 'Basic Plan',
      level: 'basic',
      features: [
        'Access to all basic courses',
        'Full interactive visualizations',
        'Course progress tracking',
        'Priority support'
      ]
    },
    premium: {
      name: 'Premium Plan',
      level: 'premium',
      features: [
        'Access to ALL courses',
        'Advanced interactive visualizations',
        'Downloadable resources',
        'One-on-one coaching sessions',
        'Certification preparation'
      ]
    }
  };

  useEffect(() => {
    // In a real app, this would be an API call to fetch subscription details
    // For demo purposes, we'll simulate loading subscription data
    const loadSubscription = () => {
      setTimeout(() => {
        const email = localStorage.getItem('user-email');
        // Mock subscription info (in a real app, this would come from the API)
        let mockPlan: 'free' | 'basic' | 'premium' = 'free';
        
        // Demo: premium access for test user, basic for other logged-in users
        if (email) {
          mockPlan = email === 'demo@example.com' ? 'premium' : 'basic';
        }
        
        setCurrentPlan(mockPlan);
        
        if (mockPlan !== 'free') {
          // Set a future date for subscription end
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
          setSubscriptionEnds(endDate.toISOString().split('T')[0]);
        }
        
        setIsLoading(false);
      }, 600);
    };
    
    loadSubscription();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Current Plan</h3>
          {currentPlan === 'premium' ? (
            <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Premium
            </span>
          ) : currentPlan === 'basic' ? (
            <span className="px-2 py-1 text-xs font-medium text-blue-600">
              Basic
            </span>
          ) : (
            <span className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
              Free
            </span>
          )}
        </div>
        
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="font-medium mb-2">{plans[currentPlan].name}</h4>
          <ul className="text-sm space-y-1">
            {plans[currentPlan].features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-4 w-4 mr-1.5 text-green-600 dark:text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          {subscriptionEnds && (
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Subscription renews on {subscriptionEnds}
            </div>
          )}
        </div>
      </div>
      
      {currentPlan !== 'premium' && (
        <div>
          <Link href="/pricing">
            <Button className="w-full">
              {currentPlan === 'free' ? 'Upgrade Your Plan' : 'Upgrade to Premium'}
            </Button>
          </Link>
        </div>
      )}
      
      {currentPlan !== 'free' && (
        <div className="pt-2">
          <button 
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
            onClick={() => {
              if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
                alert('For demo purposes, your subscription would be canceled here. In a real app, this would call an API endpoint.');
              }
            }}
          >
            Cancel subscription
          </button>
        </div>
      )}
    </div>
  );
}