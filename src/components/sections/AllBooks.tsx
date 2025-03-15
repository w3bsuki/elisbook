"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Library } from "lucide-react";
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

export default function AllBooks() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { language } = useLanguage();
  
  // For this example, we'll show all books but limit to 6 for the preview
  const previewBooks = shopBooks.slice(0, 6);
  
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
      case '4': return 'Дневник на щастието';
      default: return book.title.split(' - ')[0];
    }
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
            <Library className="h-4 w-4" />
            {language === 'en' ? 'Complete Collection' : 'Пълна Колекция'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Explore All Books' : 'Всички Книги'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Browse our complete collection of books covering a wide range of topics from mindfulness to poetry.'
              : 'Разгледайте нашата пълна колекция от книги, обхващащи широк спектър от теми - от осъзнатост до поезия.'}
          </p>
        </div>
        
        {/* Books grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewBooks.map((book) => (
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
                </div>
                
                {/* Book title below card */}
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{getDisplayTitle(book)}</h3>
                  <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 text-xs font-medium rounded mt-2">
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
            className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none group h-14 px-8" 
            asChild
          >
            <Link href="/shop" className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              {language === 'en' ? 'Visit Full Shop' : 'Посетете Пълния Магазин'}
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