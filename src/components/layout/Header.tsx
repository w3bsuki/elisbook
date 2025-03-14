"use client";

import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Menu,
  X,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
import { NavbarThemeToggle } from "@/components/ui/navbar-theme-toggle";

const resources = [
  {
    title: "Fiction",
    description: "Explore captivating stories that transport you to new worlds.",
    href: "/shop?category=fiction",
    icon: CircleCheckBig,
  },
  {
    title: "Non-Fiction",
    description: "Discover insightful works based on real events and research.",
    href: "/shop?category=non-fiction",
    icon: CircleCheckBig,
  },
  {
    title: "Poetry",
    description: "Experience the beauty of language through poetic expression.",
    href: "/shop?category=poetry",
    icon: CircleCheckBig,
  },
];

const books = [
  {
    title: "The Art of Mindfulness",
    description: "A journey into meditation and peaceful living",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    category: "Non-Fiction",
    href: "/shop/mindfulness",
  },
  {
    title: "Echoes of\nTomorrow",
    description: "A sci-fi adventure through time and space",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=687&auto=format&fit=crop",
    category: "Fiction",
    href: "/shop/echoes",
  },
  {
    title: "Whispers in the Wind",
    description: "A collection of contemporary poems",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
    category: "Poetry",
    href: "/shop/whispers",
  },
];

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<"books" | "about" | "contact" | null>(null);
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <header className="sticky inset-x-0 top-0 z-20 bg-background border-b">
      <div className="container mx-auto flex justify-center">
        <div className="flex w-full items-center justify-between py-4 max-w-6xl">
          <div className="flex-1 flex items-center gap-3">
            <Link href="/">
              <span className="text-3xl font-bold tracking-wide text-green-600 font-playfair">ELIS</span>
            </Link>
            <NavbarThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("bg")}>
                  Български
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <NavigationMenu className="flex-1 flex justify-center">
            <NavigationMenuList className="font-playfair">
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-lg font-medium")}>
                    {ensureString(t("nav.about"))}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg font-medium">
                  {ensureString(t("nav.books"))}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {books.map((book) => (
                        <Link
                          key={book.href}
                          href={book.href}
                          className="group block space-y-3 rounded-lg p-3 hover:bg-accent h-full"
                        >
                          <div className="overflow-hidden rounded-lg">
                            <div className="relative aspect-[4/5] w-full bg-muted">
                              <Image
                                src={book.image}
                                alt={book.title.replace('\n', ' ')}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 h-[120px]">
                            <div className="font-medium leading-tight text-base whitespace-pre-line min-h-[40px]">
                              {language === "en" ? book.title : 
                                book.title === "The Art of Mindfulness" ? "Изкуството на Осъзнатостта" :
                                book.title === "Echoes of\nTomorrow" ? "Ехо от\nУтрешния Ден" :
                                book.title === "Whispers in the Wind" ? "Шепот в Вятъра" : book.title
                              }
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                              {language === "en" ? book.description : 
                                ensureString(t(`bookDescriptions.${book.href.split('/').pop()}`))
                              }
                            </div>
                            <div className="mt-auto">
                              <Badge variant="secondary" className="text-xs">
                                {language === "en" ? book.category : 
                                  ensureString(book.category === "Fiction" ? t("categories.fiction") :
                                  book.category === "Non-Fiction" ? t("categories.nonFiction") :
                                  book.category === "Poetry" ? t("categories.poetry") : book.category)
                                }
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-lg font-medium")}>
                    {ensureString(t("nav.blog"))}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white text-base px-5 py-1.5 h-auto border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 font-medium rounded-md" asChild>
              <Link href="/shop">
                {ensureString(t("nav.shop"))}
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-4 md:hidden flex-1 justify-end">
            <Button
              variant="outline"
              size="icon"
              aria-label="Main Menu"
              onClick={() => {
                if (open) {
                  setOpen(false);
                  setSubmenu(null);
                } else {
                  setOpen(true);
                }
              }}
            >
              {!open && <Menu className="size-4" />}
              {open && <X className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Root) */}
        {open && submenu === null && (
          <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background md:hidden">
            <div className="font-playfair">
              <Link href="/about" className="flex w-full items-center border-b border-border px-8 py-7 text-left">
                <span className="flex-1 text-lg">{ensureString(t("nav.about"))}</span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                onClick={() => setSubmenu("books")}
              >
                <span className="flex-1 text-lg">{ensureString(t("nav.books"))}</span>
                <span className="shrink-0">
                  <ChevronRight className="size-4" />
                </span>
              </button>
              <Link href="/blog" className="flex w-full items-center border-b border-border px-8 py-7 text-left">
                <span className="flex-1 text-lg">{ensureString(t("nav.blog"))}</span>
              </Link>
              <Link href="/shop" className="flex w-full items-center border-b border-border px-8 py-7 text-left bg-green-500 text-white border-2 border-black shadow-md">
                <span className="flex-1 text-lg font-medium">{ensureString(t("nav.shop"))}</span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                onClick={() => setLanguage(language === "en" ? "bg" : "en")}
              >
                <span className="flex-1 text-lg flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {ensureString(t("nav.language"))}
                </span>
              </button>
            </div>
          </div>
        )}
        
        {/* Mobile Menu > Books */}
        {open && submenu === "books" && (
          <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll bg-background md:hidden">
            <div className="flex items-center justify-between px-8 py-3.5">
              <div className="text-xs tracking-widest text-muted-foreground uppercase">
                {language === "en" ? "Book Categories" : "Категории Книги"}
              </div>
              <Button variant="outline" onClick={() => setSubmenu(null)}>
                {language === "en" ? "Back" : "Назад"}
                <ChevronLeft className="ml-2 size-4" />
              </Button>
            </div>
            <div>
              {resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group flex w-full items-start gap-x-4 border-t border-border px-8 py-7 text-left hover:bg-accent"
                >
                  <div className="shrink-0">
                    <resource.icon className="size-6" />
                  </div>
                  <div>
                    <div className="mb-1.5 text-base">
                      {language === "en" ? resource.title : 
                        ensureString(resource.title === "Fiction" ? t("categories.fiction") :
                        resource.title === "Non-Fiction" ? t("categories.nonFiction") :
                        resource.title === "Poetry" ? t("categories.poetry") : resource.title)
                      }
                    </div>
                    <div className="text-sm font-normal text-muted-foreground">
                      {language === "en" ? resource.description : 
                        resource.title === "Fiction" ? "Изследвайте завладяващи истории, които ви пренасят в нови светове." :
                        resource.title === "Non-Fiction" ? "Открийте проницателни произведения, базирани на реални събития и изследвания." :
                        resource.title === "Poetry" ? "Изпитайте красотата на езика чрез поетично изразяване." : resource.description
                      }
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 