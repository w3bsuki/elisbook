import React from 'react';
import Hero from "@/components/sections/Hero";
import Bestsellers from "@/components/sections/Bestsellers";
import AllBooks from "@/components/sections/AllBooks";
import BlogPreview from "@/components/sections/BlogPreview";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Bestsellers />
      <AllBooks />
      <Services />
      <BlogPreview />
      <Testimonials />
      <FAQ />
    </main>
  );
}
