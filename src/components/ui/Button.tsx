import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative group inline-flex items-center justify-center overflow-hidden rounded-sm text-sm font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight disabled:pointer-events-none disabled:opacity-50",
          {
            "h-10 px-4 py-2": size === "md",
            "h-9 rounded-sm px-3": size === "sm",
            "h-14 rounded-sm px-8 text-base": size === "lg",
            "bg-highlight text-primary hover:bg-[#D4B06A] hover:shadow-highlight/20": variant === "primary",
            "bg-secondary text-foreground hover:bg-[#1E2136] hover:shadow-secondary/20": variant === "secondary",
            "border border-muted-foreground/30 bg-transparent text-foreground hover:bg-muted-foreground/10 hover:shadow-foreground/5": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground shadow-none hover:shadow-none hover:-translate-y-0": variant === "ghost",
          },
          className
        )}
        {...props}
      >
        {/* Hover Background Expansion */}
        <span className={cn(
          "absolute inset-0 w-full h-full scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
          {
            "bg-[#D4B06A]": variant === "primary",
            "bg-[#1E2136]": variant === "secondary",
            "bg-muted-foreground/10": variant === "outline",
            "hidden": variant === "ghost",
          }
        )} />
        
        {/* Content Wrapper for shift */}
        <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
