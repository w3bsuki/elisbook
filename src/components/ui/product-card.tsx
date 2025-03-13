"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

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
  const { language, t } = useLanguage();
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md max-w-xs mx-auto", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <div className="absolute right-2 top-2 z-10">
          {book.featured && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-xs px-2 py-0.5">
              {ensureString(t("productCard.featured"))}
            </Badge>
          )}
        </div>
        <Link href={`/shop/${book.id}`}>
          <div className="relative h-full w-full">
            <Image
              src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop"}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </div>
      <CardContent className="p-3">
        <Link href={`/shop/${book.id}`} className="hover:underline">
          <h3 className="font-semibold text-base line-clamp-1">{book.title}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{book.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-sm">${book.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(book.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'bg-BG', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-3 pt-0">
        <Button className="flex-1 h-8 text-xs bg-orange-500 hover:bg-orange-600 text-white border-2 border-black shadow-sm hover:shadow-md transition-all duration-200" size="sm">
          <ShoppingCart className="mr-1 h-3 w-3" />
          {ensureString(t("productCard.buyNow"))}
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Heart className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
} 