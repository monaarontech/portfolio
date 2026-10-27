"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUpRight, Sparkles, MapPin, CheckCircle2, Terminal, ArrowDown, Gamepad2 } from "lucide-react";
import CyberCompanion from "@/components/CyberCompanion";
import { openSecretTerminal } from "@/components/SecretTerminal";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";
import { triggerConfetti } from "@/utils/confetti";
import { playClickSound, playVictorySound } from "@/utils/soundEffects";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [portraitClicks, setPortraitClicks] = useState(0);
  const [showEggToast, setShowEggToast] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Konami Code global listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      setKonamiProgress((prev) => {
        const next = [...prev, key].slice(-KONAMI_CODE.length);
        if (next.join(",").toLowerCase() === KONAMI_CODE.join(",").toLowerCase()) {
          triggerAchievementUnlock("secret_agent");
          playVictorySound();
          triggerConfetti();
          setShowEggToast(true);
          setTimeout(() => setShowEggToast(false), 5000);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Portrait 5-click easter egg handler
  const handlePortraitClick = () => {
    playClickSound();
    const nextCount = portraitClicks + 1;
    setPortraitClicks(nextCount);

    if (nextCount === 5) {
      triggerAchievementUnlock("secret_agent");
      playVictorySound();
      triggerConfetti();
      setShowEggToast(true);
      setTimeout(() => setShowEggToast(false), 6000);
      setPortraitClicks(0);
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between overflow-hidden bg-[#07070A] border-b border-white/5 select-none"
    >
      {/* Easter Egg Celebration Toast */}
      {showEggToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-[#B30010] text-white shadow-2xl shadow-[#FF2A4D]/50 border border-white/20 flex items-center gap-3">
            <span className="text-2xl animate-bounce">🎉</span>
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider">
                EASTER EGG UNLOCKED!
              </p>
              <p className="text-xs text-white/90">
                You discovered Aaron&apos;s secret developer backdoor!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ambient Lighting & Floating Interactive Cyber Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#FF2A4D]/25 via-[#990011]/15 to-transparent blur-[160px] pointer-events-none -z-20" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FF2A4D]/10 blur-[130px] pointer-events-none -z-20" />

      {/* Floating Interactive Glowing Orb that reacts to cursor */}
      <div
        className="absolute top-1/3 right-12 w-44 h-44 rounded-full bg-gradient-to-br from-[#FF2A4D]/20 to-purple-600/10 blur-2xl pointer-events-none transition-transform duration-300 ease-out -z-10"
        style={{
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -20}px)`,
        }}
      />

      {/* Top Meta Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-2 mb-2">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-gray-400 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF2A4D] inline-block" />
            <span className="text-white font-semibold">FULL-STACK DEVELOPER</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">CIVIC TECH ARCHITECT</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Bot Companion */}
            <CyberCompanion />

            <div className="hidden sm:flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stage: Giant "PORTFOLIO" + Cutout Portrait Layering */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-end lg:min-h-[780px] my-auto">
        {/* Layer 1: Giant Editorial Background Typography ("PORTFOLIO") */}
        <div className="absolute inset-x-0 top-0 sm:top-2 z-0 flex justify-center pointer-events-none select-none">
          <h1 className="text-[22vw] sm:text-[20vw] lg:text-[18vw] font-black uppercase tracking-tighter text-[#E50914] leading-none opacity-90 text-center font-display drop-shadow-[0_15px_35px_rgba(229,9,20,0.35)]">
            PORTFOLIO
          </h1>
        </div>

        {/* Layer 2: Dominant Center Portrait Overlapping "PORTFOLIO" Text */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-0 z-20 justify-center items-end">
          <div
            onClick={handlePortraitClick}
            className="relative w-[580px] xl:w-[680px] 2xl:w-[740px] aspect-[896/1200] max-h-[760px] xl:max-h-[820px] transition-transform duration-200 ease-out cursor-pointer group"
            style={{
              transform: `translateX(${mousePos.x * 14}px) translateY(${mousePos.y * 7}px)`,
            }}
            title="Mon Aaron Marcelo (Click 5 times for a secret!)"
          >
            {/* Radial ambient glow behind portrait */}
            <div className="absolute inset-0 bg-[#FF2A4D]/20 blur-3xl rounded-full scale-90 -z-10 group-hover:scale-100 transition-transform" />

            {/* The Authentic Cutout Portrait (Real face & eyes 100% preserved) */}
            <Image
              src="/images/portrait-cutout.png"
              alt="Mon Aaron Marcelo - Full-Stack Developer & Civic Tech Architect"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              sizes="(max-width: 1280px) 680px, 740px"
            />

            {/* Bottom fade blending seamlessly into section background */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07070A] via-[#07070A]/80 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Layer 3: Left Narrative + Right Metrics (Clean Overlap Grid) */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12 sm:pt-20 pb-4">
          {/* Left Column: Personal Intro (4 cols on lg) */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6 pb-6 text-left">
            <div className="space-y-1">
              <span className="text-[#FF2A4D] font-serif italic text-3xl sm:text-4xl tracking-wide block">
                Hello, I&apos;m
              </span>
              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
                MON AARON
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#FF2A4D]">
                  MARCELO
                </span>
              </h2>
            </div>

            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-mono font-bold text-[#FF2A4D] uppercase tracking-wider">
                FULL-STACK DEVELOPER &amp; IT SCHOLAR
              </p>
              <p className="text-xs text-gray-400 font-mono">
                NEUST Atate Campus • Palayan City
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm font-normal">
              I design and build robust, user-focused web platforms combining high-integrity relational databases with cinematic frontends. Lead architect of{" "}
              <strong className="text-white font-semibold underline decoration-[#FF2A4D] decoration-2 underline-offset-4">
                One Palayan-Kalinga Hub
              </strong>
              .
            </p>

            {/* Easter Egg Clue Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-400">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2A4D]" />
              <span>Press <strong className="text-white font-bold">[`~`]</strong> for Terminal</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#flagship"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-[#B30010] shadow-xl shadow-[#FF2A4D]/30 hover:shadow-[#FF2A4D]/50 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#playground"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:border-amber-400/50 hover:bg-amber-500/20 transition-all"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Play Mini-Games</span>
              </a>

              <button
                onClick={openSecretTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 bg-[#12141D] border border-white/10 hover:border-white/20 hover:text-white transition-all hover:bg-white/5"
                title="Launch Terminal Console (Shortcut: `)"
              >
                <Terminal className="w-3.5 h-3.5 text-[#FF2A4D]" />
                <span className="hidden sm:inline">Terminal</span>
              </button>
            </div>
          </div>

          {/* Mobile Center Portrait (Visible only below lg) */}
          <div className="lg:hidden flex justify-center items-end relative z-20 my-2">
            <div
              onClick={handlePortraitClick}
              className="relative w-[340px] sm:w-[420px] aspect-[896/1200] max-h-[580px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#FF2A4D]/20 blur-2xl rounded-full scale-90 -z-10" />
              <Image
                src="/images/portrait-cutout.png"
                alt="Mon Aaron Marcelo"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 768px) 340px, 420px"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07070A] via-[#07070A]/80 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Center Spacer on Desktop */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 h-1 pointer-events-none" />

          {/* Right Column: Mission Statement & Vertical Metrics (4 cols on lg) */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6 pb-6 text-left lg:text-right flex flex-col justify-end lg:items-end z-30">
            {/* Sparkle callout */}
            <div className="flex items-center lg:justify-end gap-2 text-xs font-mono text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2A4D] shrink-0" />
              <span className="italic max-w-[240px] leading-snug">
                Turning ideas into powerful, resilient digital experiences.
              </span>
            </div>

            {/* Vertical Stat Stack */}
            <div className="space-y-4 pt-2 w-full max-w-[280px]">
              <div className="flex items-center justify-between lg:justify-end gap-4 pb-3 border-b border-white/10 group">
                <span className="text-xs font-mono uppercase text-gray-400 group-hover:text-white transition-colors">
                  YEARS CODING
                </span>
                <span className="text-3xl font-black font-mono text-white group-hover:text-[#FF2A4D] transition-colors">
                  3+
                </span>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-4 pb-3 border-b border-white/10 group">
                <span className="text-xs font-mono uppercase text-gray-400 group-hover:text-white transition-colors">
                  SYSTEMS ARCHITECTED
                </span>
                <span className="text-3xl font-black font-mono text-white group-hover:text-[#FF2A4D] transition-colors">
                  5+
                </span>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-4 pb-3 border-b border-white/10 group">
                <span className="text-xs font-mono uppercase text-gray-400 group-hover:text-white transition-colors">
                  CIVIC RECORDS HANDLED
                </span>
                <span className="text-3xl font-black font-mono text-white group-hover:text-[#FF2A4D] transition-colors">
                  10K+
                </span>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-4 pb-2 group">
                <span className="text-xs font-mono uppercase text-gray-400 group-hover:text-white transition-colors">
                  ISO/IEC 25010 STANDARD
                </span>
                <span className="text-3xl font-black font-mono text-emerald-400 transition-colors">
                  100%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Coordinates & Scroll Down Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-6 mt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500">
        <div className="flex items-center gap-2">
          <span>COORDINATES:</span>
          <span className="text-gray-300">{PERSONAL_INFO.coordinates}</span>
        </div>

        <a
          href="#flagship"
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF2A4D] transition-colors group cursor-pointer"
        >
          <span>SCROLL TO EXPLORE WORK</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#FF2A4D]" />
        </a>

        <div className="hidden sm:flex items-center gap-2 text-gray-400">
          <span>GITHUB:</span>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="text-[#FF2A4D] hover:underline"
          >
            monaarontech
          </a>
        </div>
      </div>
    </section>
  );
}
