"use client";

import { UserSubscription } from "@/components/user/UserSubscription";
import Link from "next/link";

export default function SubscriptionPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/pricing" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to pricing
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Subscription</h1>
        <UserSubscription />
      </div>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Demo Mode</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
          This is a demo version. In a production environment, this would integrate with a payment gateway like Stripe or PayPal. 
          For now, clicking "Complete subscription" will simulate a successful payment.
        </p>
      </div>
    </div>
  );
}