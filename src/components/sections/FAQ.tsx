"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, PlusCircle, MinusCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function FAQ() {
  const { language } = useLanguage();
  
  // Get the FAQ questions directly from translations
  const faqQuestions = language === 'en' 
    ? translations.en.faq.questions 
    : translations.bg.faq.questions;
  
  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
            <HelpCircle className="h-4 w-4" />
            {language === 'en' ? 'Frequently Asked Questions' : 'Често Задавани Въпроси'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? "Got Questions? We've Got Answers" : 'Имате Въпроси? Ние Имаме Отговори'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Everything you need to know about our book platform and services'
              : 'Всичко, което трябва да знаете за нашата книжна платформа и услуги'}
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqQuestions.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b-2 border-gray-200 dark:border-gray-700 last:border-0"
              >
                <AccordionTrigger className="text-left py-5 text-lg font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <div className="flex items-center justify-between w-full">
                    <span>{faq.question}</span>
                    <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-purple-500 dark:border-purple-400 text-purple-500 dark:text-purple-400 group-data-[state=open]:hidden">
                      <PlusCircle className="h-4 w-4" />
                    </div>
                    <div className="hidden h-6 w-6 rounded-full border-2 border-purple-500 dark:border-purple-400 text-purple-500 dark:text-purple-400 group-data-[state=open]:flex items-center justify-center">
                      <MinusCircle className="h-4 w-4" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-4 text-gray-600 dark:text-gray-300 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center max-w-2xl mx-auto bg-purple-50 dark:bg-purple-900/20 p-8 border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'en' ? 'Still have questions?' : 'Все още имате въпроси?'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {language === 'en' 
              ? "Can't find the answer you're looking for? Feel free to reach out to our support team."
              : 'Не можете да намерите отговора, който търсите? Не се колебайте да се свържете с нашия екип за поддръжка.'}
          </p>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 text-lg rounded-md group h-14 px-8" 
            asChild
          >
            <a href="#contact" className="flex items-center">
              <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              {language === 'en' ? 'Contact Support' : 'Свържете се с Поддръжка'}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
} 