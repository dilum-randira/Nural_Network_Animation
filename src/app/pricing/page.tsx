"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Base monthly prices
  const monthlyPrices = {
    premium: "2,499",
    enterprise: "19,999"
  };
  
  // Calculate annual prices (20% discount)
  const annualPrices = {
    premium: calculateAnnualPrice(monthlyPrices.premium),
    enterprise: calculateAnnualPrice(monthlyPrices.enterprise)
  };
  
  // Helper function to calculate annual price with 20% discount
  function calculateAnnualPrice(monthlyPrice: string): string {
    const price = parseInt(monthlyPrice.replace(/,/g, ''));
    const annualMonthlyPrice = Math.round(price * 0.8); // 20% discount
    return annualMonthlyPrice.toLocaleString();
  }

  // Pricing plans data with dynamic pricing based on billing cycle
  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      billing: "Free forever",
      description: "Basic access to Neural Network Explorer",
      features: [
        "Access to basic tutorials",
        "Limited course content",
        "Neural network visualizations",
        "Community forum access"
      ],
      cta: "Get Started",
      ctaLink: "/auth/signup",
      highlighted: false
    },
    {
      name: "Premium",
      price: billingCycle === 'monthly' ? monthlyPrices.premium : annualPrices.premium,
      billing: billingCycle === 'monthly' ? "per month" : "per month, billed annually",
      description: "Full access to all features and content",
      features: [
        "Access to ALL tutorials and courses",
        "Advanced neural network tools",
        "Interactive coding exercises",
        "Personalized learning path",
        "Progress tracking",
        "Downloadable course materials",
        "Priority support"
      ],
      cta: "Upgrade Now",
      ctaLink: "/user/subscription",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: billingCycle === 'monthly' ? monthlyPrices.enterprise : annualPrices.enterprise,
      billing: billingCycle === 'monthly' ? "per month" : "per month, billed annually",
      description: "Custom solution for teams and organizations",
      features: [
        "Everything in Premium",
        "Team management dashboard",
        "Custom learning tracks",
        "Branded learning portal",
        "API access",
        "Dedicated support",
        "Team analytics"
      ],
      cta: "Contact Sales",
      ctaLink: "/contact",
      highlighted: false
    }
  ];

  // Toggle between monthly and annual billing
  const toggleBillingCycle = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that's right for your journey into neural networks and deep learning
          </p>
          <div className="mt-6">
            <span className="inline-flex rounded-md shadow-sm">
              <div className="bg-white dark:bg-gray-800 p-1 rounded-lg flex">
                <button 
                  onClick={() => toggleBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    billingCycle === 'monthly' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Monthly Billing
                </button>
                <button 
                  onClick={() => toggleBillingCycle('annual')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    billingCycle === 'annual' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Annual Billing <span className="text-green-500 font-medium">(Save 20%)</span>
                </button>
              </div>
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              All prices are in Sri Lankan Rupees (LKR)
              {billingCycle === 'annual' && <span className="text-green-500 ml-1">• Save LKR {calculateAnnualSavings()} annually</span>}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${
                plan.highlighted 
                  ? 'border-2 border-blue-500 dark:border-blue-400 shadow-xl' 
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-semibold bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-extrabold tracking-tight">LKR {plan.price}</span>
                  <span className="ml-1 text-xl font-semibold">{plan.billing !== "Free forever" ? plan.billing : ""}</span>
                </div>
                {billingCycle === 'annual' && plan.name === 'Premium' && (
                  <div className="mt-1">
                    <span className="text-sm text-green-500 font-semibold">
                      Total: LKR {calculateYearlyTotal(annualPrices.premium)}
                    </span>
                  </div>
                )}
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <svg 
                        className="h-5 w-5 text-green-500" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                    }`}
                    asChild
                  >
                    <Link href={plan.ctaLink}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Can I cancel my subscription at any time?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Yes, you can cancel your subscription anytime. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Do you offer discounts for students?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Yes! We offer a 50% discount for verified students. Contact our support team with proof of enrollment.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We accept all major credit cards, PayPal, and local payment options including bank transfers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Can I switch between plans?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate applies at the next billing cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Helper function to calculate annual savings
  function calculateAnnualSavings(): string {
    // Calculate savings for Premium plan
    const monthlyPremium = parseInt(monthlyPrices.premium.replace(/,/g, ''));
    const annualPremium = parseInt(annualPrices.premium.replace(/,/g, ''));
    
    // Savings per month × 12 months
    const savings = (monthlyPremium - annualPremium) * 12;
    
    return savings.toLocaleString();
  }
  
  // Helper function to calculate yearly total
  function calculateYearlyTotal(monthlyPrice: string): string {
    const price = parseInt(monthlyPrice.replace(/,/g, ''));
    const yearlyTotal = price * 12;
    return yearlyTotal.toLocaleString();
  }
}