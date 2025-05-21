"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  category: string;
  items: FAQItem[];
}

export default function FAQPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});
  const [faqSections, setFaqSections] = useState<FAQSection[]>([]);

  useEffect(() => {
    // Format the FAQ data from translations
    const categories = [
      { key: "general", items: ["what_is_nne", "who_is_for", "languages"] },
      { key: "courses", items: ["course_access", "certificate"] },
      { key: "account", items: ["cancel_subscription"] },
      { key: "technical", items: ["technical_issues", "browser"] }
    ];

    const formattedSections = categories.map(category => ({
      category: t(`faq.categories.${category.key}`),
      key: category.key,
      items: category.items.map(item => ({
        id: item,
        question: t(`faq.questions.${item}.question`),
        answer: t(`faq.questions.${item}.answer`)
      }))
    }));

    setFaqSections(formattedSections);
  }, [t]);

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t('faq.title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('faq.subtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Categories sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-4 text-lg">{t('faq.title')}</h3>
            <nav className="space-y-1">
              {faqSections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveCategory(section.key)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === section.key
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* FAQ content */}
        <div className="md:col-span-3">
          <div className="space-y-6">
            {faqSections
              .find(section => section.key === activeCategory)
              ?.items.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="border dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <h3 className="font-medium text-lg">{item.question}</h3>
                    <span className="ml-2">
                      {openQuestions[item.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      )}
                    </span>
                  </button>
                  {openQuestions[item.id] && (
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
