"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { books } from "@/lib/data";

export default function Hero() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { language, t } = useLanguage();
  
  const handleBookClick = (book: any) => {
    console.log("Book clicked:", book);
    // Navigate to book detail page or open modal
  };
  
  return (
    <>
      {/* Hero Section - Writer's Portfolio */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-[#f8f7f3]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Writer's Image */}
              <div className="relative order-2 md:order-1">
                <div className="relative h-[450px] w-full overflow-hidden rounded-lg border-2 border-black shadow-lg">
                  <Image 
                    src="/images/avatar/avatar.jpg" 
                    alt="Elis - Author" 
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 border-2 border-black shadow-md transform rotate-3 font-handwriting text-xl">
                  {language === 'en' ? 'Writer & Mentor' : 'Писател & Ментор'}
                </div>
              </div>
              
              {/* Writer's Message */}
              <div className="order-1 md:order-2">
                <div className="relative mb-6">
                  <div className="w-16 h-1 bg-green-600 mb-6"></div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                    {language === 'en' ? (
                      <>Hello, I'm <span className="text-green-600">Elis</span></>
                    ) : (
                      <>Здравейте, аз съм <span className="text-green-600">Елис</span></>
                    )}
                  </h2>
                  <div className="font-handwriting text-xl md:text-2xl mb-6 text-gray-700 leading-relaxed">
                    {language === 'en' ? (
                      "I write books that inspire personal growth and mindfulness. My journey as an author began with a simple desire to share stories that touch hearts and transform lives."
                    ) : (
                      "Пиша книги, които вдъхновяват личностното развитие и осъзнатостта. Моето пътуване като автор започна с простото желание да споделям истории, които докосват сърцата и трансформират животи."
                    )}
                  </div>
                  <p className="text-gray-600 mb-8">
                    {language === 'en' ? (
                      "Through poetry, self-help guides, and mindfulness practices, I invite readers to explore the depths of their potential and discover the beauty of living consciously."
                    ) : (
                      "Чрез поезия, наръчници за самопомощ и практики за осъзнатост, каня читателите да изследват дълбините на своя потенциал и да открият красотата на съзнателния живот."
                    )}
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1" asChild>
                      <Link href="/shop">
                        <BookOpen className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Explore My Books' : 'Разгледай Моите Книги'}
                      </Link>
                    </Button>
                    <Button 
                      className="px-6 py-3 bg-white hover:bg-gray-100 text-black border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 text-lg rounded-none transform hover:-translate-y-1" 
                      onClick={() => setIsAboutOpen(true)}
                    >
                      {language === 'en' ? 'Read My Story' : 'Прочети Моята История'}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Dialog */}
      {isAboutOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold font-playfair">
                  {language === 'en' ? 'My Story' : 'Моята История'}
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setIsAboutOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="prose prose-green max-w-none">
                {language === 'en' ? (
                  <>
                    <p>My journey as a writer began in the quiet moments of self-reflection, where I discovered the power of words to heal, inspire, and transform.</p>
                    
                    <p>With a background in psychology and a passion for mindfulness practices, I've dedicated my life to creating literature that serves as a bridge between intellectual understanding and emotional wisdom.</p>
                    
                    <p>Each book I write is born from personal experience and deep research, crafted with the intention to provide readers with practical tools for personal growth while honoring the beauty of language and storytelling.</p>
                    
                    <p>When I'm not writing, you can find me leading workshops on mindful living, exploring nature for inspiration, or engaging with my wonderful community of readers who continue to inspire my creative journey.</p>
                    
                    <p>I believe that books are more than just collections of words—they are companions on our life's journey, offering guidance, comfort, and new perspectives when we need them most.</p>
                  </>
                ) : (
                  <>
                    <p>Моето пътуване като писател започна в тихите моменти на самоанализ, където открих силата на думите да лекуват, вдъхновяват и трансформират.</p>
                    
                    <p>С опит в психологията и страст към практиките за осъзнатост, посветих живота си на създаването на литература, която служи като мост между интелектуалното разбиране и емоционалната мъдрост.</p>
                    
                    <p>Всяка книга, която пиша, е родена от личен опит и задълбочено изследване, създадена с намерението да предостави на читателите практически инструменти за личностно развитие, като същевременно почита красотата на езика и разказването на истории.</p>
                    
                    <p>Когато не пиша, можете да ме намерите да водя семинари за осъзнат живот, да изследвам природата за вдъхновение или да общувам с моята прекрасна общност от читатели, които продължават да вдъхновяват творческото ми пътуване.</p>
                    
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
        </div>
      )}
    </>
  );
} 