"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  category?: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  image: _image,
  title,
  description: _description,
  subtitle: _subtitle,
  category = "default",
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
  };
  const self = rotationClass[rotate];

  // Define spine colors based on category
  const getSpineColor = () => {
    switch (category) {
      case 'health':
        return "bg-green-700";
      case 'poetry':
        return "bg-pink-700";
      case 'selfHelp':
        return "bg-purple-700";
      default:
        return "bg-green-700";
    }
  };

  return (
    <div className={cn("group h-[400px] w-[240px] [perspective:1000px]", className)} {...props}>
      <div
        className={cn(
          "relative h-full w-full transition-all duration-500 [transform-style:preserve-3d]",
          self[0],
        )}
      >
        {/* Spine effect */}
        <div className={cn("absolute left-0 top-0 h-full w-[10px] shadow-md z-10", getSpineColor())}></div>
        
        {/* Front */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
          <div className="relative h-full w-full overflow-hidden border-2 border-black shadow-md">
            <AspectRatio ratio={3/5} className="h-full w-full">
              <Image
                src="/images/books/vdahnovenia-kniga-1.png"
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 240px"
                priority
              />
            </AspectRatio>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-md line-clamp-2">{title}</div>
        </div>

        {/* Back - Just the image, no text overlay */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full border-2 border-black shadow-md [backface-visibility:hidden]",
            self[1],
          )}
        >
          <div className="relative h-full w-full overflow-hidden">
            <AspectRatio ratio={3/5} className="h-full w-full">
              <Image
                src="/images/books/vdahnovenia-kniga-2.png"
                alt="Book Back"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
} 