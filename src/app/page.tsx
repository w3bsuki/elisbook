import React from 'react';
import Hero from "@/components/sections/Hero";
import FeaturedBooks from "@/components/sections/FeaturedBooks";
import AboutAuthor from "@/components/sections/AboutAuthor";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedBooks />
      <Testimonials />
      <FAQ />
      <AboutAuthor />
    </main>
  );
}
