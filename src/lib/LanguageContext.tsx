"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import englishTranslations from '@/lib/translations/en.json';
import sinhalaTranslations from '@/lib/translations/si.json';

type Language = 'en' | 'si';

type Translations = {
  [key: string]: string | Record<string, any>;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Translations> = {
  en: englishTranslations,
  si: sinhalaTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to get the language from localStorage, default to English
  const [language, setLanguageState] = useState<Language>('en');

  // Load the saved language preference when the component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'si')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };
  // Function to get translated text
  const t = (key: string): string => {
    // Handle nested keys like 'nav.courses'
    if (key.includes('.')) {
      const keys = key.split('.');
      let value = translations[language];
      
      // Navigate through nested objects
      for (const k of keys) {
        if (!value || typeof value !== 'object') return key;
        value = value[k];
      }
      
      return typeof value === 'string' ? value : key;
    } else {
      // Handle simple keys
      const value = translations[language][key];
      return typeof value === 'string' ? value : key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}