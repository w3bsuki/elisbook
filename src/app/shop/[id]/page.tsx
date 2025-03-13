'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { shopBooks } from '@/lib/shop-data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ui/product-card';

export default function BookDetailPage({ params }: { params: { id: string } }) {
  // Find the book with the matching ID
  const book = shopBooks.find((book) => book.id === params.id);

  // If book not found, return 404
  if (!book) {
    notFound();
  }

  // Get related books (excluding the current book)
  const relatedBooks = shopBooks
    .filter((b) => b.id !== book.id)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, 3); // Get first 3 items

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/shop" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
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
              className="object-cover"
              priority
            />
            {book.featured && (
              <div className="absolute right-4 top-4">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  Featured
                </Badge>
              </div>
            )}
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
              <span className="text-sm text-muted-foreground">4.0 (24 reviews)</span>
            </div>
            
            <div className="mt-6">
              <p className="text-2xl font-semibold">${book.price.toFixed(2)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Published: {new Date(book.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{book.description}</p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now
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
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground">Free standard shipping on orders over $35</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Secure Payment</h4>
                  <p className="text-sm text-muted-foreground">Your payment information is processed securely</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-muted-foreground">Simple returns up to 30 days from purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
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