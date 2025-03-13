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

export default function FAQ() {
  const { language, t } = useLanguage();
  
  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-[60rem] w-full">
          <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
            <div className="inline-flex items-center rounded-2xl bg-muted px-3 py-1 text-sm font-medium">
              <HelpCircle className="mr-1 h-3 w-3" />
              {t("faq.title")}
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("faq.subtitle")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("faq.description")}
            </p>
          </div>

          <div className="mt-8 md:mt-12">
            <Accordion type="single" collapsible className="w-full">
              {t("faq.questions").map((faq, index) => (
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

          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-primary/5 p-8 text-center md:p-12">
            <h3 className="text-xl font-semibold md:text-2xl">
              {t("faq.stillHaveQuestions")}
            </h3>
            <p className="text-sm text-muted-foreground md:text-base">
              {t("faq.cantFind")}
            </p>
            <Button className="mt-2 gap-2">
              <Mail className="h-4 w-4" />
              {t("faq.contactSupport")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 