"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, RotateCcw, Trophy, AlertTriangle, CheckCircle2 } from "lucide-react";
import { playClickSound, playErrorSound, playVictorySound, playScoreSound } from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";
import { triggerConfetti } from "@/utils/confetti";

type State = "idle" | "waiting" | "ready" | "early" | "result";

export default function ReactionTestGame() {
  const [state, setState] = useState<State>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const timerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Load personal best on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("reflex_test_best");
      if (stored) setBestTime(parseInt(stored, 10));
    } catch {
      // ignore
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
    };
  }, []);

  const handleStart = () => {
    triggerAchievementUnlock("game_starter");
    playClickSound();
    setState("waiting");
    setReactionTime(null);

    // Random delay between 1500ms and 4200ms
    const delay = Math.floor(Math.random() * 2700) + 1500;

    timerTimeoutRef.current = setTimeout(() => {
      setState("ready");
      startTimeRef.current = performance.now();
      playScoreSound();
    }, delay);
  };

  const handleClickArea = () => {
    if (state === "idle") {
      handleStart();
    } else if (state === "waiting") {
      // Clicked too early!
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
      setState("early");
      playErrorSound();
    } else if (state === "ready") {
      // Valid reaction click!
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setState("result");

      // Check achievement (< 250ms)
      if (elapsed < 250) {
        triggerAchievementUnlock("reflex_god");
        playVictorySound();
        triggerConfetti();
      } else {
        playScoreSound();
      }

      // Update personal best
      try {
        const stored = localStorage.getItem("reflex_test_best");
        const currentBest = stored ? parseInt(stored, 10) : 99999;
        if (elapsed < currentBest) {
          setBestTime(elapsed);
          localStorage.setItem("reflex_test_best", elapsed.toString());
        }
      } catch {
        // ignore
      }
    } else if (state === "early" || state === "result") {
      handleStart();
    }
  };

  const getRating = (ms: number) => {
    if (ms < 190) return { label: "GODLIKE REFLEXES", desc: "Kernel-level execution speed!", color: "text-amber-400" };
    if (ms < 250) return { label: "SENIOR FULL-STACK", desc: "Blazing fast production-grade reflexes!", color: "text-emerald-400" };
    if (ms < 320) return { label: "PRODUCTION READY", desc: "Solid and reliable response time.", color: "text-cyan-400" };
    return { label: "COFFEE BREAK NEEDED", desc: "A few sips of caffeine will boost your ms!", color: "text-gray-300" };
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-[#0A0C14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col select-none">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-[#11131E] border-b border-white/10 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 text-[#FF2A4D] font-bold">
          <Zap className="w-4 h-4" />
          <span>DEVELOPER REACTION TEST</span>
        </div>

        {bestTime && (
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>BEST: {bestTime} ms</span>
          </div>
        )}
      </div>

      {/* Interactive Reflex Viewport */}
      <div
        onClick={handleClickArea}
        className={`relative aspect-[16/10] w-full flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors duration-200 ${
          state === "idle"
            ? "bg-[#090A10] hover:bg-[#0D0F17]"
            : state === "waiting"
            ? "bg-[#7A1515] animate-pulse"
            : state === "ready"
            ? "bg-[#0E8A55]"
            : state === "early"
            ? "bg-[#8A3B0E]"
            : "bg-[#0B0D18]"
        }`}
      >
        {/* State: IDLE */}
        {state === "idle" && (
          <div className="space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-[#FF2A4D]/20 border border-[#FF2A4D]/40 flex items-center justify-center text-3xl mx-auto text-[#FF2A4D] shadow-lg shadow-[#FF2A4D]/20">
              ⚡
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display">
                Test Your Developer Reflexes
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-mono mt-2 leading-relaxed">
                When you click to start, wait for the screen to turn <strong className="text-emerald-400">BRIGHT GREEN</strong>, then click as fast as humanly possible!
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF2A4D] to-[#E50914] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF2A4D]/30">
                Click Anywhere To Begin
              </span>
            </div>
          </div>
        )}

        {/* State: WAITING (Red/Amber) */}
        {state === "waiting" && (
          <div className="space-y-3 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl mx-auto animate-ping">
              🔴
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
              WAIT FOR GREEN...
            </h3>
            <p className="text-xs sm:text-sm text-rose-200 font-mono">
              Do NOT click yet! Hold your finger ready.
            </p>
          </div>
        )}

        {/* State: READY (Green flash) */}
        {state === "ready" && (
          <div className="space-y-3 pointer-events-none animate-in zoom-in-95 duration-100">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl mx-auto shadow-2xl">
              🚀
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-display drop-shadow-lg">
              CLICK NOW!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-mono font-bold tracking-widest uppercase">
              TAP / CLICK ANYWHERE!
            </p>
          </div>
        )}

        {/* State: EARLY CLICK */}
        {state === "early" && (
          <div className="space-y-3 max-w-md pointer-events-none">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mx-auto text-amber-300">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display">
              Too Early!
            </h3>
            <p className="text-xs sm:text-sm text-amber-200 font-mono leading-relaxed">
              You deployed to production before the unit tests turned green!
            </p>
            <p className="text-xs font-mono text-white/80 pt-2 underline">
              Click anywhere to try again
            </p>
          </div>
        )}

        {/* State: RESULT */}
        {state === "result" && reactionTime !== null && (
          <div className="space-y-3 max-w-md pointer-events-none">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                {reactionTime} <span className="text-xl font-normal text-emerald-400">ms</span>
              </p>
              <h4 className={`text-sm sm:text-base font-bold font-mono uppercase tracking-wider mt-2 ${getRating(reactionTime).color}`}>
                {getRating(reactionTime).label}
              </h4>
              <p className="text-xs text-gray-300 font-mono mt-1">
                {getRating(reactionTime).desc}
              </p>
              {reactionTime < 250 && (
                <p className="text-xs text-amber-400 font-bold font-mono pt-2">
                  ⚡ Trophy Unlocked: Kernel Reflexes (&lt; 250ms)!
                </p>
              )}
            </div>
            <p className="text-xs font-mono text-gray-400 pt-3">
              Click anywhere to test again
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-[#0D0F18] border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
        <span>Target: Under 250ms for Senior Developer rating</span>
        <button
          onClick={handleStart}
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
