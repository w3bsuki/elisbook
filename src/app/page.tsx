import React from 'react';
import Hero from "@/components/sections/Hero";
import FeaturedBooks from "@/components/sections/FeaturedBooks";
import AboutAuthor from "@/components/sections/AboutAuthor";
import Testimonials from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/BlogSection";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedBooks />
      <Testimonials />
      <BlogSection />
      <FAQ />
      <AboutAuthor />
    </main>
  );
}
