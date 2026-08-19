import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative overflow-hidden inline-flex items-center justify-center rounded-sm font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            "bg-highlight text-primary border border-transparent": variant === "primary",
            "bg-secondary text-foreground border border-transparent": variant === "secondary",
            "border border-muted bg-transparent text-foreground": variant === "outline",
            "bg-transparent text-foreground": variant === "ghost",
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-8 text-base": size === "md",
            "h-14 px-10 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {/* Hover Background Expansion */}
        <span className={cn(
          "absolute inset-0 w-full h-full scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
          {
            "bg-[#D4B06A]": variant === "primary",
            "bg-[#1E2136]": variant === "secondary",
            "bg-secondary": variant === "outline",
            "bg-secondary/50": variant === "ghost",
          }
        )} />
        
        {/* Content Wrapper for shift */}
        <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
          {children}
        </span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
