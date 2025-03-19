"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { ServicePreviewDialog } from "@/components/ui/service-preview-dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Import our components
import { Logo } from "./header/Logo";
import { LanguageSwitcher } from "./header/LanguageSwitcher";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { SocialLinks } from "./header/SocialLinks";
import { ShopButton } from "./header/ShopButton";

// Import types from local types file
import { BookType, ServiceType } from "./header/types";

// Books data
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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // Service preview states
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isServicePreviewOpen, setIsServicePreviewOpen] = useState(false);
  
  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array is correct here
  
  // Update header height for mobile menu positioning - only when component mounts
  useEffect(() => {
    if (!headerRef.current) return;
    
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    
    // Initial measurement
    updateHeight();
    
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    
    resizeObserver.observe(headerRef.current);
    return () => resizeObserver.disconnect();
  }, []); // Empty dependency array is correct here
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]); // Only when pathname changes
  
  // Handle book click to navigate to book page
  const handleBookClick = useCallback((book: BookType, e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to the book's page instead of opening a preview dialog
    router.push(book.href);
  }, [router]);
  
  // Handle service click for preview
  const handleServiceClick = useCallback((service: ServiceType, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedService(service);
    setIsServicePreviewOpen(true);
  }, []);
  
  return (
    <header 
      ref={headerRef}
      className={cn(
        "sticky inset-x-0 top-0 z-20 w-full transition-colors duration-300 border-b shadow-sm",
        isScrolled 
          ? "border-green-700/30 bg-green-600/95 backdrop-blur-sm dark:bg-green-800/95" 
          : "border-transparent bg-green-600 dark:bg-green-800"
      )}
    >
      <div className="container mx-auto flex justify-center">
        <div className={cn(
          "flex w-full items-center justify-between max-w-6xl transition-all duration-200",
          isScrolled ? "py-2 md:py-2" : "py-3 md:py-4"
        )}>
          {/* Left section: Logo and theme/language toggles */}
          <div className="flex-1 flex items-center gap-3">
            <Logo isScrolled={isScrolled} />
            <div className="flex items-center gap-1 ml-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Middle section: Desktop Navigation */}
          <DesktopNavigation 
            books={books} 
            services={services} 
            onBookClick={handleBookClick}
            onServiceClick={handleServiceClick}
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
            onServiceClick={handleServiceClick}
          />
        </div>
      </div>
      
      {/* Service Preview Dialog */}
      {selectedService && (
        <ServicePreviewDialog 
          service={selectedService}
          open={isServicePreviewOpen}
          onOpenChange={setIsServicePreviewOpen}
        />
      )}
    </header>
  );
} 