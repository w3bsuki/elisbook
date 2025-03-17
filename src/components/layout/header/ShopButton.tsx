"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export function ShopButton() {
  const { language } = useLanguage();
  
  return (
    <Button 
      className="bg-white hover:bg-gray-100 text-green-700 text-base px-5 py-1.5 h-auto rounded-md border-2 border-green-900 shadow-[3px_3px_0px_0px_rgba(20,83,45,1)] hover:shadow-[5px_5px_0px_0px_rgba(20,83,45,1)] transition-all duration-200 font-medium group hover:translate-y-[-2px]" 
      asChild
    >
      <Link href="/shop" className="flex items-center">
        <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
        {language === "en" ? "Shop" : "Магазин"}
      </Link>
    </Button>
  );
} 