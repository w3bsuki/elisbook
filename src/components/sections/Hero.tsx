"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { language } = useLanguage();
  
  return (
    <section className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
              {language === 'en' ? 'Writer & Mentor' : 'Писател & Ментор'}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              {language === 'en' 
                ? "Discover the Power of Words and Mindfulness" 
                : "Открийте силата на думите и осъзнатостта"}
            </h1>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
              {language === 'en' 
                ? "I'm Elis, a writer and mindfulness practitioner dedicated to helping you explore your potential through poetry and mindfulness practices." 
                : "Аз съм Елис, писател и практикуващ осъзнатост, посветен на това да ви помогна да изследвате потенциала си чрез поезия и практики за осъзнатост."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1" asChild>
                <a href="#books">
                  {language === 'en' ? 'Explore My Books' : 'Разгледайте моите книги'}
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-white hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1"
                onClick={() => setIsAboutOpen(true)}
              >
                {language === 'en' ? 'About Me' : 'За мен'}
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 blur-xl"></div>
              <div className="relative z-10 w-full h-full rounded-full border-4 border-black dark:border-gray-700 shadow-xl overflow-hidden">
                <AspectRatio ratio={1} className="w-full h-full">
                  <Image
                    src="/images/avatar/avatar.jpg"
                    alt={language === 'en' ? "Elis - Writer & Mentor" : "Елис - Писател & Ментор"}
                    fill
                    className="object-cover"
                    priority
                  />
                </AspectRatio>
                <div className="absolute inset-0 rounded-full shadow-inner"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-none border-2 border-black dark:border-gray-700 shadow-md z-20">
                <span className="font-bold text-sm">
                  {language === 'en' ? 'Writer & Mentor' : 'Писател & Ментор'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Dialog */}
      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="sm:max-w-2xl border-2 border-black dark:border-gray-700">
          <div className="grid gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{language === 'en' ? 'About Me' : 'За мен'}</h2>
              
              <div className="prose dark:prose-invert max-w-none">
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
                  className="bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 rounded-none transform hover:-translate-y-1" 
                  onClick={() => setIsAboutOpen(false)}
                >
                  {language === 'en' ? 'Close' : 'Затвори'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
} 