"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bg' : 'en');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-transparent hover:bg-green-700 text-white border-none shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
        <DropdownMenuItem onClick={toggleLanguage} className={cn(language === "en" && "bg-accent")}>
          <span className="mr-2">🇬🇧</span> English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleLanguage} className={cn(language === "bg" && "bg-accent")}>
          <span className="mr-2">🇧🇬</span> Български
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 