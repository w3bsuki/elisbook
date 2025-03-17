"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      disableTransitionOnChange
    >
      <LanguageProvider>
        {children}
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
} 