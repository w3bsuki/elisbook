"use client";

import Image from "next/image";
import { BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/lib/LanguageContext";

interface BookPreviewDialogProps {
  book: {
    id: string;
    title: string;
    description: string;
    category?: string;
    price?: number;
    image?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookPreviewDialog({ book, open, onOpenChange }: BookPreviewDialogProps) {
  const { language } = useLanguage();
  
  // Translate category if needed
  const getCategory = () => {
    if (!book.category) return "";
    
    if (language === 'bg') {
      return book.category === 'health' ? 'Здраве' 
        : book.category === 'poetry' ? 'Поезия' 
        : book.category === 'selfHelp' ? 'Самопомощ'
        : book.category;
    }
    
    return book.category.charAt(0).toUpperCase() + book.category.slice(1);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-black dark:border-gray-700 p-0 overflow-hidden">
        <div className="relative">
          <AspectRatio ratio={16/9} className="w-full">
            <div className="relative h-full w-full">
              <Image
                src={book.image || "/images/books/vdahnovenia-kniga-1.png"}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button 
                onClick={() => onOpenChange(false)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              {book.category && (
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-none">
                  {getCategory()}
                </div>
              )}
            </div>
          </AspectRatio>
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{book.title}</DialogTitle>
            <DialogDescription className="text-sm mt-2">
              {book.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 flex justify-between items-center">
            {book.price && (
              <div className="font-bold text-lg">
                {language === 'bg' ? `${book.price.toFixed(2)} лв.` : `$${book.price.toFixed(2)}`}
              </div>
            )}
            <Button className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-none">
              <BookOpen className="mr-2 h-4 w-4" />
              {language === 'bg' ? 'Прочетете повече' : 'Read More'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 