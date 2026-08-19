import * as React from "react";
import { Moon, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <Moon 
        className="text-foreground stroke-[1.5]" 
        size={24} 
        aria-hidden="true" 
      />
      <Sprout 
        className="absolute -right-1 -bottom-1 text-highlight stroke-[2]" 
        size={14} 
        aria-hidden="true" 
      />
    </div>
  );
}
