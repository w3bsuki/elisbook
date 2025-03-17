"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Import our new components
import { Logo } from "./header/Logo";
import { LanguageSwitcher } from "./header/LanguageSwitcher";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { SocialLinks } from "./header/SocialLinks";
import { ShopButton } from "./header/ShopButton";

// Import types from local types file
import { BookType, ServiceType } from "./header/types";

// Updated books to use the same images as bestsellers
const books: BookType[] = [
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
const services: ServiceType[] = [
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

export default function Header() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | string>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Book preview state
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
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
  
  // Handle book click for preview
  const handleBookClick = useCallback((book: BookType, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedBook(book);
    setIsPreviewOpen(true);
  }, []);
  
  return (
    <header 
      ref={headerRef}
      className="sticky inset-x-0 top-0 z-20 w-full transition-none border-b shadow-sm !bg-green-600 dark:!bg-green-800 [background-color:rgb(22_163_74)!important]"
      style={{ backgroundColor: 'rgb(22 163 74) !important' }}
    >
      <div className="container mx-auto flex justify-center bg-green-600 dark:bg-green-800">
        <div className={cn(
          "flex w-full items-center justify-between max-w-6xl transition-all duration-300 bg-green-600 dark:bg-green-800",
          isScrolled ? "py-2 md:py-3" : "py-3 md:py-4"
        )}>
          {/* Left section: Logo and theme/language toggles */}
          <div className="flex-1 flex items-center gap-3">
            <Logo isScrolled={isScrolled} />
            <div className="flex items-center gap-2 ml-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Middle section: Desktop Navigation */}
          <DesktopNavigation 
            books={books} 
            services={services} 
            onBookClick={handleBookClick} 
          />
          
          {/* Right section: Social links and shop button */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <SocialLinks />
            <ShopButton />
          </div>
          
          {/* Mobile Navigation */}
          <MobileNavigation 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            headerHeight={headerHeight}
            books={books}
            services={services}
            onBookClick={handleBookClick}
          />
        </div>
      </div>
      
      {/* Book Preview Dialog */}
      {selectedBook && (
        <BookPreviewDialog 
          book={selectedBook}
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
    </header>
  );
} 