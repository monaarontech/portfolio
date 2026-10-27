"use client";

import React, { useState, useEffect } from "react";
import { Bot, Sparkles } from "lucide-react";
import { playHoverSound, playClickSound } from "@/utils/soundEffects";

const COMPANION_QUOTES = [
  "BEEP BOOP! Ready to inspect Aaron's code?",
  "Zero bugs allowed in Palayan City!",
  "Psst... press [`~`] on your keyboard for a secret terminal!",
  "Try clicking Aaron's photo 5 times... just saying!",
  "ISO/IEC 25010 compliant and proud!",
  "Remember: commit early, commit often!",
];

export default function CyberCompanion() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isWinking, setIsWinking] = useState(false);

  // Track cursor for companion eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 3;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 3);
      setEyePos({
        x: Math.max(-4, Math.min(4, dx * 4)),
        y: Math.max(-3, Math.min(3, dy * 3)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Periodic blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 220);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    playClickSound();
    setQuoteIndex((prev) => (prev + 1) % COMPANION_QUOTES.length);
    setShowSpeech(true);
    setTimeout(() => setShowSpeech(false), 4500);
  };

  return (
    <div className="relative inline-block select-none z-30">
      {/* Speech Bubble */}
      {showSpeech && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 min-w-[200px] max-w-[260px] p-2.5 rounded-xl bg-[#141624] border border-[#FF2A4D]/50 text-white font-mono text-[11px] shadow-2xl shadow-[#FF2A4D]/20 animate-in fade-in zoom-in-95 duration-200">
          <p className="leading-snug text-center">
            {COMPANION_QUOTES[quoteIndex]}
          </p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#141624] border-r border-b border-[#FF2A4D]/50 rotate-45" />
        </div>
      )}

      {/* Robot Companion Body */}
      <button
        onClick={handleClick}
        onMouseEnter={playHoverSound}
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11131E]/90 hover:bg-[#161828] border border-white/10 hover:border-[#FF2A4D]/60 transition-all shadow-lg hover:scale-105 active:scale-95"
        title="Byte the Dev Companion — Click me!"
      >
        {/* Animated Bot Face */}
        <div className="relative w-6 h-6 rounded-lg bg-gradient-to-br from-[#1C1F2E] to-[#0D0F18] border border-[#FF2A4D]/40 flex items-center justify-center overflow-hidden">
          {/* Eyes */}
          <div
            className="flex items-center gap-1 transition-transform duration-75"
            style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
          >
            <div
              className={`w-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00F0FF] transition-all ${
                isWinking ? "h-0.5" : "h-1.5"
              }`}
            />
            <div
              className={`w-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00F0FF] transition-all ${
                isWinking ? "h-0.5" : "h-1.5"
              }`}
            />
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-gray-300 group-hover:text-white">
          Byte <span className="text-[#FF2A4D] text-[9px]">BOT</span>
        </span>

        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </button>
    </div>
  );
}
