"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Database,
  GitBranch,
  Server,
  Zap,
  ShieldCheck,
  Palette,
  Terminal,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { playCardFlipSound, playScoreSound, playVictorySound, playErrorSound } from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";
import { triggerConfetti } from "@/utils/confetti";

interface CardItem {
  id: number;
  pairId: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const TECH_CARDS = [
  { pairId: "react", name: "React", icon: <Code2 className="w-6 h-6" />, color: "text-cyan-400" },
  { pairId: "next", name: "Next.js", icon: <Zap className="w-6 h-6" />, color: "text-white" },
  { pairId: "ts", name: "TypeScript", icon: <Terminal className="w-6 h-6" />, color: "text-blue-400" },
  { pairId: "sql", name: "MySQL", icon: <Database className="w-6 h-6" />, color: "text-emerald-400" },
  { pairId: "git", name: "Git", icon: <GitBranch className="w-6 h-6" />, color: "text-orange-400" },
  { pairId: "php", name: "PHP", icon: <Server className="w-6 h-6" />, color: "text-indigo-400" },
  { pairId: "tailwind", name: "Tailwind", icon: <Palette className="w-6 h-6" />, color: "text-sky-400" },
  { pairId: "iso", name: "ISO 25010", icon: <ShieldCheck className="w-6 h-6" />, color: "text-[#FF2A4D]" },
];

function shuffleDeck(): CardItem[] {
  const deck: CardItem[] = [];
  let id = 1;
  TECH_CARDS.forEach((item) => {
    // 2 cards for each pair
    deck.push({ ...item, id: id++ });
    deck.push({ ...item, id: id++ });
  });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function MemoryCardGame() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Initialize deck on mount
  useEffect(() => {
    resetGame();
  }, []);

  // Timer
  useEffect(() => {
    if (!isPlaying || isWon) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  const resetGame = () => {
    setCards(shuffleDeck());
    setFlippedIds([]);
    setMatchedIds([]);
    setMoves(0);
    setSeconds(0);
    setIsPlaying(false);
    setIsWon(false);
  };

  const handleCardClick = (card: CardItem) => {
    // Already matched or flipped or two currently flipping
    if (matchedIds.includes(card.id) || flippedIds.includes(card.id) || flippedIds.length >= 2) {
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
      triggerAchievementUnlock("game_starter");
    }

    playCardFlipSound();
    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // MATCH!
        playScoreSound();
        const nextMatched = [...matchedIds, firstId, secondId];
        setMatchedIds(nextMatched);
        setFlippedIds([]);

        // Check victory
        if (nextMatched.length === cards.length) {
          setIsWon(true);
          playVictorySound();
          triggerConfetti();
          triggerAchievementUnlock("memory_master");
        }
      } else {
        // MISMATCH
        setTimeout(() => {
          playErrorSound();
          setFlippedIds([]);
        }, 750);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${rem < 10 ? "0" : ""}${rem}`;
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-[#0A0C14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col select-none">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-[#11131E] border-b border-white/10 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 text-[#FF2A4D] font-bold">
          <Sparkles className="w-4 h-4" />
          <span>TECH MEMORY CHALLENGE</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-gray-400">
            TIME: <strong className="text-amber-400 font-bold">{formatTime(seconds)}</strong>
          </div>
          <div className="text-gray-400">
            MOVES: <strong className="text-white font-bold">{moves}</strong>
          </div>
          <div className="text-emerald-400 font-bold hidden sm:block">
            PAIRS: {matchedIds.length / 2} / 8
          </div>
        </div>
      </div>

      {/* Cards 4x4 Grid Viewport */}
      <div className="p-4 sm:p-6 bg-[#07080E] relative">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-lg mx-auto">
          {cards.map((card) => {
            const isFlipped = flippedIds.includes(card.id) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`relative aspect-square rounded-xl p-1 transition-all duration-300 transform perspective-1000 ${
                  isFlipped ? "rotate-y-180" : "hover:scale-105 active:scale-95"
                }`}
                style={{ transformStyle: "preserve-3d" }}
                aria-label={`Tech card ${card.name}`}
              >
                {/* Front (Visible when flipped) */}
                <div
                  className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${
                    isMatched
                      ? "bg-emerald-950/40 border-emerald-500/70 shadow-lg shadow-emerald-500/20"
                      : isFlipped
                      ? "bg-[#161825] border-white/20 shadow-lg"
                      : "opacity-0"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className={card.color}>{card.icon}</div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-200 truncate max-w-[90%]">
                    {card.name}
                  </span>
                </div>

                {/* Back (Hidden state) */}
                <div
                  className={`absolute inset-0 rounded-xl flex items-center justify-center border transition-all ${
                    !isFlipped
                      ? "bg-gradient-to-br from-[#121422] to-[#0D0F18] border-white/10 hover:border-[#FF2A4D]/50 shadow-md"
                      : "opacity-0"
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="font-mono text-base font-black text-[#FF2A4D]/60 select-none">
                    M/A
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Victory Screen Overlay */}
        {isWon && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/30 mb-3 animate-bounce">
              🧠
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
              Memory Challenge Conquered!
            </h3>
            <div className="my-3 space-y-1 font-mono text-sm">
              <p className="text-gray-300">
                Completed in <strong className="text-emerald-400">{formatTime(seconds)}</strong> with{" "}
                <strong className="text-white">{moves} moves</strong>.
              </p>
              <p className="text-amber-400 font-bold text-xs pt-2">
                🏆 Trophy Unlocked: Tech Synapse Master!
              </p>
            </div>
            <button
              onClick={resetGame}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-[#B30010] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#FF2A4D]/40 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Shuffle &amp; Play Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-[#0D0F18] border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
        <span>Click cards to find matching developer technologies</span>
        <button
          onClick={resetGame}
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Deck</span>
        </button>
      </div>
    </div>
  );
}
