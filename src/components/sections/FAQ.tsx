"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export default function FAQ() {
  const { t, language } = useLanguage();
  
  // Get the FAQ questions directly from translations
  const faqQuestions = language === 'en' 
    ? translations.en.faq.questions 
    : translations.bg.faq.questions;
  
  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-[60rem] w-full">
          <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
            <div className="inline-flex items-center rounded-2xl bg-muted px-3 py-1 text-sm font-medium">
              <HelpCircle className="mr-1 h-3 w-3" />
              {ensureString(t("faq.title"))}
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {ensureString(t("faq.subtitle"))}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {ensureString(t("faq.description"))}
            </p>
          </div>

          <div className="mt-8 md:mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqQuestions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold md:text-2xl">
              {ensureString(t("faq.stillHaveQuestions"))}
            </h3>
            <p className="text-sm text-muted-foreground md:text-base">
              {ensureString(t("faq.cantFind"))}
            </p>
            <Button className="mt-2 gap-2">
              <Mail className="h-4 w-4" />
              {ensureString(t("faq.contactSupport"))}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 