"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/LanguageContext";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { language } = useLanguage();
  
  const lightText = language === 'bg' ? 'Светла' : 'Light';
  const darkText = language === 'bg' ? 'Тъмна' : 'Dark';
  const systemText = language === 'bg' ? 'Системна' : 'System';

  // Force theme application on mount
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-none">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {language === 'en' ? 'Light' : 'Светла'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {language === 'en' ? 'Dark' : 'Тъмна'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {language === 'en' ? 'System' : 'Системна'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 