"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations as translationsData } from './translations';

// Define a more flexible type for translations that avoids circular references
type TranslationValue = string | Record<string, any>;
type TranslationsType = {
  [language: string]: Record<string, TranslationValue>;
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: TranslationsType;
  t?: (key: string) => string; // Optional translation function
}

const defaultValue: LanguageContextType = {
  language: 'bg',
  setLanguage: () => {},
  translations: translationsData,
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('bg');

  // Helper function to get translations
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translationsData[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationsData, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 