"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

// Import types from local types file
import { NavigationProps } from "./types";

interface MobileNavigationProps extends NavigationProps {
  isMenuOpen: boolean | string;
  setIsMenuOpen: (value: boolean | string) => void;
  headerHeight: number;
}

export function MobileNavigation({ 
  isMenuOpen, 
  setIsMenuOpen, 
  headerHeight, 
  books, 
  services, 
  onBookClick,
  onServiceClick
}: MobileNavigationProps) {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  
  // Simplified navigation translations
  const navTranslations = {
    about: language === 'en' ? 'About' : 'За Мен',
    books: language === 'en' ? 'Books' : 'Книги',
    blog: language === 'en' ? 'Blog' : 'Блог',
    shop: language === 'en' ? 'Shop' : 'Магазин',
    services: language === 'en' ? 'Services' : 'Услуги',
    contact: language === 'en' ? 'Contact' : 'Контакти',
  };
  
  const mobileMenuStyle = {
    top: `${headerHeight}px`,
    height: `calc(100vh - ${headerHeight}px)`
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bg' : 'en');
  };
  
  return (
    <>
      <div className="flex items-center gap-4 md:hidden flex-1 justify-end">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Main Menu"
          className="bg-transparent hover:bg-green-700 text-white border-none shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={() => {
            if (isMenuOpen) {
              setIsMenuOpen(false);
            } else {
              setIsMenuOpen(true);
            }
          }}
        >
          {!isMenuOpen && <Menu className="size-4" />}
          {isMenuOpen && <X className="size-4" />}
        </Button>
      </div>

      {/* Mobile Menu (Root) */}
      {isMenuOpen === true && (
        <div 
          style={{...mobileMenuStyle, backgroundColor: 'rgb(22 163 74) !important'}}
          className="fixed inset-x-0 bottom-0 flex flex-col overflow-y-auto max-h-[80vh] border-t border-white/20 !bg-green-600 dark:!bg-green-800 backdrop-blur-md md:hidden animate-in slide-in-from-right"
        >
          <div className="font-playfair">
            <Link 
              href="/about" 
              className={cn(
                "flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors",
                pathname === "/about" ? "bg-green-700" : "hover:bg-green-700"
              )}
            >
              <span className={cn(
                "flex-1 text-lg text-white",
                pathname === "/about" && "font-medium"
              )}>
                {navTranslations.about}
              </span>
            </Link>
            <button
              type="button"
              className="flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors hover:bg-green-700 text-white"
              onClick={() => setIsMenuOpen("books")}
            >
              <span className="flex-1 text-lg">{navTranslations.books}</span>
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              className="flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors hover:bg-purple-700 text-white"
              onClick={() => setIsMenuOpen("services")}
            >
              <span className="flex-1 text-lg">{navTranslations.services}</span>
              <ChevronRight className="size-4" />
            </button>
            <Link 
              href="/blog" 
              className={cn(
                "flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors",
                pathname === "/blog" ? "bg-green-700" : "hover:bg-green-700"
              )}
            >
              <span className={cn(
                "flex-1 text-lg text-white",
                pathname === "/blog" && "font-medium"
              )}>
                {navTranslations.blog}
              </span>
            </Link>
            <Link 
              href="/contact" 
              className={cn(
                "flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors",
                pathname === "/contact" ? "bg-green-700" : "hover:bg-green-700"
              )}
            >
              <span className={cn(
                "flex-1 text-lg text-white",
                pathname === "/contact" && "font-medium"
              )}>
                {navTranslations.contact}
              </span>
            </Link>
            <Link 
              href="/shop" 
              className={cn(
                "flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors",
                pathname === "/shop" ? "bg-green-700" : "hover:bg-green-700"
              )}
            >
              <span className={cn(
                "flex-1 text-lg text-white",
                pathname === "/shop" && "font-medium"
              )}>
                {language === 'en' ? 'Shop' : 'Магазин'}
              </span>
            </Link>
            <button
              type="button"
              className="flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors hover:bg-green-700 text-white"
              onClick={toggleLanguage}
            >
              <span className="flex-1 text-lg flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {language === "en" ? "Български" : "English"}
              </span>
            </button>
            
            <div className="flex justify-center gap-4 p-6">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-white hover:text-gray-100 transition-all duration-200 flex items-center justify-center h-10 w-10 bg-transparent hover:bg-green-700 rounded-full border border-white/20 hover:scale-110"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-white hover:text-gray-100 transition-all duration-200 flex items-center justify-center h-10 w-10 bg-transparent hover:bg-green-700 rounded-full border border-white/20 hover:scale-110"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu > Books */}
      {isMenuOpen === "books" && (
        <div 
          style={mobileMenuStyle}
          className="fixed inset-x-0 bottom-0 flex flex-col overflow-y-auto max-h-[80vh] !bg-green-600 dark:!bg-green-800 backdrop-blur-md md:hidden animate-in slide-in-from-right"
        >
          <div className="flex items-center justify-between px-8 py-3.5 border-b border-white/20">
            <div className="text-xs tracking-widest text-white uppercase font-semibold">
              {language === "en" ? "Book Categories" : "Категории Книги"}
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setIsMenuOpen(true)} 
              className="flex items-center bg-transparent hover:bg-green-700 text-white border-none shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <ChevronLeft className="mr-2 size-4" />
              {language === "en" ? "Back" : "Назад"}
            </Button>
          </div>
          <div>
            {books.map((book) => (
              <div
                key={book.id}
                className="group flex w-full items-start gap-x-4 border-b border-white/20 px-8 py-6 text-left hover:bg-green-700 transition-colors cursor-pointer"
                onClick={(e) => onBookClick(book, e)}
              >
                <div className="shrink-0 text-green-600 relative w-12 h-16 overflow-hidden rounded">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="mb-1.5 text-base font-medium text-white">
                    {language === "en" ? 
                      (book.title === "Вдъхновения" ? "Inspirations" : 
                      book.title === "Душевни Пътеки" ? "Soul Paths" : 
                      book.title === "Моменти на Яснота" ? "Moments of Clarity" : book.title) 
                      : book.title
                    }
                  </div>
                  <div className="text-sm font-normal text-white/80">
                    {language === "en" ? 
                      (book.description === "Сборник от поетични творби, които ще докоснат душата ви" ? 
                      "A collection of poetic works that will touch your soul" : 
                      book.description === "Поетично пътешествие през емоциите и преживяванията" ? 
                      "A poetic journey through emotions and experiences" : 
                      book.description === "Стихове, които улавят мигове на прозрение и яснота" ? 
                      "Verses that capture moments of insight and clarity" : book.description) 
                      : book.description
                    }
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs bg-green-500 text-white">
                      {language === "en" ? book.category : 
                        book.category === "Fiction" ? "Художествена литература" :
                        book.category === "Non-Fiction" ? "Нехудожествена литература" :
                        book.category === "Poetry" ? "Поезия" : book.category
                      }
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-white/20 px-8 py-7">
              <Button className="w-full bg-white hover:bg-gray-100 text-green-700 rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 flex items-center justify-center hover:translate-y-[-2px]" asChild>
                <Link href="/shop">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag mr-2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  {language === "en" ? "Explore All Books" : "Разгледай Всички Книги"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu > Services */}
      {isMenuOpen === "services" && (
        <div 
          style={mobileMenuStyle}
          className="fixed inset-x-0 bottom-0 flex flex-col overflow-y-auto max-h-[80vh] !bg-purple-600 dark:!bg-purple-800 backdrop-blur-md md:hidden animate-in slide-in-from-right"
        >
          <div className="flex items-center justify-between px-8 py-3.5 border-b border-white/20">
            <div className="text-xs tracking-widest text-white uppercase font-semibold">
              {language === "en" ? "Our Services" : "Нашите Услуги"}
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setIsMenuOpen(true)} 
              className="flex items-center bg-transparent hover:bg-purple-700 text-white border-none shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <ChevronLeft className="mr-2 size-4" />
              {language === "en" ? "Back" : "Назад"}
            </Button>
          </div>
          <div>
            {services.map((service) => (
              <div
                key={service.id}
                className="group flex w-full items-start gap-x-4 border-b border-white/20 px-8 py-6 text-left hover:bg-purple-700 transition-colors cursor-pointer"
                onClick={(e) => onServiceClick(service, e)}
              >
                <div className="shrink-0 relative w-16 h-12 overflow-hidden rounded">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div>
                  <div className="mb-1.5 text-base font-medium text-white flex items-center justify-between">
                    <span>
                      {language === "en" ? 
                        (service.title === "Личен Коучинг" ? "Personal Coaching" : 
                        service.title === "Терапевтични Сесии" ? "Therapy Sessions" : 
                        service.title === "Групови Уъркшопи" ? "Group Workshops" : service.title) 
                        : service.title
                      }
                    </span>
                    <Badge className="ml-2 bg-purple-500 text-white text-xs">
                      {service.price} лв
                    </Badge>
                  </div>
                  <div className="text-sm font-normal text-white/80">
                    {language === "en" ? 
                      (service.description === "Индивидуални сесии за личностно развитие и постигане на цели" ? 
                      "Individual sessions for personal development and goal achievement" : 
                      service.description === "Професионална подкрепа за емоционално благополучие" ? 
                      "Professional support for emotional well-being" : 
                      service.description === "Интерактивни семинари за развитие на умения и самопознание" ? 
                      "Interactive seminars for skill development and self-knowledge" : service.description) 
                      : service.description
                    }
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs text-white border-white/40">
                      {service.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-white/20 px-8 py-7">
              <Button className="w-full bg-white hover:bg-gray-100 text-purple-700 rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 flex items-center justify-center hover:translate-y-[-2px]" asChild>
                <Link href="/services">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag mr-2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  {language === "en" ? "View All Services" : "Разгледай Всички Услуги"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 