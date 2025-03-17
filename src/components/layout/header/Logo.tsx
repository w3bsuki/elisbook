"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  isScrolled: boolean;
}

export function Logo({ isScrolled }: LogoProps) {
  return (
    <Link href="/" className="focus-visible:outline-none">
      <span className={cn(
        "font-bold tracking-wide text-white font-playfair will-change-transform",
        isScrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
      )}>ELIS</span>
    </Link>
  );
} 