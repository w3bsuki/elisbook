"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

interface ProductCardProps {
  book: Book;
  className?: string;
}

export function ProductCard({ book, className }: ProductCardProps) {
  const { language, translations } = useLanguage();
  
  // Create a local translation function if t is not provided
  const getTranslation = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Define spine color based on category
  const getSpineColor = () => {
    switch (book.category) {
      case 'health':
        return "bg-green-700";
      case 'poetry':
        return "bg-pink-700";
      case 'selfHelp':
        return "bg-purple-700";
      default:
        return "bg-green-700";
    }
  };
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md max-w-xs mx-auto border-2 border-black", className)}>
      <div className="relative">
        {/* Spine effect */}
        <div className={cn("absolute left-0 top-0 h-full w-[10px] z-10", getSpineColor())}></div>
        
        <div className="relative overflow-hidden bg-muted">
          <AspectRatio ratio={3/4}>
            <div className="absolute right-2 top-2 z-10 flex gap-1">
              {book.featured && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 text-xs px-2 py-0.5">
                  <Sparkles className="mr-1 h-3 w-3" />
                  {ensureString(getTranslation("productCard.featured"))}
                </Badge>
              )}
              {book.category && (
                <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs px-2 py-0.5">
                  {book.category === 'health' ? ensureString(getTranslation("categories.health")) : 
                   book.category === 'poetry' ? ensureString(getTranslation("categories.poetry")) : 
                   book.category === 'selfHelp' ? ensureString(getTranslation("categories.selfHelp")) : 
                   book.category}
                </Badge>
              )}
            </div>
            <Link href={`/shop/${book.id}`}>
              <div className="relative h-full w-full">
                <Image
                  src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop"}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  quality={90}
                  priority={book.featured}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
          </AspectRatio>
        </div>
      </div>
      <CardContent className="p-3">
        <Link href={`/shop/${book.id}`} className="hover:underline">
          <h3 className="font-semibold text-base line-clamp-1">{book.title}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{book.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-sm">{book.price.toFixed(2)} лв.</span>
          <span className="text-xs text-muted-foreground">
            {new Date(book.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'bg-BG', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-3 pt-0">
        <Button className="flex-1 h-8 text-xs bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-sm hover:shadow-md transition-all duration-200" size="sm">
          <ShoppingCart className="mr-1 h-3 w-3" />
          {ensureString(getTranslation("productCard.buyNow"))}
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 border-2 border-black">
          <Heart className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
} 