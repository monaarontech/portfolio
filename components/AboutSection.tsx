"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  GraduationCap,
  Code2,
  Target,
  Sparkles,
  Zap,
  Shield,
  Layers,
  CheckCircle,
  Crosshair,
  Flame,
  Volume2,
  VolumeX,
} from "lucide-react";
import { playClickSound, playHoverSound, playVictorySound } from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";
import { triggerConfetti } from "@/utils/confetti";

export default function AboutSection() {
  const [isIronMan, setIsIronMan] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleIronMan = (e: React.MouseEvent) => {
    playClickSound();
    const next = !isIronMan;
    setIsIronMan(next);

    if (next) {
      playVictorySound();
      triggerConfetti(e.clientX, e.clientY);
      triggerAchievementUnlock("secret_agent");
    }
  };

  return (
    <section id="about" className="py-24 bg-[#090A0F] relative overflow-hidden border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF2A4D]/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>01 / IDENTITY &amp; PASSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-display">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#FF2A4D]">MON AARON</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            Junior Developer &amp; Web Developer crafting modern digital experiences from simple ideas to scalable reality.
          </p>
        </div>

        {/* Content Layout: Left Story + Right Interactive Portrait & Transformation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & Professional Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Main Greeting Heading */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.intro}
              </h3>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-[#FF2A4D]/15 border border-[#FF2A4D]/30 text-xs font-mono font-bold text-[#FF2A4D]">
                  Junior Developer
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-400">
                  Web Developer
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  NEUST Scholar
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
                  Technology Enthusiast
                </span>
              </div>
            </div>

            {/* Structured User Description */}
            <div className="space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              <p>
                I&apos;m an aspiring <strong className="text-white font-semibold">Junior Developer</strong> with a passion for building modern, functional, and user-friendly web applications. I enjoy exploring new technologies, solving problems through programming, and continuously improving my development skills.
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                I believe that every great application starts with a simple idea and becomes meaningful through creativity, dedication, and continuous learning.
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                At the <span className="text-[#FF2A4D] font-medium">Nueva Ecija University of Science and Technology (NEUST Atate Campus)</span>, I served as lead developer of <strong className="text-white">One Palayan-Kalinga Hub</strong>, translating public welfare requirements into an ISO/IEC 25010-evaluated digital architecture that serves thousands of municipal residents.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#12141F] border border-white/5 hover:border-[#FF2A4D]/40 transition-colors">
                <Code2 className="w-5 h-5 text-[#FF2A4D] mb-2" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Modern Frontend</h4>
                <p className="text-[11px] text-gray-400 mt-1">React, Next.js, TypeScript &amp; Tailwind CSS</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141F] border border-white/5 hover:border-cyan-400/40 transition-colors">
                <Zap className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Backend Systems</h4>
                <p className="text-[11px] text-gray-400 mt-1">PHP 8, MySQL Relational Normalization &amp; REST</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141F] border border-white/5 hover:border-emerald-400/40 transition-colors">
                <Shield className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">ISO 25010 Quality</h4>
                <p className="text-[11px] text-gray-400 mt-1">Evaluated for Security, Usability &amp; Reliability</p>
              </div>
            </div>

            {/* Quote Pill */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181A28] to-[#12141F] border-l-4 border-[#FF2A4D] text-xs font-mono text-gray-300 italic">
              &ldquo;{PERSONAL_INFO.pullQuote}&rdquo;
            </div>
          </div>

          {/* Right Column: Professional Portrait + Interactive Iron Man Transformation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onMouseEnter={() => {
                setIsHovered(true);
                playHoverSound();
              }}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleToggleIronMan}
              className="group relative w-full max-w-[340px] aspect-[419/559] rounded-3xl p-2 bg-gradient-to-b from-white/15 via-white/5 to-transparent border-2 border-white/20 hover:border-[#FF2A4D]/60 shadow-2xl shadow-black/80 cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              title="Click me for a superhero transformation!"
            >
              {/* Inner Card Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A0C14]">
                {/* 1. Mon Aaron's Professional Suit Portrait */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isIronMan ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
                  }`}
                >
                  <Image
                    src="/images/mon-aaron-suit.png"
                    alt="Mon Aaron Marcelo - Professional Suit Portrait"
                    fill
                    priority
                    className="object-contain object-bottom"
                    sizes="340px"
                  />
                  {/* Bottom Vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0C14] via-[#0A0C14]/70 to-transparent" />
                </div>

                {/* 2. Iron Man Armored Transformation */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isIronMan ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-95"
                  }`}
                >
                  <Image
                    src="/images/ironman-suit.jpg"
                    alt="Iron Man Armored Superhero Transformation"
                    fill
                    className="object-cover object-center"
                    sizes="340px"
                  />

                  {/* Glowing Arc Reactor Effect on Chest */}
                  <div className="absolute top-[46%] left-[62%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan-300/40 blur-md animate-pulse pointer-events-none" />
                  <div className="absolute top-[46%] left-[62%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-[0_0_20px_#00F0FF,0_0_40px_#00F0FF] animate-ping pointer-events-none opacity-80" />

                  {/* Repulsor Hand Glow */}
                  <div className="absolute top-[29%] left-[17%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyan-300/30 blur-sm animate-pulse pointer-events-none" />

                  {/* Golden-Red Superhero Armor Vignette */}
                  <div className="absolute inset-0 border-2 border-amber-400/40 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(255,42,77,0.3)]" />
                </div>

                {/* 3. Futuristic HUD Holographic Overlay (Active on Hover or in Iron Man Mode) */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                    isHovered || isIronMan ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Crosshair Target Reticle */}
                  <div className="absolute inset-x-4 top-4 flex justify-between items-center text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-amber-400/30">
                    <div className="flex items-center gap-1.5">
                      <Crosshair className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>{isIronMan ? "MARK VII: PROTOCOL ACTIVE" : "SCANNING DEVELOPER..."}</span>
                    </div>
                    <span className="text-cyan-400">{isIronMan ? "100% POWER" : "TARGET LOCKED"}</span>
                  </div>

                  {/* Corner HUD Brackets */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

                  {/* Scan Line Laser Effect */}
                  <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[hudScan_3s_linear_infinite]" />
                </div>

                {/* Bottom Overlay Info Tag */}
                <div className="absolute inset-x-3 bottom-3 p-3 rounded-xl bg-[#0E1018]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold font-mono text-white tracking-wide">
                      {isIronMan ? "TONY STARK / MARK VII" : "MON AARON MARCELO"}
                    </h5>
                    <p className="text-[10px] font-mono text-[#FF2A4D]">
                      {isIronMan ? "Full Armor Engaged" : "Junior Developer • NEUST"}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                    {isIronMan ? "HERO MODE" : "DEV MODE"}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Toggle Hint */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <button
                onClick={handleToggleIronMan}
                className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141624] border border-[#FF2A4D]/40 hover:border-[#FF2A4D] text-xs font-mono text-white shadow-lg transition-all hover:scale-105"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>{isIronMan ? "Revert to Aaron's Suit Portrait" : "Click Portrait for Iron Man Suit-Up!"}</span>
              </button>
              <p className="text-[10px] font-mono text-gray-500">
                Interactive Easter Egg • Hover for HUD scanner
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hudScan {
          0% {
            top: 5%;
          }
          50% {
            top: 90%;
          }
          100% {
            top: 5%;
          }
        }
      `}</style>
    </section>
  );
}
