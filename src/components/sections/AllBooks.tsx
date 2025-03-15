"use client";

import { useState } from "react";
import Link from "next/link";
import { Library, ChevronRight, Eye, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { shopBooks } from "@/lib/shop-data";
import FlipCard from "@/components/animata/card/flip-card";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
        
        {/* Enhanced background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 rounded-br-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 rounded-tl-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 mb-4">
            <Library className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Complete Collection' : 'Пълна Колекция'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'Explore' : 'Всички'}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-purple-200 dark:bg-purple-700/50 -z-10 transform -rotate-1"></span>
            </span>{" "}
            {language === 'en' ? 'All Books' : 'Книги'}
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
                className="flex flex-col h-full group relative overflow-hidden border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(147,51,234,0.5)] dark:hover:shadow-[8px_8px_0px_0px_rgba(147,51,234,0.3)]"
              >
                {/* Category badge - top left */}
                <div className="absolute top-0 left-0 z-30">
                  <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-br-lg border-r-2 border-b-2 border-black dark:border-gray-700 shadow-md transform rotate-0 font-medium text-xs">
                    {formatCategory(book.category)}
                  </div>
                </div>
                
                {/* Book cover with hover effect */}
                <div className="relative p-5 pt-8 pb-0">
                  <div 
                    onClick={() => handleBookClick(book)} 
                    className="cursor-pointer transform transition-transform duration-300 group-hover:translate-y-[-5px] max-w-[200px] mx-auto"
                  >
                    <AspectRatio ratio={3/5} className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                      <FlipCard
                        image={book.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
                        title={book.title}
                        subtitle={formatCategory(book.category)}
                        description={book.description}
                        category={book.category || 'default'}
                        className="mx-auto shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  {/* Quick action button */}
                  <div className="absolute top-10 left-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      onClick={() => handleBookClick(book)}
                      title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
                    >
                      <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </div>
                </div>
                
                {/* Book details with purple accent border */}
                <div className="flex flex-col flex-grow p-5 pt-4 border-t-2 border-purple-600/20 dark:border-purple-600/10 mt-3 bg-gray-50 dark:bg-gray-800/80">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{getDisplayTitle(book)}</h3>
                    <span className="font-bold text-base text-purple-600 dark:text-purple-400">{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                    {book.description}
                  </p>
                  
                  {/* Action buttons in a unified container */}
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-950/30 flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm"
                      onClick={() => handleBookClick(book)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      {language === 'en' ? 'Preview' : 'Преглед'}
                    </Button>
                    
                    <Button 
                      size="sm"
                      className={cn(
                        "bg-purple-600 hover:bg-purple-700 text-white flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm",
                        "transition-transform duration-200 hover:scale-105"
                      )}
                      asChild
                    >
                      <Link href={`/shop/${book.id}`}>
                        <BookText className="h-3 w-3 mr-1" />
                        {language === 'en' ? 'Details' : 'Детайли'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="flex justify-center mt-16">
          <Button 
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-950/30 group border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 px-6 py-5 h-auto rounded-md"
            asChild
          >
            <Link href="/shop" className="flex items-center">
              {language === 'en' ? 'Visit Full Shop' : 'Посетете Пълния Магазин'}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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