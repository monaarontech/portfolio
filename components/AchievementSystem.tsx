"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Trophy, X, Sparkles, CheckCircle2, RotateCcw, Award } from "lucide-react";
import { triggerConfetti } from "@/utils/confetti";
import { playVictorySound } from "@/utils/soundEffects";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "Discovery" | "Gaming" | "Reflexes" | "Secret";
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: "explorer",
    title: "Portfolio Navigator",
    description: "Explored all main architectural sections of the portfolio.",
    icon: "🧭",
    category: "Discovery",
  },
  {
    id: "game_starter",
    title: "Arcade Novice",
    description: "Stepped up and played a mini-game in the Developer Playground.",
    icon: "🎮",
    category: "Gaming",
  },
  {
    id: "star_catcher",
    title: "Cosmic Star Catcher",
    description: "Caught 15+ golden commits and stars before time ran out.",
    icon: "⭐",
    category: "Gaming",
  },
  {
    id: "reflex_god",
    title: "Kernel Reflexes",
    description: "Clocked a reaction time under 250ms on the developer reflex test.",
    icon: "⚡",
    category: "Reflexes",
  },
  {
    id: "memory_master",
    title: "Tech Synapse Master",
    description: "Matched all 8 software technology pairs in the Memory Challenge.",
    icon: "🧠",
    category: "Gaming",
  },
  {
    id: "secret_agent",
    title: "Zero-Day Explorer",
    description: "Discovered a hidden Easter egg in the portfolio matrix.",
    icon: "🕵️",
    category: "Secret",
  },
];

const STORAGE_KEY = "portfolio_achievements_v1";

// Global dispatcher to unlock an achievement from any component
export function triggerAchievementUnlock(id: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("portfolio:achievement_unlocked", { detail: { id } }));
}

export default function AchievementSystem() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUnlockedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUnlock = useCallback(
    (id: string) => {
      setUnlockedIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }

        const ach = ACHIEVEMENTS_LIST.find((a) => a.id === id);
        if (ach) {
          setActiveToast(ach);
          playVictorySound();
          triggerConfetti();
        }
        return next;
      });
    },
    []
  );

  useEffect(() => {
    const listener = (e: Event) => {
      const custom = e as CustomEvent<{ id: string }>;
      if (custom.detail?.id) {
        handleUnlock(custom.detail.id);
      }
    };
    window.addEventListener("portfolio:achievement_unlocked", listener);
    return () => window.removeEventListener("portfolio:achievement_unlocked", listener);
  }, [handleUnlock]);

  // Auto-dismiss toast after 5s
  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 5500);
    return () => clearTimeout(timer);
  }, [activeToast]);

  const resetAchievements = () => {
    if (confirm("Reset all unlocked achievements?")) {
      setUnlockedIds([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setIsDrawerOpen(false);
    }
  };

  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS_LIST.length;

  return (
    <>
      {/* Floating Trophy Pill Indicator (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#12141D]/90 backdrop-blur-md border border-white/10 hover:border-[#FF2A4D]/50 text-xs font-mono text-gray-300 hover:text-white shadow-xl shadow-black/60 transition-all hover:scale-105"
          title="View Portfolio Achievements & Mini-Game Trophies"
        >
          <Trophy className="w-4 h-4 text-[#FF2A4D] group-hover:rotate-12 transition-transform" />
          <span className="font-bold">
            {unlockedCount}/{totalCount}
          </span>
          <span className="hidden sm:inline text-gray-400 text-[11px] uppercase tracking-wider">
            Trophies
          </span>
        </button>
      </div>

      {/* Achievement Unlocked Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-20 left-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181824] to-[#12141D] border-2 border-[#FF2A4D]/80 shadow-2xl shadow-[#FF2A4D]/30 backdrop-blur-xl relative overflow-hidden">
            {/* Ambient shimmer */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2A4D]/20 blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF2A4D] to-[#990011] flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-[#FF2A4D]/40">
                {activeToast.icon}
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF2A4D] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  <span>Achievement Unlocked!</span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight truncate mt-0.5">
                  {activeToast.title}
                </h4>
                <p className="text-xs text-gray-300 leading-snug mt-1">
                  {activeToast.description}
                </p>
              </div>

              <button
                onClick={() => setActiveToast(null)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trophy Drawer Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0E1017] border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#141724]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF2A4D]/20 border border-[#FF2A4D]/30 flex items-center justify-center text-[#FF2A4D]">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    Developer Achievements
                    <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-[#FF2A4D]/20 text-[#FF2A4D] border border-[#FF2A4D]/30">
                      {unlockedCount} / {totalCount} Unlocked
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Play games, discover secrets, and explore the architecture.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Achievement List */}
            <div className="p-6 space-y-3 overflow-y-auto flex-1 divide-y divide-white/5">
              {ACHIEVEMENTS_LIST.map((ach) => {
                const isUnlocked = unlockedIds.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`pt-3 first:pt-0 flex items-start gap-4 transition-opacity ${
                      isUnlocked ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${
                        isUnlocked
                          ? "bg-gradient-to-br from-[#FF2A4D]/30 to-[#990011]/20 border-[#FF2A4D]/50 text-white"
                          : "bg-white/5 border-white/10 grayscale"
                      }`}
                    >
                      {ach.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h5
                          className={`text-sm font-bold tracking-tight ${
                            isUnlocked ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {ach.title}
                        </h5>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                          {ach.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mt-1">
                        {ach.description}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      {isUnlocked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-600 border-dashed" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#12141D] border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Saved locally in browser</span>
              {unlockedCount > 0 && (
                <button
                  onClick={resetAchievements}
                  className="inline-flex items-center gap-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Progress</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
