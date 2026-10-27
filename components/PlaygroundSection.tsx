"use client";

import React, { useState } from "react";
import { Gamepad2, Sparkles, Zap, Brain, Volume2, VolumeX, Trophy } from "lucide-react";
import CatchTheStarsGame from "@/components/games/CatchTheStarsGame";
import ReactionTestGame from "@/components/games/ReactionTestGame";
import MemoryCardGame from "@/components/games/MemoryCardGame";
import { playClickSound, getSoundMuted, setSoundMuted } from "@/utils/soundEffects";

type ActiveGame = "stars" | "reflex" | "memory";

export default function PlaygroundSection() {
  const [activeGame, setActiveGame] = useState<ActiveGame>("stars");
  const [isMuted, setIsMuted] = useState(false);

  const handleTabSwitch = (game: ActiveGame) => {
    playClickSound();
    setActiveGame(game);
  };

  const toggleGlobalSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    setSoundMuted(next);
    playClickSound();
  };

  return (
    <section
      id="playground"
      className="relative py-24 sm:py-32 bg-[#06070B] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF2A4D]/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2A4D]/10 border border-[#FF2A4D]/30 text-xs font-mono text-[#FF2A4D]">
            <Gamepad2 className="w-4 h-4" />
            <span>INTERACTIVE ARCADE LAB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase">
            Creative Developer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-amber-400">
              Playground
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-mono leading-relaxed">
            Take a break from architectural inspection. Test your millisecond reflexes, catch golden commits, and solve the software memory challenge. Engineered with pure React &amp; native Web Audio.
          </p>
        </div>

        {/* Game Navigation Tabs & Sound Controller */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[#0D0F18] border border-white/10 gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => handleTabSwitch("stars")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeGame === "stars"
                  ? "bg-[#FF2A4D] text-white shadow-lg shadow-[#FF2A4D]/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catch Stars</span>
            </button>

            <button
              onClick={() => handleTabSwitch("reflex")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeGame === "reflex"
                  ? "bg-[#FF2A4D] text-white shadow-lg shadow-[#FF2A4D]/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Reflex Test</span>
            </button>

            <button
              onClick={() => handleTabSwitch("memory")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeGame === "memory"
                  ? "bg-[#FF2A4D] text-white shadow-lg shadow-[#FF2A4D]/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Memory Cards</span>
            </button>
          </div>

          {/* Quick Sound Toggle */}
          <button
            onClick={toggleGlobalSound}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D0F18] border border-white/10 text-xs font-mono text-gray-300 hover:text-white hover:border-white/20 transition-all ml-auto"
            title={isMuted ? "Unmute Arcade Audio" : "Mute Arcade Audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Audio Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Audio Active</span>
              </>
            )}
          </button>
        </div>

        {/* Active Game Component */}
        <div className="w-full">
          {activeGame === "stars" && <CatchTheStarsGame />}
          {activeGame === "reflex" && <ReactionTestGame />}
          {activeGame === "memory" && <MemoryCardGame />}
        </div>
      </div>
    </section>
  );
}
