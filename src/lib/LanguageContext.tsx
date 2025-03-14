"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTranslations } from "./translations";

type LanguageContextType = {
  language: "en" | "bg";
  setLanguage: (lang: "en" | "bg") => void;
  t: (key: string) => string | Record<string, unknown>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "bg">("bg");
  const { t } = useTranslations(language);

  // Store language preference in localStorage
  useEffect(() => {
    // Try to get language from localStorage
    try {
      const storedLanguage = localStorage.getItem("language") as "en" | "bg" | null;
      if (storedLanguage && (storedLanguage === "en" || storedLanguage === "bg")) {
        setLanguage(storedLanguage);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}; 