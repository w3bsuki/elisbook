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

  // Common navigation trigger styles
  const navTriggerStyles = "text-lg font-medium transition-colors !text-white !bg-transparent hover:!text-gray-100 hover:!bg-green-700";
  
  // Function to translate based on language
  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;
  
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
              navTriggerStyles,
              pathname.startsWith("/shop") && "!text-white font-semibold !bg-green-700"
            )}
          >
            {navTranslations.books}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 !bg-white dark:!bg-gray-900 border-t-4 border-t-green-600"
          >
            <div className="w-[750px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  {translate("Нашите Книги", "Our Books")}
                </h3>
                <Badge variant="outline" className="px-3 py-1 text-green-600 border-green-200 dark:border-green-800">
                  {translate("Поезия и Вдъхновение", "Poetry & Inspiration")}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {books.map((book) => (
                  <div
                    key={book.href}
                    onClick={(e) => onBookClick(book, e)}
                    className="group relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
                  >
                    <div className="overflow-hidden h-[240px] relative">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-green-600 text-white font-medium">
                          {book.price.toFixed(2)} лв
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col p-4 flex-1">
                      <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {book.title === "Вдъхновения" ? translate("Вдъхновения", "Inspirations") : 
                         book.title === "Душевни Пътеки" ? translate("Душевни Пътеки", "Soul Paths") : 
                         book.title === "Моменти на Яснота" ? translate("Моменти на Яснота", "Moments of Clarity") : 
                         book.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {book.description === "Сборник от поетични творби, които ще докоснат душата ви" ? 
                          translate("Сборник от поетични творби, които ще докоснат душата ви", "A collection of poetic works that will touch your soul") : 
                         book.description === "Поетично пътешествие през емоциите и преживяванията" ? 
                          translate("Поетично пътешествие през емоциите и преживяванията", "A poetic journey through emotions and experiences") : 
                         book.description === "Стихове, които улавят мигове на прозрение и яснота" ? 
                          translate("Стихове, които улавят мигове на прозрение и яснота", "Verses that capture moments of insight and clarity") : 
                         book.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
                          {book.category === "Fiction" ? translate("Художествена литература", "Fiction") :
                           book.category === "Non-Fiction" ? translate("Нехудожествена литература", "Non-Fiction") :
                           book.category === "Poetry" ? translate("Поезия", "Poetry") : 
                           book.category}
                        </Badge>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-green-600 hover:text-green-700 hover:bg-transparent">
                          <span className="text-xs underline underline-offset-2">
                            {translate("Детайли", "Details")}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center border-t border-green-100 dark:border-green-800/30 pt-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 group hover:translate-y-[-2px]" asChild>
                  <Link href="/shop" className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    {translate("Разгледай Всички Книги", "Explore All Books")}
                  </Link>
                </Button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              navTriggerStyles,
              pathname.startsWith("/services") && "!text-white font-semibold !bg-green-700"
            )}
          >
            {navTranslations.services}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 !bg-white dark:!bg-gray-900 border-t-4 border-t-green-600"
          >
            <div className="w-[750px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  {translate("Нашите Услуги", "Our Services")}
                </h3>
                <Badge variant="outline" className="px-3 py-1 text-green-600 border-green-200 dark:border-green-800">
                  {translate("Личностно Развитие", "Personal Development")}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={(e) => onServiceClick(service, e)}
                    className="group relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
                  >
                    <div className="overflow-hidden h-[180px] relative">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <h4 className="text-xl font-bold text-white drop-shadow-sm mb-1">
                          {service.title === "Личен Коучинг" ? translate("Личен Коучинг", "Personal Coaching") : 
                           service.title === "Терапевтични Сесии" ? translate("Терапевтични Сесии", "Therapy Sessions") : 
                           service.title === "Групови Уъркшопи" ? translate("Групови Уъркшопи", "Group Workshops") : 
                           service.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-600 text-white">
                            {service.price} лв
                          </Badge>
                          <Badge variant="outline" className="text-white border-white/60">
                            {service.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col p-4 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                        {service.description === "Индивидуални сесии за личностно развитие и постигане на цели" ? 
                          translate("Индивидуални сесии за личностно развитие и постигане на цели", "Individual sessions for personal development and goal achievement") : 
                         service.description === "Професионална подкрепа за емоционално благополучие" ? 
                          translate("Професионална подкрепа за емоционално благополучие", "Professional support for emotional well-being") : 
                         service.description === "Интерактивни семинари за развитие на умения и самопознание" ? 
                          translate("Интерактивни семинари за развитие на умения и самопознание", "Interactive seminars for skill development and self-knowledge") : 
                         service.description}
                      </p>
                      <Button variant="ghost" size="sm" className="mt-auto self-end p-0 h-auto text-green-600 hover:text-green-700 hover:bg-transparent">
                        <span className="text-xs underline underline-offset-2">
                          {translate("Научи Повече", "Learn More")}
                        </span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center border-t border-green-100 dark:border-green-800/30 pt-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 group hover:translate-y-[-2px]" asChild>
                  <Link href="/services" className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    {translate("Разгледай Всички Услуги", "View All Services")}
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