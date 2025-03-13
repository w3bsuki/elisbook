"use client";

import { BookOpen, UserCircle, ArrowDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/lib/LanguageContext";
import FlipCard from "@/components/animata/card/flip-card";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export default function Hero() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { t, language } = useLanguage();

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Book data
  const books = [
    {
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
      title: language === 'bg' ? "Мляко и мед" : "Milk and Honey",
      subtitle: language === 'bg' ? "Поезия" : "Poetry",
      description: language === 'bg' 
        ? "Колекция от стихове, изследващи теми за любовта, загубата, травмата и изцелението."
        : "A collection of poetry exploring themes of love, loss, trauma, and healing."
    },
    {
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1776&auto=format&fit=crop",
      title: language === 'bg' ? "Изкуството на писането" : "The Art of Writing",
      subtitle: language === 'bg' ? "Ръководство" : "Guide",
      description: language === 'bg'
        ? "Практически съвети и техники за подобряване на вашите писателски умения."
        : "Practical advice and techniques to improve your writing skills."
    },
    {
      image: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=690&auto=format&fit=crop",
      title: language === 'bg' ? "Хрониките на Нарния" : "The Chronicles of Narnia",
      subtitle: language === 'bg' ? "Фентъзи" : "Fantasy",
      description: language === 'bg'
        ? "Класическа фентъзи поредица, изследваща теми за вярата, смелостта и приключенията."
        : "A classic fantasy series exploring themes of faith, courage, and adventure."
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10">
            <div className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
              {ensureString(t("hero.tagline"))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {ensureString(t("hero.title"))}{" "}
              <span className="block mt-1 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                {ensureString(t("hero.titleHighlight"))}
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button className="px-6 bg-orange-600 hover:bg-orange-700">
                <BookOpen className="mr-2 h-4 w-4" />
                {ensureString(t("hero.cta"))}
              </Button>
              <Button 
                className="px-6 bg-orange-600 hover:bg-orange-700"
                onClick={() => setIsAboutOpen(true)}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                {language === 'bg' ? 'Запознай се с автора' : 'Meet the Author'}
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-3xl mx-auto mt-8">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {books.map((book, index) => (
                <FlipCard
                  key={index}
                  image={book.image}
                  title={book.title}
                  subtitle={book.subtitle}
                  description={book.description}
                  className={index === 1 ? "z-10" : ""}
                />
              ))}
            </div>
          </div>
          
          <div 
            className="flex flex-col items-center cursor-pointer mt-12 text-muted-foreground hover:text-foreground transition-colors" 
            onClick={scrollToNextSection}
          >
            <span className="text-sm mb-1">{ensureString(t("hero.scrollDown"))}</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>

      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold">{ensureString(t("aboutElis.title"))}</DialogTitle>
          </DialogHeader>
          <div className="pt-3 space-y-3 text-xs text-muted-foreground">
            <div>
              {ensureString(t("aboutElis.content1"))}
            </div>
            <div>
              {ensureString(t("aboutElis.content2"))}
            </div>
            <div>
              {ensureString(t("aboutElis.content3"))}
            </div>
            <div className="italic">
              {ensureString(t("aboutElis.quote"))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
} 