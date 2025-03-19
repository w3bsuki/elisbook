"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || 
                  (href !== '/' && pathname.startsWith(href));
  
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink 
        className={cn(
          navigationMenuTriggerStyle(), 
          "text-lg font-medium transition-colors text-white !bg-transparent",
          isActive ? "font-semibold !bg-green-700" : "hover:!bg-green-700 hover:text-gray-100",
          className
        )}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
} 