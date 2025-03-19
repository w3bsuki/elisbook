"use client";

import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { cn } from "@/lib/utils";

export function ShopButton() {
  const { language } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        className="bg-white hover:bg-gray-100 text-gray-900 text-base px-5 py-1.5 h-auto rounded-md border-2 border-green-900 shadow-[3px_3px_0px_0px_rgba(20,83,45,1)] hover:shadow-[5px_5px_0px_0px_rgba(20,83,45,1)] transition-all duration-200 font-medium group hover:translate-y-[-2px]" 
        asChild
      >
        <Link href="/shop" className="flex items-center">
          <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110 text-green-700" />
          {language === "en" ? "Shop" : "Магазин"}
        </Link>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="relative bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Button>
    </div>
  );
} 