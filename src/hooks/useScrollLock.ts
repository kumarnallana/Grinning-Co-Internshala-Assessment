import { useEffect } from "react";

// Track active locks to handle overlapping modals
let activeLocks = 0;
let originalStyle: { overflow: string; paddingRight: string } | null = null;

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock) return;

    if (activeLocks === 0) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store original styles
      originalStyle = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      // Apply locks
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    activeLocks++;

    return () => {
      activeLocks--;
      
      if (activeLocks === 0 && originalStyle) {
        // Restore original styles
        document.body.style.overflow = originalStyle.overflow;
        document.body.style.paddingRight = originalStyle.paddingRight;
        originalStyle = null;
      }
    };
  }, [lock]);
}
