"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { NavLink } from "./NavLink";

// Import types from local types file
import { NavigationProps } from "./types";

export function DesktopNavigation({ books, services, onBookClick, onServiceClick }: NavigationProps) {
  const { language } = useLanguage();
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
  
  return (
    <NavigationMenu className="flex-1 flex justify-center max-w-full">
      <NavigationMenuList className="font-playfair hidden md:flex">
        <NavigationMenuItem>
          <NavLink href="/about" className="text-white hover:text-gray-100 hover:bg-green-800">
            {navTranslations.about}
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              "text-lg font-medium transition-colors !text-white !bg-transparent hover:!text-gray-100 hover:!bg-green-700",
              pathname.startsWith("/shop") && "!text-white font-semibold !bg-green-700"
            )}
          >
            {navTranslations.books}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 !bg-white dark:!bg-gray-900 border-t-4 border-t-green-600"
          >
            <div className="w-[600px] p-4">
              <div className="grid grid-cols-3 gap-4">
                {books.map((book) => (
                  <div
                    key={book.href}
                    onClick={(e) => onBookClick(book, e)}
                    className="group block space-y-3 rounded-lg p-3 hover:bg-green-50 dark:hover:bg-green-900/20 h-full transition-colors cursor-pointer"
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
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
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
              <div className="mt-6 flex justify-center border-t border-green-100 dark:border-green-800/30 pt-6">
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
              "text-lg font-medium transition-colors !text-white !bg-transparent hover:!text-gray-100 hover:!bg-purple-700",
              pathname.startsWith("/services") && "!text-white font-semibold !bg-purple-700"
            )}
          >
            {navTranslations.services}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 !bg-white dark:!bg-gray-900 border-t-4 border-t-purple-600"
          >
            <div className="w-[600px] p-4">
              <div className="grid grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={(e) => onServiceClick(service, e)}
                    className="group block space-y-3 rounded-lg p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 h-full transition-colors cursor-pointer"
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
                        <Badge className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700 text-white">
                          {service.price} лв
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="font-medium leading-tight text-base text-gray-900 dark:text-gray-100 group-hover:text-purple-600 transition-colors">
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
                        <Badge variant="outline" className="text-xs border-purple-200 text-purple-800 dark:border-purple-800 dark:text-purple-300">
                          {service.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center border-t border-purple-100 dark:border-purple-800/30 pt-6">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 group hover:translate-y-[-2px]" asChild>
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
            {navTranslations.blog}
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink href="/contact" className="text-white hover:text-gray-100 hover:bg-green-800">
            {navTranslations.contact}
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
} 