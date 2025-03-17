"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  isScrolled: boolean;
}

export function Logo({ isScrolled }: LogoProps) {
  return (
    <Link href="/" className="transition-transform hover:scale-105">
      <span className={cn(
        "font-bold tracking-wide text-white font-playfair transition-all duration-300",
        isScrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
      )}>ELIS</span>
    </Link>
  );
} 