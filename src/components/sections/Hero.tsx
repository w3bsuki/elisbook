"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowDown, BookOpen, Sparkles, ChevronRight, Heart, Star, Award, Quote, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;
  
  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden min-h-[92vh] flex items-center justify-center">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
        
        {/* Gradient blobs - optimized size */}
        <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] bg-gradient-to-br from-green-100/80 via-green-200/60 to-green-300/50 dark:from-green-900/40 dark:via-green-800/30 dark:to-green-700/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-gradient-to-tl from-green-100/80 via-green-200/60 to-green-300/50 dark:from-green-900/40 dark:via-green-800/30 dark:to-green-700/20 rounded-full blur-3xl opacity-30"></div>
        
        {/* Decorative elements - balanced size */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-1/4 left-[15%] w-7 h-7 bg-green-500/30 border border-green-500/50 dark:bg-green-600/20 dark:border-green-600/30 rotate-45 rounded-sm"
        />
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-1/4 right-[15%] w-10 h-10 bg-yellow-500/20 border border-yellow-500/40 dark:bg-yellow-600/10 dark:border-yellow-600/20 rounded-full"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-2/3 left-[30%] w-6 h-6 bg-purple-500/20 border border-purple-500/40 dark:bg-purple-600/10 dark:border-purple-600/20 rotate-12"
        />
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        
        {/* Animated circles */}
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-[15%] w-64 h-64 border border-green-200/40 dark:border-green-800/30 rounded-full opacity-40"
        />
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-[15%] w-48 h-48 border border-green-200/30 dark:border-green-800/20 rounded-full opacity-40"
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Avatar with animated entrance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-5"
          >
            <Avatar 
              className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setIsAboutOpen(true)}
            >
              <AvatarImage src="/images/avatar/avatar.jpg" alt={translate("Елис", "Elis")} />
              <AvatarFallback className="text-2xl bg-green-500 text-white">
                {translate("Е", "E")}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          {/* Main content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Animated heading - balanced size */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-gray-900 dark:text-white font-playfair">
                  <span className="relative inline-block">
                    {translate("Открийте", "Discover")}
                    <span className="absolute -bottom-1.5 left-0 h-3 w-full bg-green-200 dark:bg-green-700/50 -z-10 transform -rotate-1"></span>
                  </span>{" "}
                  <span className="text-green-600 dark:text-green-400">
                    {translate("силата", "the Power")}
                  </span>{" "}
                  {translate("на думите", "of Words")}
                </h1>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 font-playfair"
              >
                {translate("Чрез Поезия & Осъзнатост", "Through Poetry & Mindfulness")}
              </motion.h2>
            </div>
            
            {/* Animated description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              {translate(
                "Здравейте, аз съм Елис. Като автор и ментор, аз съм страстно отдадена да помагам на другите да открият трансформиращата сила на думите. Моите книги съчетават поетично изразяване с практики за осъзнатост.", 
                "Hello, I'm Elis. As an author and mentor, I'm passionate about helping others discover the transformative power of words. My books combine poetic expression with mindfulness practices."
              )}
            </motion.p>
            
            {/* Testimonial snippet */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-2xl mx-auto mt-2 pl-5 border-l-3 border-green-500 dark:border-green-600 py-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-r-lg text-left"
            >
              <Quote className="absolute -left-6 -top-3 h-5 w-5 text-green-600 dark:text-green-400 bg-white dark:bg-gray-900 rounded-full p-1" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic">
                {translate(
                  "Поетичното изразяване на Елис носи дълбочина и яснота, преобразявайки вътрешния свят на читателя.", 
                  "Elis's poetic expression brings depth and clarity, transforming the reader's inner world."
                )}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-400">
                  {translate("Литературен Критик", "Literary Critic")}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mt-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-green-700 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xl">6+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{translate("Книги", "Books")}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-700 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xl">3</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{translate("Награди", "Awards")}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-green-700 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xl">5K+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{translate("Читатели", "Readers")}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Animated button group */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-5 pt-4 mt-2"
            >
              <Button 
                className={cn(
                  "bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700",
                  "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
                  "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]",
                  "transition-all duration-300 text-base md:text-lg rounded-md h-12 px-6 hover:translate-y-[-2px]"
                )}
                asChild
              >
                <a href="#books" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {translate("Разгледайте моите книги", "Explore My Books")}
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              
              <Button 
                className={cn(
                  "bg-white hover:bg-gray-50 text-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white border-2 border-black dark:border-gray-700",
                  "shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] dark:shadow-[4px_4px_0px_0px_rgba(74,222,128,0.5)]",
                  "hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(74,222,128,0.5)]",
                  "transition-all duration-300 text-base md:text-lg rounded-md h-12 px-6 hover:translate-y-[-2px]"
                )}
                asChild
              >
                <a href="#services" className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                  {translate("Услуги & Курсове", "Services & Courses")}
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator - positioned lower to avoid showing AboutAuthor badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500 dark:text-gray-400"
      >
        <span className="text-xs uppercase tracking-wider mb-1.5">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>

      {/* About Dialog */}
      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden rounded-xl shadow-2xl border-2 border-black dark:border-gray-700">
          <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-white dark:from-green-900/20 dark:to-gray-900 z-0"></div>
            
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 w-full h-full">
              {/* Image column */}
              <div className="md:col-span-4 bg-green-50 dark:bg-green-900/20 hidden md:block relative">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
                <div className="relative h-full flex items-center justify-center p-6">
                  <div 
                    className="w-full max-w-[250px] aspect-square border-4 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden"
                  >
                    <AspectRatio ratio={1} className="w-full h-full">
                      <Image 
                        src="/images/avatar/avatar.jpg" 
                        alt={translate("Елис - Автор", "Elis - Author")} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 250px"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
              
              {/* Text content */}
              <div className="md:col-span-8 p-6 md:p-8 lg:p-10 flex items-center">
                <div className="space-y-5">
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{translate("За Елис", "About Elis")}</h2>
                    <p className="text-lg font-medium text-green-600 dark:text-green-400">{translate("Автор & Ментор", "Author & Mentor")}</p>
                  </div>
                  
                  <div className="prose prose-green dark:prose-invert max-w-none">
                    <p>
                      {translate(
                        "Елис е български автор и ментор с над 15 години опит в областта на личностното развитие. Нейните книги съчетават поезия с практики за осъзнатост, създавайки уникален подход към себепознанието.",
                        "Elis is a Bulgarian author and mentor with over 15 years of experience in personal development. Her books combine poetry with mindfulness practices, creating a unique approach to self-discovery."
                      )}
                    </p>
                    <p>
                      {translate(
                        "След завършването на магистърска степен по психология и обучение в будистки практики за осъзнатост, Елис разработва собствена методология, която интегрира поетичното изразяване като инструмент за трансформация.",
                        "After completing a master's degree in psychology and training in Buddhist mindfulness practices, Elis developed her own methodology that integrates poetic expression as a tool for transformation."
                      )}
                    </p>
                    <p>
                      {translate(
                        "Нейната работа помага на хиляди читатели да открият вътрешния си глас, да култивират осъзнатост и да живеят по-автентично. Чрез книгите, уъркшопите и индивидуалните сесии, Елис създава пространство за дълбока трансформация и творческо израстване.",
                        "Her work has helped thousands of readers discover their inner voice, cultivate mindfulness, and live more authentically. Through her books, workshops, and individual sessions, Elis creates space for deep transformation and creative growth."
                      )}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {translate("6 публикувани книги", "6 published books")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {translate("5000+ ментортвани", "5000+ mentored")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {translate("Литературна награда 2022", "Literary Award 2022")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
} 