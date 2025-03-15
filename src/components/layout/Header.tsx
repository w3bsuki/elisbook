"use client";

import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Facebook,
  Instagram,
  Globe,
  ShoppingBag,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";

// Updated books to use the same images as bestsellers
const books = [
  {
    id: "inspirations",
    title: "Вдъхновения",
    description: "Сборник от поетични творби, които ще докоснат душата ви",
    image: "/images/books/vdahnovenia-kniga-1.png",
    category: "Poetry",
    href: "/shop/inspirations",
    price: 19.99,
  },
  {
    id: "soul-paths",
    title: "Душевни Пътеки",
    description: "Поетично пътешествие през емоциите и преживяванията",
    image: "/images/books/vdahnovenia-kniga-1.png",
    category: "Poetry",
    href: "/shop/soul-paths",
    price: 22.99,
  },
  {
    id: "clarity",
    title: "Моменти на Яснота",
    description: "Стихове, които улавят мигове на прозрение и яснота",
    image: "/images/books/vdahnovenia-kniga-1.png",
    category: "Poetry",
    href: "/shop/clarity",
    price: 18.99,
  },
];

// Custom navigation link component without underline animation
const NavLink = ({ 
  href, 
  children, 
  className 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || 
                  (href !== '/' && pathname.startsWith(href));
  
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink 
        className={cn(
          navigationMenuTriggerStyle(), 
          "text-lg font-medium transition-colors",
          isActive && "text-green-600 font-semibold",
          className
        )}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
};

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | string>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Book preview state
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Update header height for mobile menu positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    // Also update when scroll state changes
    if (isScrolled !== undefined) {
      updateHeaderHeight();
    }
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isScrolled]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // Helper function to safely get translation string
  const getTranslation = (key: string): string => {
    const translation = t(key);
    return typeof translation === 'string' ? translation : String(translation || '');
  };
  
  const mobileMenuStyle = {
    top: `${headerHeight}px`,
    height: `calc(100vh - ${headerHeight}px)`
  };
  
  // Handle book click for preview
  const handleBookClick = (book: typeof books[0], e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedBook(book);
    setIsPreviewOpen(true);
  };
  
  return (
    <header 
      ref={headerRef}
      className={cn(
        "sticky inset-x-0 top-0 z-20 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm" 
          : "bg-background border-b"
      )}
    >
      <div className="container mx-auto flex justify-center">
        <div className={cn(
          "flex w-full items-center justify-between max-w-6xl transition-all duration-300",
          isScrolled ? "py-2 md:py-3" : "py-3 md:py-4"
        )}>
          <div className="flex-1 flex items-center gap-3">
            <Link href="/" className="transition-transform hover:scale-105">
              <span className={cn(
                "font-bold tracking-wide text-green-600 font-playfair transition-all duration-300",
                isScrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
              )}>ELIS</span>
            </Link>
            <div className="flex items-center gap-2 ml-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-none hover:bg-accent">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                  <DropdownMenuItem onClick={() => setLanguage("en")} className={cn(language === "en" && "bg-accent")}>
                    <span className="mr-2">🇬🇧</span> English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("bg")} className={cn(language === "bg" && "bg-accent")}>
                    <span className="mr-2">🇧🇬</span> Български
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <NavigationMenu className="flex-1 flex justify-center max-w-full">
            <NavigationMenuList className="font-playfair hidden md:flex">
              <NavigationMenuItem>
                <NavLink href="/about">
                  {getTranslation("nav.about")}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "text-lg font-medium transition-colors",
                    pathname.startsWith("/shop") && "text-green-600 font-semibold"
                  )}
                >
                  {getTranslation("nav.books")}
                </NavigationMenuTrigger>
                <NavigationMenuContent 
                  className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                >
                  <div className="w-[600px] p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {books.map((book) => (
                        <div
                          key={book.href}
                          onClick={(e) => handleBookClick(book, e)}
                          className="group block space-y-3 rounded-lg p-3 hover:bg-accent h-full transition-colors cursor-pointer"
                        >
                          <div className="overflow-hidden rounded-lg">
                            <div className="relative aspect-[3/5] w-full bg-muted">
                              <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 h-[120px]">
                            <div className="font-medium leading-tight text-base whitespace-pre-line min-h-[40px] group-hover:text-green-600 transition-colors">
                              {language === "en" ? 
                                (book.title === "Вдъхновения" ? "Inspirations" : 
                                book.title === "Душевни Пътеки" ? "Soul Paths" : 
                                book.title === "Моменти на Яснота" ? "Moments of Clarity" : book.title) 
                                : book.title
                              }
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
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
                            <div className="mt-auto">
                              <Badge variant="secondary" className="text-xs">
                                {language === "en" ? book.category : 
                                  book.category === "Fiction" ? getTranslation("categories.fiction") :
                                  book.category === "Non-Fiction" ? getTranslation("categories.nonFiction") :
                                  book.category === "Poetry" ? getTranslation("categories.poetry") : book.category
                                }
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-center border-t pt-6">
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 group hover:translate-y-[-2px]" asChild>
                        <Link href="/shop" className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          {language === "en" ? "Explore All Books" : "Разгледай Всички Книги"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink href="/blog">
                  {getTranslation("nav.blog")}
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-200 flex items-center justify-center h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-700 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-200 flex items-center justify-center h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-700 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white text-base px-5 py-1.5 h-auto rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 font-medium group hover:translate-y-[-2px]" 
              asChild
            >
              <Link href="/shop" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                {getTranslation("nav.shop")}
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-4 md:hidden flex-1 justify-end">
            <Button
              variant="outline"
              size="icon"
              aria-label="Main Menu"
              className="border-none"
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
        </div>

        {/* Mobile Menu (Root) */}
        {isMenuOpen && (
          <div 
            style={mobileMenuStyle}
            className="fixed inset-x-0 bottom-0 flex flex-col overflow-scroll border-t border-border bg-background/95 backdrop-blur-md md:hidden animate-in slide-in-from-right"
          >
            <div className="font-playfair">
              <Link 
                href="/about" 
                className={cn(
                  "flex w-full items-center border-b border-border px-8 py-6 text-left transition-colors",
                  pathname === "/about" && "bg-accent"
                )}
              >
                <span className={cn(
                  "flex-1 text-lg",
                  pathname === "/about" && "text-green-600 font-medium"
                )}>
                  {getTranslation("nav.about")}
                </span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center border-b border-border px-8 py-6 text-left transition-colors hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex-1 text-lg">{getTranslation("nav.books")}</span>
                <ChevronRight className="size-4" />
              </button>
              <Link 
                href="/blog" 
                className={cn(
                  "flex w-full items-center border-b border-border px-8 py-6 text-left transition-colors",
                  pathname === "/blog" && "bg-accent"
                )}
              >
                <span className={cn(
                  "flex-1 text-lg",
                  pathname === "/blog" && "text-green-600 font-medium"
                )}>
                  {getTranslation("nav.blog")}
                </span>
              </Link>
              <Link 
                href="/shop" 
                className="flex w-full items-center border-b border-border px-8 py-6 text-left bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:translate-y-[-2px] border-2 border-black dark:border-gray-700"
              >
                <span className="flex-1 text-lg font-medium flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {getTranslation("nav.shop")}
                </span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center border-b border-border px-8 py-6 text-left transition-colors hover:bg-accent"
                onClick={() => setLanguage(language === "en" ? "bg" : "en")}
              >
                <span className="flex-1 text-lg flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {language === "en" ? "Български" : "English"}
                </span>
              </button>
              <div className="flex items-center justify-center gap-4 py-6 border-b border-border">
                <Link 
                  href="https://facebook.com" 
                  target="_blank" 
                  className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-200 flex items-center justify-center h-10 w-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-700 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-200 flex items-center justify-center h-10 w-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-700 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile Menu > Books */}
        {isMenuOpen === "books" && (
          <div 
            style={mobileMenuStyle}
            className="fixed inset-x-0 bottom-0 flex flex-col overflow-scroll bg-background/95 backdrop-blur-md md:hidden animate-in slide-in-from-right"
          >
            <div className="flex items-center justify-between px-8 py-3.5 border-b border-border">
              <div className="text-xs tracking-widest text-muted-foreground uppercase">
                {language === "en" ? "Book Categories" : "Категории Книги"}
              </div>
              <Button variant="outline" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                <ChevronLeft className="mr-2 size-4" />
                {language === "en" ? "Back" : "Назад"}
              </Button>
            </div>
            <div>
              {books.map((book) => (
                <div
                  key={book.id}
                  className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-6 text-left hover:bg-accent transition-colors cursor-pointer"
                  onClick={(e) => handleBookClick(book, e)}
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
                    <div className="mb-1.5 text-base font-medium group-hover:text-green-600 transition-colors">
                      {language === "en" ? 
                        (book.title === "Вдъхновения" ? "Inspirations" : 
                        book.title === "Душевни Пътеки" ? "Soul Paths" : 
                        book.title === "Моменти на Яснота" ? "Moments of Clarity" : book.title) 
                        : book.title
                      }
                    </div>
                    <div className="text-sm font-normal text-muted-foreground">
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
                  </div>
                </div>
              ))}
              <div className="border-t border-border px-8 py-7">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 flex items-center justify-center hover:translate-y-[-2px]" asChild>
                  <Link href="/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {language === "en" ? "Explore All Books" : "Разгледай Всички Книги"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Book Preview Dialog */}
      {selectedBook && (
        <BookPreviewDialog 
          book={{
            ...selectedBook,
            image: selectedBook.image
          }}
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
    </header>
  );
} 