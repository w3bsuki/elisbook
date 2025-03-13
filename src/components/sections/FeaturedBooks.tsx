"use client";

import { BookOpen, Star, Sparkles, TrendingUp, Crown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/LanguageContext";

const items = [
  {
    title: "The Silent Echo",
    titleBG: "Тихото Ехо",
    author: "Elizabeth Morgan",
    authorBG: "Елизабет Морган",
    description: "A gripping mystery novel that follows detective Sarah Chen as she unravels a decades-old cold case in the heart of San Francisco.",
    descriptionBG: "Завладяващ мистериозен роман, който следва детектив Сара Чен, докато разкрива десетилетен студен случай в сърцето на Сан Франциско.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    rating: 4.8,
    category: "Mystery",
    categoryBG: "Мистерия",
    readers: "2.3k",
    featured: true
  },
  {
    title: "Midnight Gardens",
    titleBG: "Полунощни Градини",
    author: "James Holloway",
    authorBG: "Джеймс Холоуей",
    description: "An enchanting fantasy tale about a hidden world that only blooms under the midnight moon, where magic and reality intertwine.",
    descriptionBG: "Омайваща фентъзи приказка за скрит свят, който цъфти само под полунощната луна, където магията и реалността се преплитат.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=687&auto=format&fit=crop",
    rating: 4.6,
    category: "Fantasy",
    categoryBG: "Фентъзи",
    readers: "1.8k",
    featured: false
  },
  {
    title: "The Art of Prose",
    titleBG: "Изкуството на Прозата",
    author: "Rebecca Chen",
    authorBG: "Ребека Чен",
    description: "A comprehensive guide to mastering the craft of writing beautiful, compelling prose. Perfect for aspiring writers and seasoned authors alike.",
    descriptionBG: "Изчерпателно ръководство за овладяване на изкуството да пишете красива, завладяваща проза. Перфектно както за начинаещи писатели, така и за опитни автори.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
    rating: 4.9,
    category: "Non-Fiction",
    categoryBG: "Нехудожествена литература",
    readers: "3.1k",
    featured: false
  },
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
              <Crown className="h-4 w-4 text-orange-500" />
              {t("featuredBooks.bestselling")}
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:mt-16 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600 w-fit">
                <TrendingUp className="h-4 w-4" />
                {t("featuredBooks.tagline")}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                {t("featuredBooks.title")}
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-base text-muted-foreground md:text-lg">
                {t("featuredBooks.description")}
              </p>
              <div className="grid grid-cols-2 gap-6 rounded-2xl bg-background/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">4.8</div>
                    <div className="text-sm text-muted-foreground">{t("featuredBooks.avgRating")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">7.2k+</div>
                    <div className="text-sm text-muted-foreground">{t("featuredBooks.readers")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <Card className="mt-12 overflow-hidden rounded-2xl border-none bg-gradient-to-b from-background to-background/80 backdrop-blur-sm md:mt-16">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {items.map((item, i) => (
                  <div key={i} className="relative border-b lg:border-b-0 lg:border-r last:border-0 border-dashed border-muted-foreground/30">
                    <div className="p-6 lg:p-8 flex flex-col h-full">
                      {/* Image */}
                      <div className="aspect-[1.28/1] w-full overflow-hidden rounded-xl relative group">
                        <img
                          src={item.image}
                          alt={`${language === "en" ? item.title : item.titleBG} book cover`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                        <div className="absolute top-3 right-3 flex gap-2">
                          {item.featured && (
                            <Badge className="bg-orange-500 hover:bg-orange-500/90">
                              <Sparkles className="mr-1 h-3 w-3" />
                              {t("featuredBooks.featured")}
                            </Badge>
                          )}
                          <Badge className="bg-primary/90 hover:bg-primary/90">
                            {language === "en" ? item.category : item.categoryBG}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col h-[250px] mt-6">
                        {/* Title and Rating */}
                        <div className="flex justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold tracking-tight line-clamp-2 min-h-[56px]">
                              {language === "en" ? item.title : item.titleBG}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {t("featuredBooks.by")} {language === "en" ? item.author : item.authorBG}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 fill-orange-500 text-orange-500 mr-1" />
                              <span className="font-medium">{item.rating}</span>
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {item.readers} {t("featuredBooks.readers").toLowerCase()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-4 flex-grow">
                          {language === "en" ? item.description : item.descriptionBG}
                        </p>
                        
                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-2 font-medium text-xs flex-1"
                          >
                            <BookOpen className="h-4 w-4" />
                            {t("featuredBooks.readPreview")}
                          </Button>
                          <Button 
                            size="sm" 
                            className="gap-2 font-medium bg-orange-500 hover:bg-orange-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 text-xs flex-1"
                          >
                            {t("featuredBooks.buyNow")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 font-medium">
              <BookOpen className="h-5 w-5" />
              {t("featuredBooks.exploreAll")}
            </Button>
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