"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SubscriptionPlan {
  name: string;
  level: 'free' | 'basic' | 'premium';
  features: string[];
  price?: {
    monthly: number;
    annual: number;
  };
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  supportedCurrencies: string[];
}

export function UserSubscription() {
  const searchParams = useSearchParams();
  const [currentPlan, setCurrentPlan] = useState<'free' | 'basic' | 'premium'>('free');
  const [subscriptionEnds, setSubscriptionEnds] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get parameters from URL if available
  const planFromUrl = searchParams?.get('plan');
  const billingCycleFromUrl = searchParams?.get('billing');
  const priceFromUrl = searchParams?.get('price');
  
  // Selected plan details for new subscription
  const [selectedPlan, setSelectedPlan] = useState<string | null>(planFromUrl || null);
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'annual'>(
    billingCycleFromUrl === 'annual' ? 'annual' : 'monthly'
  );

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('credit-card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardholderName, setCardholderName] = useState<string>('');
  
  // Processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 15H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      supportedCurrencies: ['USD', 'LKR', 'EUR', 'GBP']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 19H5.25C4.00736 19 3 17.9926 3 16.75V7.25C3 6.00736 4.00736 5 5.25 5H18.75C19.9926 5 21 6.00736 21 7.25V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 9L7.5 12L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.75 18.25L14 14.25L16.75 18.25L21 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      supportedCurrencies: ['USD', 'EUR', 'GBP']
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9H21L12 3L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 21H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      supportedCurrencies: ['USD', 'LKR', 'EUR', 'GBP']
    }
  ];

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
      ],
      price: {
        monthly: 999,
        annual: 799
      }
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
      ],
      price: {
        monthly: 2499,
        annual: 1999
      }
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

  // Format credit card number with spaces
  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

  // Handle subscription process
  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    
    // Basic validation for credit card payments
    if (selectedPaymentMethod === 'credit-card') {
      if (!cardNumber || cardNumber.replace(/\s+/g, '').length < 16) {
        setErrorMessage("Please enter a valid card number");
        return;
      }
      
      if (!cardExpiry || cardExpiry.length < 5) {
        setErrorMessage("Please enter a valid expiry date");
        return;
      }
      
      if (!cardCvc || cardCvc.length < 3) {
        setErrorMessage("Please enter a valid CVC/CVV code");
        return;
      }
      
      if (!cardholderName) {
        setErrorMessage("Please enter the cardholder name");
        return;
      }
    }
    
    setIsProcessing(true);
    setErrorMessage(null);
    
    try {
      // In a real app, this would be an API call to process the subscription
      // For demo purposes, we'll simulate a successful subscription after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the current plan
      if (selectedPlan === 'premium') setCurrentPlan('premium');
      else if (selectedPlan === 'basic') setCurrentPlan('basic');
      
      // Set subscription end date
      const endDate = new Date();
      if (selectedBilling === 'annual') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }
      setSubscriptionEnds(endDate.toISOString().split('T')[0]);
      
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage("There was an error processing your subscription. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
      </div>
    );
  }

  // If we have parameters from the pricing page, show the upgrade UI
  if (planFromUrl && !isSuccess) {
    const plan = plans[planFromUrl] || plans.free;
    const price = priceFromUrl ? parseInt(priceFromUrl) : plan.price?.[selectedBilling] || 0;
    
    return (
      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-2">Upgrade to {plan.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            You're about to upgrade to our {plan.name}. Please review your selection below.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <div className="text-2xl font-bold">
              LKR {price.toLocaleString()}
              <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">
                /{selectedBilling === 'annual' ? 'mo, billed annually' : 'month'}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Billing cycle</div>
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setSelectedBilling('monthly')}
                  className={`px-3 py-1.5 rounded text-sm ${
                    selectedBilling === 'monthly' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedBilling('annual')}
                  className={`px-3 py-1.5 rounded text-sm ${
                    selectedBilling === 'annual' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Annual <span className="text-green-500">(Save 20%)</span>
                </button>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-2">Plan includes:</div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {selectedBilling === 'annual' && (
              <div className="text-sm bg-green-50 text-green-700 p-3 rounded dark:bg-green-900 dark:text-green-100">
                You'll save LKR {Math.round(price * 0.2 * 12).toLocaleString()} with annual billing!
              </div>
            )}
            
            <div className="pt-4 mt-2">
              <h4 className="text-base font-medium mb-3">Payment Method</h4>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className={`mb-1 ${selectedPaymentMethod === method.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {method.icon}
                    </div>
                    <span className="text-sm font-medium">{method.name}</span>
                  </button>
                ))}
              </div>
              
              {selectedPaymentMethod === 'credit-card' && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVC/CVV
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="col-span-3">
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {selectedPaymentMethod === 'paypal' && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Click "Complete subscription" below to be redirected to PayPal to complete your purchase securely.
                  </p>
                  <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-blue-500">
                      <path fill="currentColor" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.028-2.662 4.67-6.001 4.67h-2.189c-.524 0-.968.382-1.05.9l-1.75 11.095a.774.774 0 0 0 .767.91h3.956a.826.826 0 0 0 .817-.69l1.057-6.696L18.02 6.918h3.175c.01 0 .02-.12.028-.012z" />
                    </svg>
                  </div>
                </div>
              )}
              
              {selectedPaymentMethod === 'bank-transfer' && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Please use the following bank account details to complete your transfer:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="text-gray-500 dark:text-gray-400">Bank Name:</div>
                      <div className="font-medium">Neural Bank of Ceylon</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-gray-500 dark:text-gray-400">Account Name:</div>
                      <div className="font-medium">Neural Network Explorer Ltd</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-gray-500 dark:text-gray-400">Account Number:</div>
                      <div className="font-medium">1234567890</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-gray-500 dark:text-gray-400">Branch Code:</div>
                      <div className="font-medium">001</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-gray-500 dark:text-gray-400">Reference:</div>
                      <div className="font-medium">NNE-{Math.floor(Math.random() * 10000)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex justify-between">
              <span>Total</span>
              <div className="text-right">
                <div className="font-bold">
                  LKR {selectedBilling === 'annual' 
                    ? (price * 12).toLocaleString()
                    : price.toLocaleString()
                  }
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedBilling === 'annual' ? 'Billed annually' : 'Billed monthly'}
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSubscribe} 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Complete subscription`
              )}
            </Button>
            
            {errorMessage && (
              <div className="text-red-600 text-center text-sm mt-2">
                {errorMessage}
              </div>
            )}
            
            <div className="text-xs text-gray-500 text-center dark:text-gray-400">
              By subscribing, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center p-6 space-y-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center mb-4 dark:bg-green-900 dark:text-green-100">
          <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Subscription Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Thank you for upgrading your plan. Your subscription is now active until {subscriptionEnds}.
        </p>
        <Button asChild className="mt-4">
          <Link href="/courses">Start Learning Now</Link>
        </Button>
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