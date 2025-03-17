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
        
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-bl-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-tr-full blur-3xl opacity-30"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-green-200 dark:bg-green-700/30 rounded-full opacity-20"></div>
        <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-green-300 dark:bg-green-600/30 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-green-400 dark:bg-green-500/30 rounded-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center max-w-6xl mx-auto w-full">
          {/* Text content */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <Badge variant="outline" className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white dark:text-white border-2 border-black dark:border-gray-700 shadow-md mb-2 rounded-full">
                <Sparkles className="h-4 w-4 mr-2 text-white dark:text-white" />
                <span className="text-sm font-bold tracking-wider uppercase">
                  {language === 'en' ? 'Writer & Mentor' : 'Писател & Ментор'}
                </span>
              </Badge>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-900 dark:text-white font-playfair">
                <span className="relative inline-block">
                  {language === 'en' ? "Discover" : "Открийте"}
                  <span className="absolute -bottom-2 left-0 h-3 w-full bg-green-200 dark:bg-green-700/50 -z-10 transform -rotate-1"></span>
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
                ? "Hello, I'm Elis. As an author and mentor, I'm passionate about helping others discover the transformative power of words. My books combine poetic expression with mindfulness practices to inspire your creative journey." 
                : "Здравейте, аз съм Елис. Като автор и ментор, аз съм страстно отдадена да помагам на другите да открият трансформиращата сила на думите. Моите книги съчетават поетично изразяване с практики за осъзнатост, за да вдъхновят вашето творческо пътуване."}
            </p>
            
            <div className="flex flex-wrap gap-5 pt-6 mt-2 relative">
              <Button 
                className={cn(
                  "bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700",
                  "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]",
                  "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]",
                  "transition-all duration-300 text-lg rounded-md h-14 px-8"
                )}
                asChild
              >
                <a href="#books" className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  {language === 'en' ? 'Explore My Books' : 'Разгледайте моите книги'}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              
              <Button 
                className={cn(
                  "bg-white hover:bg-gray-50 text-black border-2 border-black dark:border-gray-700",
                  "shadow-[5px_5px_0px_0px_rgba(34,197,94,1)] dark:shadow-[5px_5px_0px_0px_rgba(74,222,128,0.5)]",
                  "hover:shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(74,222,128,0.5)]",
                  "transition-all duration-300 text-lg rounded-md h-14 px-8"
                )}
                asChild
              >
                <a href="#services" className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  {language === 'en' ? 'Services & Courses' : 'Услуги & Курсове'}
                  <ChevronRight className="ml-2 h-5 w-5 text-green-600 dark:text-green-400" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] cursor-pointer group" onClick={() => setIsAboutOpen(true)}>
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 w-24 h-24 border-2 border-black dark:border-gray-700 bg-green-100 dark:bg-green-900/30 z-0"></div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 border-2 border-black dark:border-gray-700 bg-green-100 dark:bg-green-900/30 z-0"></div>
              
              {/* Main image container */}
              <div className="relative z-10 w-full h-full border-4 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] bg-white dark:bg-gray-800 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                <AspectRatio ratio={1} className="w-full h-full">
                  <Image
                    src="/images/avatar/avatar.jpg"
                    alt={language === 'en' ? "Elis - Writer & Mentor" : "Елис - Писател & Ментор"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </AspectRatio>
              </div>
              
              {/* Enhanced badges */}
              <div className="absolute -top-4 right-4 bg-green-600 text-white px-4 py-2 border-2 border-black dark:border-gray-700 shadow-md z-20">
                <span className="font-bold text-sm whitespace-nowrap flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Writer & Poet' : 'Писател & Поет'}
                </span>
              </div>
              
              <div className="absolute -bottom-2 left-10 bg-yellow-500 text-black px-4 py-2 border-2 border-black dark:border-gray-700 shadow-md z-20">
                <span className="font-bold text-sm whitespace-nowrap flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Mindfulness' : 'Осъзнатост'}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 transition-colors duration-300 z-20 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-[1px]">
                <span className="bg-white/80 dark:bg-black/70 text-black dark:text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-lg shadow-lg">
                  {language === 'en' ? 'About Me' : 'За мен'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${scrolled ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
          {language === 'en' ? 'Scroll to explore' : 'Превъртете, за да разгледате'}
        </span>
        <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
          <ArrowDown className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      {/* About Dialog */}
      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="sm:max-w-3xl border-2 border-black dark:border-gray-700 rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] bg-white dark:bg-gray-900 p-0 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image section */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 opacity-30"></div>
              <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
              <div className="relative h-full flex items-center justify-center p-6">
                <div className="w-full max-w-[250px] aspect-square border-4 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden">
                  <AspectRatio ratio={1} className="w-full h-full">
                    <Image
                      src="/images/avatar/avatar.jpg"
                      alt={language === 'en' ? "Elis - Writer & Mentor" : "Елис - Писател & Ментор"}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
            
            {/* Content section */}
            <div className="p-6">
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
                      
                      <blockquote className="border-l-4 border-green-500 pl-4 italic my-4">
                        "I believe that books are more than just collections of words—they are companions on life&apos;s journey, offering guidance, comfort, and new perspectives when we need them most."
                      </blockquote>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Poetry</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Mindfulness</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Self-Growth</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Mentorship</Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Здравейте! Аз съм Елис, писател, поет и практикуващ осъзнатост, базиран в България. Моето пътуване в света на писането започна преди повече от 15 години, когато открих лечебната сила на думите през труден период в живота ми.</p>
                      
                      <p>Оттогава посветих живота си на изследване на пресечната точка между литературата, осъзнатостта и личностното развитие. Моите книги съчетават поетично изразяване с практическа мъдрост, предлагайки на читателите както емоционален резонанс, така и практични прозрения.</p>
                      
                      <blockquote className="border-l-4 border-green-500 pl-4 italic my-4">
                        "Вярвам, че книгите са нещо повече от просто сбирки от думи—те са спътници в пътуването на живота ни, предлагащи насоки, утеха и нови перспективи, когато най-много се нуждаем от тях."
                      </blockquote>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Поезия</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Осъзнатост</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Личностно развитие</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">Менторство</Badge>
                      </div>
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
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
} 