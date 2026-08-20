"use client";

import * as React from "react";
import { useDemoSession } from "@/context/DemoSessionContext";
import { LogOut, Settings, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function UserMenu() {
  const { demoUser, logoutDemo } = useDemoSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!demoUser) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A86A] rounded-full pl-1.5 pr-4 py-1.5 bg-[#12151C]/80 border border-[#2A2E37] hover:border-[#D4A86A]/50 hover:bg-[#12151C] transition-all duration-300 shadow-sm w-full md:w-auto justify-center md:justify-start"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User account menu"
      >
        <div className="w-8 h-8 rounded-full bg-[#D4A86A]/10 border border-[#D4A86A]/30 flex items-center justify-center text-[#D4A86A] font-serif font-medium shadow-[0_0_15px_rgba(212,168,106,0.15)]">
          {demoUser.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-[#F2E7D5]">
          {demoUser.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#8A8F99] transition-transform duration-300 ml-1 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-56 bg-primary border border-muted/50 rounded-xl shadow-2xl overflow-hidden z-50 origin-top-right backdrop-blur-xl"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-4 border-b border-muted/50 bg-secondary/30">
              <p className="text-sm font-medium text-foreground truncate" role="none">{demoUser.name}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5" role="none">{demoUser.email}</p>
            </div>
            <div className="p-2" role="none">
              <button 
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors text-left"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Account Settings
              </button>
              <button 
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-left mt-1"
                role="menuitem"
                onClick={() => {
                  logoutDemo();
                  setIsOpen(false);
                }}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
