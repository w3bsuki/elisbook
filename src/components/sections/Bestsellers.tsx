"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { shopBooks } from "@/lib/shop-data";
import FlipCard from "@/components/animata/card/flip-card";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";

// Define a Book type to replace 'any'
interface Book {
  id: string;
  title: string;
  description: string;
  category?: string;
  price?: number;
  featured?: boolean;
  image?: string;
  coverImage?: string;
}

export default function Bestsellers() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { language } = useLanguage();
  
  // Filter bestsellers - for this example, we'll use the featured books
  const bestsellers = shopBooks.filter(book => book.featured);
  
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsPreviewOpen(true);
  };
  
  // Helper function to safely format category
  const formatCategory = (category?: string): string => {
    if (!category) return '';
    
    if (language === 'en') {
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      switch (category) {
        case 'health': return 'Здраве';
        case 'poetry': return 'Поезия';
        case 'selfHelp': return 'Самопомощ';
        default: return category;
      }
    }
  };
  
  // Helper function to get the display title for each book
  const getDisplayTitle = (book: Book): string => {
    // Map book IDs to their display titles
    switch (book.id) {
      case '1': return 'Осъзнато Хранене';
      case '2': 
      case '3': return 'Вдъхновения';
      case '6': return 'С душа и сърце';
      case '5': return 'Дневник на успеха';
      default: return book.title.split(' - ')[0];
    }
  };
  
  return (
    <section id="books" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400 mb-4">
            <Star className="h-4 w-4" />
            {language === 'en' ? 'Reader Favorites' : 'Читателски Фаворити'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Bestselling Books' : 'Бестселъри'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover the books that have touched the hearts and minds of readers around the world.'
              : 'Открийте книгите, които докоснаха сърцата и умовете на читателите по целия свят.'}
          </p>
        </div>
        
        {/* Books grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((book, index) => (
              <div 
                key={book.id} 
                onClick={() => handleBookClick(book)}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              >
                <div className="relative">
                  <FlipCard
                    image={book.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
                    title={book.title}
                    subtitle={formatCategory(book.category)}
                    description={book.description}
                    category={book.category || 'default'}
                    className="mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                  />
                  
                  {/* Bestseller badge */}
                  <div className="absolute -top-4 -right-4 bg-yellow-500 text-black px-3 py-1 rounded-full border-2 border-black dark:border-gray-700 shadow-md z-20 transform rotate-12">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-bold text-xs">
                        {language === 'en' ? 'Bestseller' : 'Бестселър'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Book title below card - updated format with correct titles */}
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{getDisplayTitle(book)}</h3>
                  <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 text-xs font-medium rounded mt-2">
                    {formatCategory(book.category)}
                  </div>
                  <p className="font-bold mt-2 text-lg">{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="flex justify-center mt-16">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none group h-14 px-8" 
            asChild
          >
            <Link href="/bestsellers" className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              {language === 'en' ? 'Explore All Bestsellers' : 'Разгледайте всички бестселъри'}
            </Link>
          </Button>
        </div>
      </div>
      
      {selectedBook && (
        <BookPreviewDialog 
          book={{
            ...selectedBook,
            image: selectedBook.coverImage || "/images/books/vdahnovenia-kniga-1.png"
          }}
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
    </section>
  );
} 