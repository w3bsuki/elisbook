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

// Services data
const services = [
  {
    id: "coaching",
    title: "Личен Коучинг",
    description: "Индивидуални сесии за личностно развитие и постигане на цели",
    image: "/images/services/coaching.jpg",
    href: "/services/coaching",
    price: 79.99,
    duration: "60 мин",
  },
  {
    id: "therapy",
    title: "Терапевтични Сесии",
    description: "Професионална подкрепа за емоционално благополучие",
    image: "/images/services/therapy.jpg",
    href: "/services/therapy",
    price: 89.99,
    duration: "90 мин",
  },
  {
    id: "workshop",
    title: "Групови Уъркшопи",
    description: "Интерактивни семинари за развитие на умения и самопознание",
    image: "/images/services/workshop.jpg",
    href: "/services/workshop",
    price: 49.99,
    duration: "120 мин",
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
          "text-lg font-medium transition-colors text-white !bg-transparent",
          isActive ? "font-semibold !bg-green-700" : "hover:!bg-green-700",
          className
        )}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
};

export default function Header() {
  const { language, setLanguage, translations } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | string>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Book preview state
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Handle scroll effect with debounce for better performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
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
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bg' : 'en');
  };
  
  // Get translations for navigation items
  const navTranslations = translations?.[language]?.nav || {};
  
  return (
    <header 
      ref={headerRef}
      style={{ backgroundColor: '#16a34a !important' }} 
      className="sticky inset-x-0 top-0 z-20 w-full transition-all duration-300 border-b shadow-sm bg-green-600"
    >
      <div className="container mx-auto flex justify-center">
        <div className={cn(
          "flex w-full items-center justify-between max-w-6xl transition-all duration-300",
          isScrolled ? "py-2 md:py-3" : "py-3 md:py-4"
        )}>
          <div className="flex-1 flex items-center gap-3">
            <Link href="/" className="transition-transform hover:scale-105">
              <span className={cn(
                "font-bold tracking-wide text-white font-playfair transition-all duration-300",
                isScrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
              )}>ELIS</span>
            </Link>
            <div className="flex items-center gap-2 ml-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-transparent hover:bg-green-700 text-white border-none shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                  <DropdownMenuItem onClick={toggleLanguage} className={cn(language === "en" && "bg-accent")}>
                    <span className="mr-2">🇬🇧</span> English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleLanguage} className={cn(language === "bg" && "bg-accent")}>
                    <span className="mr-2">🇧🇬</span> Български
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <NavigationMenu className="flex-1 flex justify-center max-w-full">
            <NavigationMenuList className="font-playfair hidden md:flex">
              <NavigationMenuItem>
                <NavLink href="/about" className="text-white hover:text-gray-100 hover:bg-green-800">
                  {navTranslations.about || 'About'}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "text-lg font-medium transition-colors !text-white !bg-transparent hover:!text-gray-100 hover:!bg-green-700",
                    pathname.startsWith("/shop") && "!text-white font-semibold !bg-green-700"
                  )}
                >
                  {navTranslations.books || 'Books'}
                </NavigationMenuTrigger>
                <NavigationMenuContent 
                  className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 !bg-white dark:!bg-gray-900"
                >
                  <div className="w-[600px] p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {books.map((book) => (
                        <div
                          key={book.href}
                          onClick={(e) => handleBookClick(book, e)}
                          className="group block space-y-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 h-full transition-colors cursor-pointer"
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
                            <div className="font-medium leading-tight text-base whitespace-pre-line min-h-[40px] text-gray-900 dark:text-gray-100 group-hover:text-green-600 transition-colors">
                              {language === "en" ? 
                                (book.title === "Вдъхновения" ? "Inspirations" : 
                                book.title === "Душевни Пътеки" ? "Soul Paths" : 
                                book.title === "Моменти на Яснота" ? "Moments of Clarity" : book.title) 
                                : book.title
                              }
                            </div>
                            <div className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
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
                                  book.category === "Fiction" ? "Художествена литература" :
                                  book.category === "Non-Fiction" ? "Нехудожествена литература" :
                                  book.category === "Poetry" ? "Поезия" : book.category
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
                <NavigationMenuTrigger 
                  className={cn(
                    "text-lg font-medium transition-colors !text-white !bg-transparent hover:!text-gray-100 hover:!bg-green-700",
                    pathname.startsWith("/services") && "!text-white font-semibold !bg-green-700"
                  )}
                >
                  {navTranslations.services || 'Services'}
                </NavigationMenuTrigger>
                <NavigationMenuContent 
                  className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 !bg-white dark:!bg-gray-900"
                >
                  <div className="w-[600px] p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={service.href}
                          className="group block space-y-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 h-full transition-colors"
                        >
                          <div className="overflow-hidden rounded-lg">
                            <div className="relative aspect-[16/9] w-full bg-muted">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white">
                                {service.price} лв
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="font-medium leading-tight text-base text-gray-900 dark:text-gray-100 group-hover:text-green-600 transition-colors">
                              {language === "en" ? 
                                (service.title === "Личен Коучинг" ? "Personal Coaching" : 
                                service.title === "Терапевтични Сесии" ? "Therapy Sessions" : 
                                service.title === "Групови Уъркшопи" ? "Group Workshops" : service.title) 
                                : service.title
                              }
                            </div>
                            <div className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
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
                            <div className="mt-auto">
                              <Badge variant="outline" className="text-xs">
                                {service.duration}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-center border-t pt-6">
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 group hover:translate-y-[-2px]" asChild>
                        <Link href="/services" className="flex items-center">
                          <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          {language === "en" ? "View All Services" : "Разгледай Всички Услуги"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink href="/blog" className="text-white hover:text-gray-100 hover:bg-green-800">
                  {navTranslations.blog || 'Blog'}
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink href="/contact" className="text-white hover:text-gray-100 hover:bg-green-800">
                  {navTranslations.contact || 'Contact'}
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-white hover:text-gray-100 transition-all duration-200 flex items-center justify-center h-9 w-9 bg-transparent hover:bg-green-700 rounded-full border border-white/20 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-white hover:text-gray-100 transition-all duration-200 flex items-center justify-center h-9 w-9 bg-transparent hover:bg-green-700 rounded-full border border-white/20 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
            <Button 
              className="bg-white hover:bg-gray-100 text-green-700 text-base px-5 py-1.5 h-auto rounded-md border-2 border-green-900 shadow-[3px_3px_0px_0px_rgba(20,83,45,1)] hover:shadow-[5px_5px_0px_0px_rgba(20,83,45,1)] transition-all duration-200 font-medium group hover:translate-y-[-2px]" 
              asChild
            >
              <Link href="/shop" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                {language === "en" ? "Shop" : "Магазин"}
              </Link>
            </Button>
          </div>
          
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
        </div>

        {/* Mobile Menu (Root) */}
        {isMenuOpen && (
          <div 
            style={{...mobileMenuStyle, backgroundColor: '#16a34a'}}
            className="fixed inset-x-0 bottom-0 flex flex-col overflow-y-auto max-h-[80vh] border-t border-white/20 bg-green-600/95 backdrop-blur-md md:hidden animate-in slide-in-from-right"
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
                  {navTranslations.about || 'About'}
                </span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors hover:bg-green-700 text-white"
                onClick={() => setIsMenuOpen("books")}
              >
                <span className="flex-1 text-lg">{navTranslations.books || 'Books'}</span>
                <ChevronRight className="size-4" />
              </button>
              <button
                type="button"
                className="flex w-full items-center border-b border-white/20 px-8 py-4 text-left transition-colors hover:bg-green-700 text-white"
                onClick={() => setIsMenuOpen("services")}
              >
                <span className="flex-1 text-lg">{navTranslations.services || 'Services'}</span>
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
                  {navTranslations.blog || 'Blog'}
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
                  {navTranslations.contact || 'Contact'}
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
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  className="text-white hover:text-gray-100 transition-all duration-200 flex items-center justify-center h-10 w-10 bg-transparent hover:bg-green-700 rounded-full border border-white/20 hover:scale-110"
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
            style={{...mobileMenuStyle, backgroundColor: '#16a34a'}}
            className="fixed inset-x-0 bottom-0 flex flex-col overflow-y-auto max-h-[80vh] bg-green-600/95 backdrop-blur-md md:hidden animate-in slide-in-from-right"
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
                  </div>
                </div>
              ))}
              <div className="border-t border-white/20 px-8 py-7">
                <Button className="w-full bg-white hover:bg-gray-100 text-green-700 rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 flex items-center justify-center hover:translate-y-[-2px]" asChild>
                  <Link href="/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
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
            style={{...mobileMenuStyle, backgroundColor: '#16a34a'}}
            className="fixed inset-x-0 bottom-0 flex flex-col overflow-y-auto max-h-[80vh] bg-green-600/95 backdrop-blur-md md:hidden animate-in slide-in-from-right"
          >
            <div className="flex items-center justify-between px-8 py-3.5 border-b border-white/20">
              <div className="text-xs tracking-widest text-white uppercase font-semibold">
                {language === "en" ? "Our Services" : "Нашите Услуги"}
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
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group flex w-full items-start gap-x-4 border-b border-white/20 px-8 py-6 text-left hover:bg-green-700 transition-colors"
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
                      <Badge className="ml-2 bg-green-700 text-white text-xs">
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
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs text-white border-white/40">
                        {service.duration}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="border-t border-white/20 px-8 py-7">
                <Button className="w-full bg-white hover:bg-gray-100 text-green-700 rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 flex items-center justify-center hover:translate-y-[-2px]" asChild>
                  <Link href="/services">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {language === "en" ? "View All Services" : "Разгледай Всички Услуги"}
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