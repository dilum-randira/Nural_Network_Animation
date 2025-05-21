"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function NewsletterSubscription() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setSubscriptionStatus("idle");
    setErrorMessage("");
    
    // Validate email
    if (!email.trim()) {
      setSubscriptionStatus("error");
      setErrorMessage(t('blog.newsletter.error_email_required'));
      return;
    }
    
    if (!validateEmail(email)) {
      setSubscriptionStatus("error");
      setErrorMessage(t('blog.newsletter.error_email_invalid'));
      return;
    }
    
    // Submit the form
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated success
      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      setSubscriptionStatus("error");
      setErrorMessage(t('blog.newsletter.error_submission'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">{t('blog.newsletter.title')}</h3>
        <p className="mb-6 text-blue-100">
          {t('blog.newsletter.description')}
        </p>
        
        {subscriptionStatus === "success" ? (
          <div className="bg-green-500 bg-opacity-20 border border-green-300 rounded-md p-4 mb-4">
            <p>{t('blog.newsletter.success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('blog.newsletter.email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-70"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? t('blog.newsletter.subscribing') : t('blog.newsletter.subscribe_button')}
              </button>
            </div>
            
            {subscriptionStatus === "error" && (
              <p className="mt-3 text-sm text-red-200">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
