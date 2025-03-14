import React from 'react';
import Hero from "@/components/sections/Hero";
import Bestsellers from "@/components/sections/Bestsellers";
import DigitalBooks from "@/components/sections/DigitalBooks";
import AllBooks from "@/components/sections/AllBooks";
import BlogPreview from "@/components/sections/BlogPreview";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <Bestsellers />
      <DigitalBooks />
      <AllBooks />
      <BlogPreview />
      <Testimonials />
      <FAQ />
    </main>
  );
}
