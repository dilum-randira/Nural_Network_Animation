"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t('contact.title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {t('contact.subtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-4 text-green-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>                <h3 className="text-xl font-semibold mb-2">{t('contact.form.thank_you')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('contact.form.success_message')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.subject')}
                  </label>                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  >
                    <option value="">{t('contact.form.subject_placeholder')}</option>
                    <option value="general">{t('contact.form.general')}</option>
                    <option value="support">{t('contact.form.support')}</option>
                    <option value="feedback">{t('contact.form.feedback')}</option>
                    <option value="partnership">{t('contact.form.partnership')}</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  ></textarea>
                </div>
                <div>                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">            <h2 className="text-xl font-semibold mb-4">{t('contact.info.title')}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3 text-blue-500 flex-shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div>
                  <h3 className="font-medium">{t('contact.info.phone')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('contact.info.phone_number')}</p>
                </div>
              </div>
                <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3 text-blue-500 flex-shrink-0"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <div>
                  <h3 className="font-medium">{t('contact.info.email')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('contact.info.email_address')}</p>
                </div>
              </div>
                <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3 text-blue-500 flex-shrink-0"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <h3 className="font-medium">{t('contact.info.address')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('contact.info.address_line1')}<br />
                    {t('contact.info.address_line2')}<br />
                    {t('contact.info.address_line3')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">{t('contact.info.hours_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('contact.info.hours_weekday')}<br />
                {t('contact.info.hours_saturday')}<br />
                {t('contact.info.hours_sunday')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
