"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CartProvider } from "@/lib/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { SafeComponent } from "@/components/ui/error-fallback";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SafeComponent>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        forcedTheme="light"
        disableTransitionOnChange
      >
        <SafeComponent>
          <LanguageProvider>
            <SafeComponent>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </SafeComponent>
          </LanguageProvider>
        </SafeComponent>
      </ThemeProvider>
    </SafeComponent>
  );
} 