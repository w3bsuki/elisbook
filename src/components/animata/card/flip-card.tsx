import { cn } from "@/lib/utils";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookOpen, Calendar, User } from "lucide-react";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  category?: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  image,
  title,
  description,
  subtitle,
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

  // Define accent colors based on category
  const getAccentColor = () => {
    switch (category) {
      case 'health':
        return "text-green-600";
      case 'poetry':
        return "text-pink-600";
      case 'selfHelp':
        return "text-purple-600";
      default:
        return "text-green-600";
    }
  };

  // Define border colors based on category
  const getBorderColor = () => {
    switch (category) {
      case 'health':
        return "border-green-200";
      case 'poetry':
        return "border-pink-200";
      case 'selfHelp':
        return "border-purple-200";
      default:
        return "border-green-200";
    }
  };

  // Define badge colors based on category
  const getBadgeColor = () => {
    switch (category) {
      case 'health':
        return "bg-green-100 text-green-700";
      case 'poetry':
        return "bg-pink-100 text-pink-700";
      case 'selfHelp':
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

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
    <div className={cn("group h-80 w-60 [perspective:1000px]", className)} {...props}>
      <div
        className={cn(
          "relative h-full transition-all duration-500 [transform-style:preserve-3d]",
          self[0],
        )}
      >
        {/* Spine effect */}
        <div className={cn("absolute left-0 top-0 h-full w-[10px] shadow-md", getSpineColor())}></div>
        
        {/* Front */}
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <div className="relative h-full w-full overflow-hidden border-2 border-black shadow-md">
            <AspectRatio ratio={3/5} className="h-full">
              <Image
                src={image}
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

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full p-5 bg-white text-gray-800 border-2 border-black shadow-md [backface-visibility:hidden]",
            self[1],
          )}
        >
          <div className="flex min-h-full flex-col">
            {/* Category Badge */}
            <div className={cn("text-xs font-medium px-2 py-1 w-fit", getBadgeColor())}>
              {subtitle}
            </div>
            
            {/* Title */}
            <h1 className="text-xl font-bold mt-3 text-gray-900">{title}</h1>
            
            {/* Divider */}
            <div className={cn("w-16 h-1 my-3", getBorderColor())}></div>
            
            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed flex-grow overflow-y-auto pr-1 max-h-[140px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {description}
            </p>
            
            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <User className="h-3.5 w-3.5" />
                <span className={cn("font-medium", getAccentColor())}>Елис</span>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>76-90 стр.</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 