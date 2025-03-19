'use client';

import { useState, useEffect } from 'react';
import { BookPreviewDialog } from '@/components/ui/book-preview-dialog';
import { useParams } from 'next/navigation';
import { shopBooks } from '@/lib/shop-data';
import { BookOpen, CornerDownRight, ShoppingCart, TrendingUp, Heart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { notFound } from 'next/navigation';
import { ArrowLeft, Share2, Calendar, Tag, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ui/product-card';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const book = shopBooks.find(b => b.id === id);
  const { language, translations } = useLanguage();
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Create a local translation function
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
  
  if (!book) {
    notFound();
  }
  
  // Get related books (same category)
  const relatedBooks = shopBooks
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);
  
  // Format publish date
  const formattedDate = new Date(book.publishDate).toLocaleDateString(
    language === 'en' ? 'en-US' : 'bg-BG', 
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  
  // Get category name translation
  const getCategoryName = (category: string) => {
    switch(category) {
      case 'health': return ensureString(getTranslation("categories.health"));
      case 'poetry': return ensureString(getTranslation("categories.poetry"));
      case 'selfHelp': return ensureString(getTranslation("categories.selfHelp"));
      default: return category;
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      addToCart(book, 1);
      setIsAddingToCart(false);
      setAddedToCart(true);
      
      // Reset added state after a delay
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {ensureString(getTranslation("shop.backToShop"))}
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="overflow-hidden border-2 border-black shadow-lg bg-white dark:bg-gray-800">
              <div className="p-0">
                <AspectRatio ratio={3/4} className="bg-muted">
                  <Image
                    src={book.coverImage || '/images/placeholder-book.jpg'}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                    className="object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
            
            {/* Share and wishlist buttons */}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-2 border-black">
                <Share2 className="mr-2 h-4 w-4" />
                {ensureString(getTranslation("productDetail.share"))}
              </Button>
              <Button 
                variant={isWishlistActive ? "default" : "outline"} 
                size="sm" 
                className={`flex-1 border-2 border-black ${isWishlistActive ? 'bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700' : ''}`}
                onClick={() => setIsWishlistActive(!isWishlistActive)}
              >
                <Heart className={`mr-2 h-4 w-4 ${isWishlistActive ? 'fill-red-600' : ''}`} />
                {ensureString(getTranslation("productDetail.wishlist"))}
              </Button>
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            {/* Title and badges */}
            <div className="mb-4">
              {book.featured && (
                <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-200">
                  {ensureString(getTranslation("productDetail.featured"))}
                </Badge>
              )}
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{book.title}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">
                  <Tag className="mr-1 h-3 w-3" />
                  {getCategoryName(book.category)}
                </Badge>
                {book.digital && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {ensureString(getTranslation("productDetail.digital"))}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Price and buy button */}
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">{ensureString(getTranslation("productDetail.price"))}</p>
                <p className="text-3xl font-bold">{book.price.toFixed(2)} лв.</p>
              </div>
              <Button 
                className="h-12 px-6 bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all"
                onClick={handleAddToCart}
                disabled={isAddingToCart || addedToCart}
              >
                {isAddingToCart ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'en' ? 'Adding...' : 'Добавяне...'}
                  </span>
                ) : addedToCart ? (
                  <span className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    {language === 'en' ? 'Added' : 'Добавено'}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {ensureString(getTranslation("productDetail.addToCart"))}
                  </span>
                )}
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            {/* Book details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">{ensureString(getTranslation("productDetail.isbn"))}</p>
                <p className="font-medium">{book.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{ensureString(getTranslation("productDetail.publisher"))}</p>
                <p className="font-medium">{book.publisher}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{ensureString(getTranslation("productDetail.publishDate"))}</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{ensureString(getTranslation("productDetail.pages"))}</p>
                <p className="font-medium">{book.pages} {ensureString(getTranslation("productDetail.pagesUnit"))}</p>
              </div>
            </div>
            
            {/* Tabs for description and details */}
            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="border border-gray-200 rounded-md mb-4">
                <TabsTrigger value="description">{ensureString(getTranslation("productDetail.description"))}</TabsTrigger>
                <TabsTrigger value="details">{ensureString(getTranslation("productDetail.details"))}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-sm md:text-base leading-relaxed">{book.description}</p>
              </TabsContent>
              <TabsContent value="details" className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{ensureString(getTranslation("productDetail.pages"))}</p>
                      <p className="text-sm text-muted-foreground">{book.pages} {ensureString(getTranslation("productDetail.pagesUnit"))}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{ensureString(getTranslation("productDetail.publisher"))}</p>
                      <p className="text-sm text-muted-foreground">{book.publisher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{ensureString(getTranslation("productDetail.publishDate"))}</p>
                      <p className="text-sm text-muted-foreground">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{ensureString(getTranslation("productDetail.isbn"))}</p>
                      <p className="text-sm text-muted-foreground">{book.isbn}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Books Section */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              {ensureString(getTranslation("productDetail.relatedBooks"))}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <ProductCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 