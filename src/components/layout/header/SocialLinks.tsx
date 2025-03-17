"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link 
        href="https://facebook.com" 
        target="_blank" 
        className="text-white hover:text-gray-100 transition-all duration-200 flex items-center justify-center h-9 w-9 bg-transparent hover:bg-green-700 rounded-full border border-white/20 hover:scale-110"
        aria-label="Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Link>
      <Link 
        href="https://instagram.com" 
        target="_blank" 
        className="text-white hover:text-gray-100 transition-all duration-200 flex items-center justify-center h-9 w-9 bg-transparent hover:bg-green-700 rounded-full border border-white/20 hover:scale-110"
        aria-label="Instagram"
      >
        <Instagram className="h-4 w-4" />
      </Link>
    </div>
  );
} 