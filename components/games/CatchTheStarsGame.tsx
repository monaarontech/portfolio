"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { playScoreSound, playErrorSound, playVictorySound, getSoundMuted, setSoundMuted } from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";
import { triggerConfetti } from "@/utils/confetti";

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: "star" | "diamond" | "bug";
  size: number;
}

export default function CatchTheStarsGame() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);
  const [muted, setMuted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const paddleRef = useRef({ x: 300, width: 90, height: 18, speed: 12 });
  const itemsRef = useRef<FallingItem[]>([]);
  const scoreRef = useRef(0);
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  // Load high score and sound state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("catch_stars_highscore");
      if (stored) setHighScore(parseInt(stored, 10));
      setMuted(getSoundMuted());
    } catch {
      // ignore
    }
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
  };

  const handleGameOver = useCallback(() => {
    setGameState("gameover");
    cancelAnimationFrame(animFrameRef.current);

    const finalScore = scoreRef.current;
    if (finalScore >= 15) {
      triggerAchievementUnlock("star_catcher");
      playVictorySound();
      triggerConfetti();
    }

    try {
      const stored = localStorage.getItem("catch_stars_highscore");
      const currentBest = stored ? parseInt(stored, 10) : 0;
      if (finalScore > currentBest) {
        setHighScore(finalScore);
        localStorage.setItem("catch_stars_highscore", finalScore.toString());
      }
    } catch {
      // ignore
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, handleGameOver]);

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const startGame = () => {
    triggerAchievementUnlock("game_starter");
    setGameState("playing");
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(30);
    itemsRef.current = [];
    paddleRef.current.x = 270;
  };

  // Mouse / Touch paddle movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing" || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const clientX = (e.clientX - rect.left) * scaleX;
    paddleRef.current.x = Math.max(
      0,
      Math.min(canvasRef.current.width - paddleRef.current.width, clientX - paddleRef.current.width / 2)
    );
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing" || !canvasRef.current || !e.touches[0]) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const clientX = (e.touches[0].clientX - rect.left) * scaleX;
    paddleRef.current.x = Math.max(
      0,
      Math.min(canvasRef.current.width - paddleRef.current.width, clientX - paddleRef.current.width / 2)
    );
  };

  // Main 60fps Game Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nextItemId = 1;
    let spawnCounter = 0;

    const loop = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Handle keyboard paddle movement
      if (keysRef.current.left) {
        paddleRef.current.x = Math.max(0, paddleRef.current.x - paddleRef.current.speed);
      }
      if (keysRef.current.right) {
        paddleRef.current.x = Math.min(
          width - paddleRef.current.width,
          paddleRef.current.x + paddleRef.current.speed
        );
      }

      // Clear frame with cyber grid background
      ctx.fillStyle = "#0A0C14";
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = "rgba(255, 42, 77, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Spawn falling items
      spawnCounter++;
      if (spawnCounter > 28) {
        spawnCounter = 0;
        const rand = Math.random();
        const type: "star" | "diamond" | "bug" =
          rand < 0.65 ? "star" : rand < 0.85 ? "diamond" : "bug";
        const speed = Math.random() * 2.5 + 2.5 + (30 - timeLeft) * 0.08;

        itemsRef.current.push({
          id: nextItemId++,
          x: Math.random() * (width - 40) + 20,
          y: -20,
          speed,
          type,
          size: type === "diamond" ? 18 : type === "star" ? 16 : 14,
        });
      }

      // Update & Render falling items
      const paddle = paddleRef.current;
      const paddleY = height - 32;

      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        const item = itemsRef.current[i];
        item.y += item.speed;

        // Collision detection with paddle
        if (
          item.y + item.size >= paddleY &&
          item.y - item.size <= paddleY + paddle.height &&
          item.x >= paddle.x - 10 &&
          item.x <= paddle.x + paddle.width + 10
        ) {
          // Hit paddle!
          if (item.type === "star") {
            scoreRef.current += 10;
            playScoreSound();
          } else if (item.type === "diamond") {
            scoreRef.current += 25;
            playScoreSound();
          } else if (item.type === "bug") {
            scoreRef.current = Math.max(0, scoreRef.current - 15);
            playErrorSound();
          }
          setScore(scoreRef.current);
          itemsRef.current.splice(i, 1);
          continue;
        }

        // Off screen bottom
        if (item.y > height + 20) {
          itemsRef.current.splice(i, 1);
          continue;
        }

        // Draw item
        ctx.save();
        ctx.translate(item.x, item.y);

        if (item.type === "star") {
          // Draw Glowing Yellow Star
          ctx.fillStyle = "#FFD700";
          ctx.shadowColor = "#FFD700";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          for (let p = 0; p < 5; p++) {
            ctx.lineTo(
              Math.cos(((18 + p * 72) * Math.PI) / 180) * 11,
              -Math.sin(((18 + p * 72) * Math.PI) / 180) * 11
            );
            ctx.lineTo(
              Math.cos(((54 + p * 72) * Math.PI) / 180) * 5,
              -Math.sin(((54 + p * 72) * Math.PI) / 180) * 5
            );
          }
          ctx.closePath();
          ctx.fill();
        } else if (item.type === "diamond") {
          // Draw Neon Cyan Git Diamond
          ctx.fillStyle = "#00F0FF";
          ctx.shadowColor = "#00F0FF";
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.moveTo(0, -11);
          ctx.lineTo(10, 0);
          ctx.lineTo(0, 11);
          ctx.lineTo(-10, 0);
          ctx.closePath();
          ctx.fill();
        } else if (item.type === "bug") {
          // Draw Red Glitch Bug
          ctx.fillStyle = "#FF2A4D";
          ctx.shadowColor = "#FF2A4D";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          // Draw antennas
          ctx.strokeStyle = "#FF2A4D";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-4, -6);
          ctx.lineTo(-8, -12);
          ctx.moveTo(4, -6);
          ctx.lineTo(8, -12);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Draw Player Paddle
      ctx.save();
      ctx.translate(paddle.x, paddleY);
      // Paddle glow
      ctx.shadowColor = "#FF2A4D";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "#FF2A4D";
      ctx.beginPath();
      ctx.roundRect(0, 0, paddle.width, paddle.height, 8);
      ctx.fill();

      // Inner high-tech core
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(4, 3, paddle.width - 8, paddle.height - 6, 4);
      ctx.fill();

      // Text label inside paddle
      ctx.fillStyle = "#0A0C14";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("< AARON_DEV >", paddle.width / 2, paddle.height - 6);
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState, timeLeft]);

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-[#0A0C14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Game Header Bar */}
      <div className="px-4 py-3 bg-[#11131E] border-b border-white/10 flex items-center justify-between font-mono text-xs select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#FF2A4D] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>CATCH THE STARS</span>
          </div>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">
            TIME: <strong className="text-amber-400 font-bold">{timeLeft}s</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">SCORE:</span>
            <span className="text-white font-bold text-sm">{score}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-emerald-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>BEST: {highScore}</span>
          </div>

          <button
            onClick={toggleMute}
            className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/5 transition-colors"
            title={muted ? "Unmute Audio" : "Mute Audio"}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Game Canvas Viewport */}
      <div className="relative aspect-[16/10] w-full bg-[#07080E] overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="w-full h-full block cursor-ew-resize touch-none"
        />

        {/* Start Screen Overlay */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF2A4D] to-[#990011] flex items-center justify-center text-3xl shadow-xl shadow-[#FF2A4D]/40 mb-4 animate-bounce">
              ⭐
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display">
              Catch The Falling Stars
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mt-2 font-mono leading-relaxed">
              Move your developer paddle to catch golden stars (<span className="text-amber-400">+10</span>) and git commits (<span className="text-cyan-400">+25</span>). Dodge the bugs (<span className="text-rose-400">-15</span>)!
            </p>
            <p className="text-[11px] font-mono text-gray-400 mt-2">
              Controls: Keyboard [A/D] or [←/→] or drag with mouse/finger
            </p>
            <button
              onClick={startGame}
              className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-[#B30010] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#FF2A4D]/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Arcade Session</span>
            </button>
          </div>
        )}

        {/* Game Over Screen Overlay */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#181926] border border-white/10 flex items-center justify-center text-2xl mb-3 shadow-lg">
              {score >= 25 ? "🏆" : "👾"}
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display">
              Time&apos;s Up!
            </h3>
            <div className="my-3 space-y-1 font-mono">
              <p className="text-3xl font-black text-[#FF2A4D]">{score} PTS</p>
              <p className="text-xs text-gray-400">
                Personal Best: <strong className="text-emerald-400">{highScore} pts</strong>
              </p>
              {score >= 15 ? (
                <p className="text-xs text-amber-400 font-bold pt-1">
                  ⭐ Achievement Unlocked: Cosmic Star Catcher!
                </p>
              ) : (
                <p className="text-xs text-gray-400 pt-1">
                  Tip: Score 15+ to unlock the Cosmic Star Catcher trophy!
                </p>
              )}
            </div>
            <button
              onClick={startGame}
              className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch Controls Bar */}
      <div className="sm:hidden px-4 py-2.5 bg-[#0E101A] border-t border-white/10 flex items-center justify-between gap-4">
        <button
          onTouchStart={() => (keysRef.current.left = true)}
          onTouchEnd={() => (keysRef.current.left = false)}
          className="flex-1 py-3 rounded-xl bg-white/5 active:bg-[#FF2A4D]/30 border border-white/10 flex items-center justify-center text-gray-300 active:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          TAP / HOLD
        </span>
        <button
          onTouchStart={() => (keysRef.current.right = true)}
          onTouchEnd={() => (keysRef.current.right = false)}
          className="flex-1 py-3 rounded-xl bg-white/5 active:bg-[#FF2A4D]/30 border border-white/10 flex items-center justify-center text-gray-300 active:text-white"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
