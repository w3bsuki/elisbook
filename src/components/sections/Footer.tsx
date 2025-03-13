"use client";

import Link from "next/link";
import { DIcons } from "dicons";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useLanguage } from "@/lib/LanguageContext";

const Underline = `hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform`;

const Footer = () => {
  const { language, t } = useLanguage();
  
  const navigation = {
    categories: [
      {
        id: "main",
        sections: [
          {
            id: "about",
            name: t("footer.about"),
            items: [
              { name: t("footer.about"), href: "/about" },
              { name: t("footer.contact"), href: "/contact" },
            ],
          },
          {
            id: "features",
            name: t("footer.features"),
            items: [
              { name: t("footer.books"), href: "/shop" },
              { name: t("footer.dashboard"), href: "/dashboard" },
            ],
          },
          {
            id: "legal",
            name: t("footer.legal"),
            items: [
              { name: t("footer.termsOfService"), href: "/terms" },
              { name: t("footer.privacyPolicy"), href: "/privacy" },
            ],
          },
        ],
      },
    ],
  };
  
  return (
    <footer className="border-t px-2">
      <div className="relative mx-auto grid max-w-4xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <Link href="/">
          <p className="flex items-center justify-center rounded-full">
            <img
              src="https://shadcnblocks.com/images/block/logos/shadcn-ui-wordmark.svg"
              alt="BookHaven"
              className="h-8 dark:invert"
            />
          </p>
        </Link>
        <p className="bg-transparent text-center text-xs leading-4 text-primary/60 md:text-left">
          {t("footer.welcome")}
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="border-b border-dotted" />
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-3 flex-row justify-between gap-6 leading-6 md:flex"
            >
              {category.sections.map((section) => (
                <div key={section.name}>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading`}
                    className="flex flex-col space-y-2"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <Link
                          href={item.href}
                          className="text-sm text-slate-600 hover:text-black dark:text-slate-400 hover:dark:text-white md:text-xs"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-dotted" />
      </div>

      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <Link
            aria-label="Email"
            href="mailto:contact@bookhaven.com"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Mail strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Twitter"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.X className="h-5 w-5" />
          </Link>
          <Link
            aria-label="GitHub"
            href="#"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <DIcons.Code className="h-5 w-5" />
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto mb-10 mt-10 flex flex-col justify-between text-center text-xs md:max-w-4xl">
        <div className="flex flex-row items-center justify-center gap-1 text-slate-600 dark:text-slate-400">
          <span>©</span>
          <span>{new Date().getFullYear()}</span>
          <span>BookHaven. {t("footer.allRightsReserved")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 