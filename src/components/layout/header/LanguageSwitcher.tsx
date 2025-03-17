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
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-transparent hover:bg-green-700/50 text-white border-none shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={cn(
            "cursor-pointer flex items-center",
            language === "en" ? "bg-accent font-medium" : "hover:bg-accent/50"
          )}
        >
          <span className="mr-2 text-base">🇬🇧</span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('bg')} 
          className={cn(
            "cursor-pointer flex items-center",
            language === "bg" ? "bg-accent font-medium" : "hover:bg-accent/50"
          )}
        >
          <span className="mr-2 text-base">🇧🇬</span> Български
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 