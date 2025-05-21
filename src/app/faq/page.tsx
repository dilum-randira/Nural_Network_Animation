"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSection {
  category: string;
  key: string;
  items: FAQItem[];
}

export default function FAQPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});
  const [faqSections, setFaqSections] = useState<FAQSection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FAQItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 2) {
      setIsSearching(true);
      const lowerCaseQuery = query.toLowerCase();
      
      // Search through all sections and items
      const results = faqSections.flatMap(section => 
        section.items.filter(item => 
          item.question.toLowerCase().includes(lowerCaseQuery) || 
          item.answer.toLowerCase().includes(lowerCaseQuery)
        )
      );
      
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };
  return (
    <div className="container mx-auto px-4 py-12">      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('faq.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">{t('faq.subtitle')}</p>
        
        {/* Search bar */}
        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search in FAQ..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Categories sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="font-medium mb-4 text-lg border-b pb-2 dark:border-gray-700">{t('faq.title')}</h3>
            <nav className="space-y-1">
              {faqSections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveCategory(section.key)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === section.key
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </nav>
          </div>
        </div>        {/* FAQ content */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">{faqSections.find(section => section.key === activeCategory)?.category}</h2>
            <div className="space-y-4">
              {faqSections
                .find(section => section.key === activeCategory)
                ?.items.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`} 
                    className="border dark:border-gray-700 rounded-lg overflow-hidden transition-shadow hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      aria-expanded={openQuestions[item.id]}
                    >
                      <h3 className="font-medium text-lg">{item.question}</h3>
                      <span className={`ml-2 transition-transform duration-200 ${openQuestions[item.id] ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openQuestions[item.id] ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
