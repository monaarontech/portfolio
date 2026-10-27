"use client";

import React, { useState, useEffect } from "react";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let hasExploredAll = false;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);

      // If user reaches 95% of the page, unlock the "explorer" achievement!
      if (progress > 95 && !hasExploredAll) {
        hasExploredAll = true;
        triggerAchievementUnlock("explorer");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-amber-400 transition-all duration-75 shadow-[0_0_10px_#FF2A4D]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
