"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronRight, Star, Zap, MessageSquare, Quote } from "lucide-react";
import { useRef } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useLanguage } from "@/lib/LanguageContext";

const testimonials = [
  {
    name: "Sarah Mitchell",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
    rating: 5,
    comment: "Absolutely loved this book! Couldn't put it down 📚"
  },
  {
    name: "Michael Chen",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
    rating: 5,
    comment: "Great read! The characters are so well written ✨"
  },
  {
    name: "Emma Thompson",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
    rating: 5,
    comment: "This book is a masterpiece! Highly recommend 🌟"
  },
  {
    name: "James Wilson",
    avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
    rating: 5,
    comment: "Amazing story from start to finish! 💫"
  },
  {
    name: "Lisa Rodriguez",
    avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
    rating: 5,
    comment: "Such a beautiful and engaging read 💖"
  },
  {
    name: "David Park",
    avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
    rating: 5,
    comment: "One of the best books I've read this year! 🙌"
  },
];

// Bulgarian translations for testimonials
const testimonialsBG = [
  {
    name: "Сара Митчел",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
    rating: 5,
    comment: "Абсолютно обожавам тази книга! Не можах да я оставя 📚"
  },
  {
    name: "Михаил Чен",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
    rating: 5,
    comment: "Страхотно четиво! Героите са толкова добре написани ✨"
  },
  {
    name: "Ема Томпсън",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
    rating: 5,
    comment: "Тази книга е шедьовър! Горещо препоръчвам 🌟"
  },
  {
    name: "Джеймс Уилсън",
    avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
    rating: 5,
    comment: "Невероятна история от началото до края! 💫"
  },
  {
    name: "Лиза Родригес",
    avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
    rating: 5,
    comment: "Толкова красиво и завладяващо четиво 💖"
  },
  {
    name: "Давид Парк",
    avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
    rating: 5,
    comment: "Една от най-добрите книги, които съм чел тази година! 🙌"
  },
];

const Testimonials = () => {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      rootNode: (emblaRoot) => emblaRoot,
    }),
  );
  
  const { language, t } = useLanguage();
  const currentTestimonials = language === "en" ? testimonials : testimonialsBG;

  return (
    <section className="flex items-center justify-center bg-secondary py-24">
      <div className="w-full max-w-[1200px] px-4">
        <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
            <Zap className="h-4 w-4" />
            {t("testimonials.tagline")}
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {t("testimonials.title")}
          </h2>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            {t("testimonials.description")}
          </p>
        </div>

        <div className="relative mx-auto mt-12">
          <Carousel
            opts={{
              loop: true,
              align: "center",
              dragFree: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {currentTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 basis-[300px] md:basis-[320px]">
                  <Card className="relative h-[200px] p-6">
                    <Quote className="absolute right-4 top-4 h-4 w-4 text-muted-foreground/20" />
                    <div className="flex flex-col items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-orange-100">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                      </Avatar>
                      <div className="text-center space-y-1">
                        <h3 className="text-base font-medium">{testimonial.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 text-center">
                        {testimonial.comment}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" className="gap-2">
            <MessageSquare className="h-5 w-5" />
            {t("testimonials.leaveReview")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 