"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowDown, BookOpen, User, Sparkles, ChevronRight, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
        
        {/* Enhanced background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-bl-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-tr-full opacity-30 blur-3xl"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-green-200 dark:bg-green-700/30 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-green-300 dark:bg-green-600/30 rounded-full opacity-20 animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-green-400 dark:bg-green-500/30 rounded-full opacity-20 animate-float-fast"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center max-w-6xl mx-auto w-full">
          {/* Text content */}
          <div className="md:col-span-7 space-y-6 animate-fade-in-up">
            <Badge variant="outline" className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-2 border-black dark:border-gray-700 shadow-md mb-2 rounded-full">
              <Sparkles className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
              <span className="text-sm font-bold tracking-wider uppercase">
                {language === 'en' ? 'Writer & Mentor' : 'Писател & Ментор'}
              </span>
            </Badge>
            
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-900 dark:text-white font-playfair">
                <span className="relative inline-block">
                  {language === 'en' ? "Discover" : "Открийте"}
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 dark:bg-green-700/50 -z-10 transform -rotate-1"></span>
                </span>{" "}
                <span className="text-green-600 dark:text-green-400">
                  {language === 'en' ? "the Power" : "силата"}
                </span>{" "}
                {language === 'en' ? "of Words" : "на думите"}
              </h1>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 dark:text-gray-300 font-playfair">
                {language === 'en' 
                  ? "Through Poetry & Mindfulness" 
                  : "Чрез Поезия & Осъзнатост"}
              </h2>
            </div>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed mt-6">
              {language === 'en' 
                ? "Join me on a transformative journey where poetic expression meets mindful living. My books are crafted to inspire, heal, and awaken your creative spirit through carefully chosen words and timeless wisdom." 
                : "Присъединете се към мен в едно трансформиращо пътуване, където поетичното изразяване се среща с осъзнатия живот. Моите книги са създадени да вдъхновяват, лекуват и събуждат творческия ви дух чрез внимателно подбрани думи и вечна мъдрост."}
            </p>
            
            <div className="flex flex-wrap gap-5 pt-6 mt-2">
              <Button 
                className={cn(
                  "bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700",
                  "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]",
                  "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]",
                  "transition-all duration-300 text-lg rounded-md group h-14 px-8"
                )}
                asChild
              >
                <a href="#books" className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  {language === 'en' ? 'Explore My Books' : 'Разгледайте моите книги'}
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className={cn(
                  "bg-white hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-800 text-black dark:text-white",
                  "border-2 border-black dark:border-gray-700",
                  "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]",
                  "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]",
                  "transition-all duration-300 text-lg rounded-md group h-14 px-8"
                )}
                onClick={() => setIsAboutOpen(true)}
              >
                <User className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {language === 'en' ? 'About Me' : 'За мен'}
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end animate-fade-in">
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 w-24 h-24 border-2 border-black dark:border-gray-700 bg-green-100 dark:bg-green-900/30 z-0 transform rotate-6"></div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 border-2 border-black dark:border-gray-700 bg-green-100 dark:bg-green-900/30 z-0 transform -rotate-6"></div>
              
              {/* Main image container */}
              <div className="relative z-10 w-full h-full border-4 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] bg-white dark:bg-gray-800 overflow-hidden transform hover:scale-[1.02] hover:rotate-1 transition-transform duration-300">
                <AspectRatio ratio={1} className="w-full h-full">
                  <Image
                    src="/images/avatar/avatar.jpg"
                    alt={language === 'en' ? "Elis - Writer & Mentor" : "Елис - Писател & Ментор"}
                    fill
                    className="object-cover"
                    priority
                  />
                </AspectRatio>
              </div>
              
              {/* Enhanced badges */}
              <div className="absolute -top-4 right-4 bg-green-600 text-white px-4 py-2 border-2 border-black dark:border-gray-700 shadow-md z-20 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <span className="font-bold text-sm whitespace-nowrap flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Writer & Poet' : 'Писател & Поет'}
                </span>
              </div>
              
              <div className="absolute -bottom-2 left-10 bg-yellow-500 text-black px-4 py-2 border-2 border-black dark:border-gray-700 shadow-md z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="font-bold text-sm whitespace-nowrap flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Mindfulness' : 'Осъзнатост'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator with enhanced animation */}
      <div className={cn(
        "absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in-delayed",
        scrolled ? "opacity-0" : "opacity-100",
        "transition-opacity duration-500"
      )}>
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
          {language === 'en' ? 'Scroll to explore' : 'Превъртете, за да разгледате'}
        </span>
        <div className="animate-bounce p-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
          <ArrowDown className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      {/* About Dialog */}
      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="sm:max-w-2xl border-2 border-black dark:border-gray-700 rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] bg-white dark:bg-gray-900">
          <div className="grid gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-2 bg-green-600 dark:bg-green-500"></div>
                <h2 className="text-3xl font-bold font-playfair">{language === 'en' ? 'About Me' : 'За мен'}</h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none text-lg">
                {language === 'en' ? (
                  <>
                    <p>Hello! I&apos;m Elis, a writer, poet, and mindfulness practitioner based in Bulgaria. My journey into the world of writing began over 15 years ago when I discovered the healing power of words during a difficult period in my life.</p>
                    
                    <p>Since then, I&apos;ve dedicated my life to exploring the intersection of literature, mindfulness, and personal growth. My books combine poetic expression with practical wisdom, offering readers both emotional resonance and actionable insights.</p>
                    
                    <p>I believe that books are more than just collections of words—they are companions on life&apos;s journey, offering guidance, comfort, and new perspectives when we need them most.</p>
                  </>
                ) : (
                  <>
                    <p>Здравейте! Аз съм Елис, писател, поет и практикуващ осъзнатост, базиран в България. Моето пътуване в света на писането започна преди повече от 15 години, когато открих лечебната сила на думите през труден период в живота ми.</p>
                    
                    <p>Оттогава посветих живота си на изследване на пресечната точка между литературата, осъзнатостта и личностното развитие. Моите книги съчетават поетично изразяване с практическа мъдрост, предлагайки на читателите както емоционален резонанс, така и практични прозрения.</p>
                    
                    <p>Вярвам, че книгите са нещо повече от просто сбирки от думи—те са спътници в пътуването на живота ни, предлагащи насоки, утеха и нови перспективи, когато най-много се нуждаем от тях.</p>
                  </>
                )}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-md" 
                  onClick={() => setIsAboutOpen(false)}
                >
                  {language === 'en' ? 'Close' : 'Затвори'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delayed {
          animation: fadeIn 0.5s ease-out 1s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
} 