"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
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
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative text-center mb-12">
          <div className="flex items-center justify-center">
            <div className="w-1/3 h-px bg-gray-300 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #d1d5db 50%, #d1d5db 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
            <div className="mx-6 flex items-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-normal uppercase text-3xl">
                {language === 'en' ? 'BESTSELLERS' : 'БЕСТСЕЛЪРИ'}
              </span>
            </div>
            <div className="w-1/3 h-px bg-gray-300 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #d1d5db 0%, #d1d5db 50%, transparent 50%, transparent 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {bestsellers.map((book, index) => (
            <div 
              key={book.id} 
              onClick={() => handleBookClick(book)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FlipCard
                image="/images/books/vdahnovenia-kniga-1.png"
                title={book.title}
                subtitle={formatCategory(book.category)}
                description={book.description}
                category={book.category || 'default'}
                className={index === 1 ? "z-10" : ""}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <Button className="px-8 py-6 bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1 hover:scale-105" asChild>
            <Link href="/bestsellers">
              <BookOpen className="mr-2 h-5 w-5" />
              {language === 'en' ? 'View All Bestsellers' : 'Вижте всички бестселъри'}
            </Link>
          </Button>
        </div>
      </div>
      
      {selectedBook && (
        <BookPreviewDialog 
          book={{
            ...selectedBook,
            image: "/images/books/vdahnovenia-kniga-1.png"
          }}
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
    </section>
  );
} 