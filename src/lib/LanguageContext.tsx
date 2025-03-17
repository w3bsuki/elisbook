"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations as translationsData } from './translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, Record<string, string>>;
}

const defaultValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  translations: translationsData,
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationsData }}>
      {children}
    </LanguageContext.Provider>
  );
}; 