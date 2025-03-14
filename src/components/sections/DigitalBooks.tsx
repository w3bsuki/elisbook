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

export default function DigitalBooks() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { language } = useLanguage();
  
  // For this example, we'll use the first 3 books as digital books
  const digitalBooks = shopBooks.slice(0, 3);
  
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsPreviewOpen(true);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative text-center mb-12">
          <div className="flex items-center justify-center">
            <div className="w-1/3 h-px bg-gray-300 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, #d1d5db 50%, #d1d5db 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
            <div className="mx-6 flex items-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-normal uppercase text-3xl">
                {language === 'en' ? 'DIGITAL BOOKS' : 'ДИГИТАЛНИ КНИГИ'}
              </span>
            </div>
            <div className="w-1/3 h-px bg-gray-300 relative">
              <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #d1d5db 0%, #d1d5db 50%, transparent 50%, transparent 100%)', backgroundSize: '8px 1px' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {digitalBooks.map((book, index) => (
            <div 
              key={book.id} 
              onClick={() => handleBookClick(book)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <FlipCard
                image="/images/books/vdahnovenia-kniga-1.png"
                title={book.title}
                subtitle={language === 'en' ? 'Digital' : 'Дигитална'}
                description={book.description}
                category={book.category || 'default'}
                className={index === 1 ? "z-10" : ""}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <Button className="px-8 py-6 bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1 hover:scale-105" asChild>
            <Link href="/digital">
              <BookOpen className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Digital Shop' : 'Дигитален Магазин'}
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