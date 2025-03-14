'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, BookOpen, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ui/product-card';
import { Book } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

interface BookDetailClientProps {
  book: Book;
  relatedBooks: Book[];
}

export default function BookDetailClient({ book, relatedBooks }: BookDetailClientProps) {
  const { language, t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/shop" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {ensureString(t("bookDetail.backToShop"))}
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <Image
              src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop"}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              quality={95}
              priority
              className="object-cover"
            />
            <div className="absolute right-4 top-4 flex gap-2">
              {book.featured && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {ensureString(t("bookDetail.featured"))}
                </Badge>
              )}
              {book.category && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {book.category === 'health' ? ensureString(t("categories.health")) : 
                   book.category === 'poetry' ? ensureString(t("categories.poetry")) : 
                   book.category === 'selfHelp' ? ensureString(t("categories.selfHelp")) : 
                   book.category}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{book.title}</h1>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.0 (24 {ensureString(t("bookDetail.reviews"))})</span>
            </div>
            
            <div className="mt-6">
              <p className="text-2xl font-semibold">{book.price.toFixed(2)} лв.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {ensureString(t("bookDetail.published"))}: {new Date(book.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'bg-BG', { 
                  year: 'numeric', 
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="font-medium">{ensureString(t("bookDetail.description"))}</h3>
              <p className="text-muted-foreground">{book.description}</p>
            </div>
            
            {/* Book Details */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {book.publisher && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">{ensureString(t("bookDetail.publisher"))}: </span>
                    {book.publisher}
                  </span>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">{ensureString(t("bookDetail.pages"))}: </span>
                    {book.pages}
                  </span>
                </div>
              )}
              {book.isbn && (
                <div className="flex items-center gap-2 col-span-2">
                  <span className="text-sm">
                    <span className="font-medium">ISBN: </span>
                    {book.isbn}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="flex-1 bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {ensureString(t("bookDetail.buyNow"))}
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            {/* Shipping Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{ensureString(t("bookDetail.freeShipping"))}</h4>
                  <p className="text-sm text-muted-foreground">{ensureString(t("bookDetail.freeShippingDesc"))}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{ensureString(t("bookDetail.securePayment"))}</h4>
                  <p className="text-sm text-muted-foreground">{ensureString(t("bookDetail.securePaymentDesc"))}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{ensureString(t("bookDetail.returns"))}</h4>
                  <p className="text-sm text-muted-foreground">{ensureString(t("bookDetail.returnsDesc"))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">{ensureString(t("bookDetail.youMayAlsoLike"))}</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedBooks.map((relatedBook) => (
              <ProductCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 