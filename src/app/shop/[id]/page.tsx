'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { shopBooks } from '@/lib/shop-data';
import { BookOpen, ShoppingCart, Heart, Star, Share2, Truck, Shield, RotateCcw, Tag, ArrowLeft, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ui/product-card';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export default function BookDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const book = shopBooks.find(b => b.id === id);
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (!book) {
      notFound();
    }
  }, [book]);
  
  if (!book) {
    return null;
  }
  
  // Get related books (same category)
  const relatedBooks = shopBooks
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);
  
  // Format publish date
  const formattedDate = book.publishDate 
    ? new Date(book.publishDate).toLocaleDateString(
        language === 'en' ? 'en-US' : 'bg-BG', 
        { year: 'numeric', month: 'long', day: 'numeric' }
      ) 
    : '';
  
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
      <div className="container mx-auto py-6 px-4 max-w-6xl">
        {/* Back button */}
        <Link 
          href="/shop" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "en" ? "Back to Shop" : "Назад към магазина"}
        </Link>
        
        {/* Main Content - More compact layout */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Left Column - Book Image */}
            <div className="p-6 md:p-8 md:border-r border-gray-200 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="relative w-full max-w-[260px] mx-auto">
                <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
                  <AspectRatio ratio={2/3}>
                    <Image
                      src={book.coverImage || '/images/placeholder-book.jpg'}
                      alt={book.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
            
            {/* Right Column - Book Details */}
            <div className="p-6 md:p-8 md:col-span-2">
              {/* Title and Badges */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {book.featured && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      {language === "en" ? "Featured" : "Препоръчано"}
                    </Badge>
                  )}
                  {book.category && (
                    <Badge variant="outline">
                      <Tag className="mr-1 h-3 w-3" />
                      {book.category}
                    </Badge>
                  )}
                  {book.digital && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      {language === "en" ? "Digital" : "Електронна"}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">{book.title}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    4.0 (24 {language === "en" ? "reviews" : "ревюта"})
                  </span>
                </div>
              </div>
              
              {/* Price and Actions */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold">{book.price?.toFixed(2)} BGN</span>
                  {(book as any).originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {((book as any).originalPrice).toFixed(2)} BGN
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || addedToCart}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1 h-9"
                  >
                    {isAddingToCart ? (
                      language === "en" ? "Adding..." : "Добавяне..."
                    ) : addedToCart ? (
                      language === "en" ? "Added!" : "Добавено!"
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {language === "en" ? "Add to Cart" : "Добави в количката"}
                      </>
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setIsWishlistActive(!isWishlistActive)}
                    className={cn(
                      "h-9 w-9",
                      isWishlistActive && "text-red-600 hover:text-red-600"
                    )}
                  >
                    <Heart className={cn("h-4 w-4", isWishlistActive && "fill-current")} />
                  </Button>
                  <Button size="icon" variant="outline" className="h-9 w-9">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Shipping Features */}
              <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-y border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span className="text-xs">
                    {language === "en" ? "Free Shipping over 50 BGN" : "Безплатна доставка над 50 лв."}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-xs">
                    {language === "en" ? "Secure Payment" : "Сигурно плащане"}
                  </span>
                </div>
              </div>
              
              {/* Book Information */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-9">
                  <TabsTrigger value="description" className="text-xs">
                    {language === "en" ? "Description" : "Описание"}
                  </TabsTrigger>
                  <TabsTrigger value="details" className="text-xs">
                    {language === "en" ? "Details" : "Детайли"}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-3">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {book.description}
                  </p>
                </TabsContent>
                <TabsContent value="details" className="mt-3">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                    {book.isbn && (
                      <div>
                        <span className="font-medium">ISBN: </span>
                        {book.isbn}
                      </div>
                    )}
                    {book.publisher && (
                      <div>
                        <span className="font-medium">
                          {language === "en" ? "Publisher: " : "Издател: "}
                        </span>
                        {book.publisher}
                      </div>
                    )}
                    {formattedDate && (
                      <div>
                        <span className="font-medium">
                          {language === "en" ? "Published: " : "Издадена: "}
                        </span>
                        {formattedDate}
                      </div>
                    )}
                    {book.pages && (
                      <div>
                        <span className="font-medium">
                          {language === "en" ? "Pages: " : "Страници: "}
                        </span>
                        {book.pages}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">
              {language === "en" ? "Related Books" : "Подобни книги"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedBooks.map((relatedBook) => (
                <ProductCard 
                  key={relatedBook.id}
                  book={relatedBook}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 