"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Star, MessageSquare, Quote, Heart } from "lucide-react";
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

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 dark:bg-rose-900/30 px-3 py-1 text-sm font-medium text-rose-600 dark:text-rose-400 mb-4">
            <Heart className="h-4 w-4" />
            {language === 'en' ? 'Reader Feedback' : 'Читателски Отзиви'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'What Readers Are Saying' : 'Какво Казват Читателите'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover what our community of readers thinks about our books and their transformative impact.'
              : 'Открийте какво мисли нашата общност от читатели за нашите книги и тяхното трансформиращо въздействие.'}
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative mx-auto mt-12 max-w-6xl">
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
                  <Card className="relative h-[220px] p-6 border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] bg-white dark:bg-gray-800 rounded-none">
                    <Quote className="absolute right-4 top-4 h-5 w-5 text-rose-300 dark:text-rose-700" />
                    <div className="flex flex-col items-center gap-3">
                      <Avatar className="h-14 w-14 border-2 border-rose-200 dark:border-rose-800">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                      </Avatar>
                      <div className="text-center space-y-1">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-rose-500 text-rose-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 text-center">
                        "{testimonial.comment}"
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Call to action */}
        <div className="flex justify-center mt-16">
          <Button 
            className="bg-rose-600 hover:bg-rose-700 text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none group h-14 px-8" 
            asChild
          >
            <a href="#contact" className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              {language === 'en' ? 'Share Your Feedback' : 'Споделете Вашето Мнение'}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 