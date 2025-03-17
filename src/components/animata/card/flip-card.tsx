"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FlipCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  image: string;
  className?: string;
  onClick?: () => void;
}

export default function FlipCard({
  title,
  subtitle,
  description,
  category = 'default',
  image,
  className,
  onClick,
  ...props
}: FlipCardProps) {
  // State to handle image loading errors
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "/images/books/vdahnovenia-kniga-1.png";

  // Define accent colors based on category
  const getAccentColor = () => {
    switch (category) {
      case 'health':
        return "from-green-400 to-green-600";
      case 'poetry':
        return "from-pink-400 to-purple-500";
      case 'selfHelp':
        return "from-purple-400 to-indigo-600";
      default:
        return "from-green-400 to-emerald-600";
    }
  };

  const getOverlayColor = () => {
    switch (category) {
      case 'health':
        return "bg-green-900/20";
      case 'poetry':
        return "bg-pink-900/20";
      case 'selfHelp':
        return "bg-purple-900/20";
      default:
        return "bg-green-900/20";
    }
  };

  // Handle image errors
  const handleImageError = () => {
    console.log("Image failed to load:", image);
    setImageError(true);
  };

  return (
    <div 
      className={cn(
        "group h-full w-full", 
        className
      )} 
      onClick={onClick}
      {...props}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full w-full transition-all duration-700 ease-in-out"
        style={{ 
          transformStyle: "preserve-3d"
        }}
      >
        {/* Front - Perfectly centered card with proper padding */}
        <div 
          className="absolute inset-0 h-full w-full rounded-xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="relative h-full w-full overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
            {/* Subtle overlay gradient for texture/interest */}
            <div className={`absolute inset-0 opacity-40 mix-blend-overlay ${getOverlayColor()} z-10 pointer-events-none`}></div>
            
            {/* Properly contained image with padding */}
            <div className="absolute inset-0 p-3">
              <AspectRatio ratio={3/5} className="h-full w-full rounded-lg overflow-hidden">
                <div className="relative w-full h-full rounded-lg">
                  <Image
                    src={imageError ? fallbackImage : image}
                    alt={title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 240px"
                    priority
                    onError={handleImageError}
                  />
                  
                  {/* Subtle gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30"></div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>

        {/* Back - Completely redesigned with elegant styling, perfectly centered */}
        <div
          className="absolute inset-0 h-full w-full rounded-xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="relative h-full w-full overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
            <div className={`h-full w-full flex flex-col bg-gradient-to-br ${getAccentColor()} text-white p-5`}>
              {/* Fancy background patterns */}
              <div className="absolute inset-0 bg-white/5 opacity-30 pointer-events-none"></div>
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white opacity-5 pointer-events-none"></div>
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white opacity-5 pointer-events-none"></div>
              
              {/* Title section */}
              <div className="bg-black/10 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/10">
                <h3 className="font-bold text-xl mb-2 leading-tight">{title}</h3>
                {subtitle && <p className="text-white/90 text-sm font-medium">{subtitle}</p>}
              </div>
              
              {/* Description section */}
              {description && (
                <div className="flex-grow overflow-y-auto bg-black/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-sm leading-relaxed text-white/90">{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .group:hover > div {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
} 