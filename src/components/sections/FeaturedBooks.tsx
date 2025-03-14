"use client";

import { BookOpen, Star, Sparkles, TrendingUp, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { shopBooks } from "@/lib/shop-data";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

// Custom books for the featured section
const customFeaturedBooks = [
  // Вдъхновение
  shopBooks.find(book => book.title.includes('Вдъхновения') && book.title.includes('книга 2')),
  // Осъзнато хранене
  shopBooks.find(book => book.title.includes('Осъзнато хранене')),
  // С душа и сърце
  shopBooks.find(book => book.title === 'С душа и сърце')
];

// Custom headlines for the featured books
const customHeadlines = [
  "Вдъхновение",
  "Осъзнато хранене",
  "С душа и сърце"
];

const FeaturedBooks = () => {
  const { language, t } = useLanguage();
  
  return (
    <section className="bg-secondary py-32">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-[60rem] w-full">
          {/* Top dashed line with text */}
          <div className="relative flex items-center justify-center">
            <DashedLine className="text-muted-foreground" />
            <div className="absolute bg-secondary px-4 font-mono text-sm font-medium tracking-wide text-muted-foreground flex items-center gap-2">
              <Crown className="h-4 w-4 text-green-500" />
              {ensureString(t("featuredBooks.bestselling"))}
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:mt-16 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600 w-fit">
                <TrendingUp className="h-4 w-4" />
                {ensureString(t("featuredBooks.tagline"))}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                {ensureString(t("featuredBooks.title"))}
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-base text-muted-foreground md:text-lg">
                {ensureString(t("featuredBooks.description"))}
              </p>
              <div className="grid grid-cols-2 gap-6 rounded-2xl bg-background/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">4.8</div>
                    <div className="text-sm text-muted-foreground">{ensureString(t("featuredBooks.avgRating"))}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">7.2k+</div>
                    <div className="text-sm text-muted-foreground">{ensureString(t("featuredBooks.readers"))}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <Card className="mt-16 overflow-hidden border-none bg-transparent shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {customFeaturedBooks.map((book, i) => (
                  <div key={i} className="relative border-b lg:border-b-0 lg:border-r last:border-0 border-dashed border-muted-foreground/30">
                    <div className="p-6 lg:p-8 flex flex-col h-full">
                      {/* Image */}
                      <div className="w-full overflow-hidden rounded-xl relative group">
                        <AspectRatio ratio={2/3} className="bg-muted">
                          <Image
                            src={book?.coverImage || ''}
                            alt={`${book?.title || ''} book cover`}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={90}
                            priority
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Badge className="bg-green-500 hover:bg-green-500/90">
                              <Sparkles className="mr-1 h-3 w-3" />
                              {ensureString(t("featuredBooks.featured"))}
                            </Badge>
                            <Badge className="bg-primary/90 hover:bg-primary/90">
                              {book?.category === 'health' ? ensureString(t("categories.health")) : 
                               book?.category === 'poetry' ? ensureString(t("categories.poetry")) : 
                               book?.category === 'selfHelp' ? ensureString(t("categories.selfHelp")) : 
                               book?.category}
                            </Badge>
                          </div>
                        </AspectRatio>
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col mt-6 h-[250px]">
                        {/* Title and Rating */}
                        <div className="flex justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold tracking-tight line-clamp-2">
                              {customHeadlines[i]}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {ensureString(t("featuredBooks.by"))} {book?.publisher}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 fill-green-500 text-green-500 mr-1" />
                              <span className="font-medium">4.8</span>
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {book?.pages} {language === 'en' ? 'pages' : 'стр.'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-4 flex-grow">
                          {book?.description}
                        </p>
                        
                        {/* Buttons */}
                        <div className="flex gap-2 mt-6">
                          <Link href={`/shop/${book?.id}`} className="flex-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="gap-2 font-medium text-xs w-full"
                            >
                              <BookOpen className="h-4 w-4" />
                              {ensureString(t("featuredBooks.readPreview"))}
                            </Button>
                          </Link>
                          <Link href={`/shop/${book?.id}`} className="flex-1">
                            <Button 
                              size="sm" 
                              className="gap-2 font-medium bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 text-xs w-full"
                            >
                              {ensureString(t("featuredBooks.buyNow"))}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex justify-center">
            <Link href="/shop">
              <Button variant="outline" size="lg" className="gap-2 bg-green-500 hover:bg-green-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                <BookOpen className="h-5 w-5" />
                {ensureString(t("featuredBooks.exploreAll"))}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative text-muted-foreground",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className,
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_45%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_45%,transparent)]",
              ],
        )}
      />
    </div>
  );
};

export default FeaturedBooks; 