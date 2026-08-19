import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { INGREDIENTS } from "@/data/ingredients";

export function useActiveBotanical(sectionRef: React.RefObject<HTMLElement>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = INGREDIENTS.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate the mapped index internally using useTransform
  // This makes sure it maps 0-1 progress to 0-(total - 1)
  const mappedIndex = useTransform(scrollYProgress, [0, 1], [0, total - 1]);

  useMotionValueEvent(mappedIndex, "change", (latest) => {
    const next = Math.round(latest);
    if (next !== activeIndex) {
      setActiveIndex(next);
    }
  });

  // Mobile Touch Driver
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  
  const onTouchStart = (e: React.TouchEvent | TouchEvent) => {
    touchStartX.current = "touches" in e ? e.touches[0].clientX : 0;
    touchStartY.current = "touches" in e ? e.touches[0].clientY : 0;
  };

  const onTouchEnd = (e: React.TouchEvent | TouchEvent) => {
    if (!("changedTouches" in e)) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    
    // Ignore mostly vertical swipes or small jitter
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    
    setActiveIndex((i) => Math.min(total - 1, Math.max(0, i + (deltaX < 0 ? 1 : -1))));
  };

  return { 
    activeIndex, 
    botanical: INGREDIENTS[activeIndex], 
    total,
    handlers: {
      onTouchStart,
      onTouchEnd
    }
  };
}
