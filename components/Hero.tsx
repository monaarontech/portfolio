"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUpRight, Sparkles, MapPin, CheckCircle2, ArrowDown, Globe, Terminal, UserCheck } from "lucide-react";
import InteractiveIdCard from "@/components/InteractiveIdCard";
import CyberCompanion from "@/components/CyberCompanion";
import { openSecretTerminal } from "@/components/SecretTerminal";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#07070A] border-b border-white/5 select-none"
    >
      {/* 1. Subtle Ambient Background Lighting (Modern Minimalist Deep Glows) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#FF2A4D]/15 via-purple-600/10 to-transparent blur-[160px] pointer-events-none -z-20" />
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/10 via-[#00F0FF]/5 to-transparent blur-[140px] pointer-events-none -z-20" />

      {/* Subtle modern cyber grid line accents */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* 2. Top Meta Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-gray-400 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF2A4D] inline-block animate-pulse" />
            <span className="text-white font-semibold">JUNIOR DEVELOPER</span>
            <span className="text-gray-600">|</span>
            <span className="text-[#00F0FF] font-semibold">WEB DEVELOPER</span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline text-gray-400">NEUST</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Cyber Companion Bot */}
            <CyberCompanion />

            <div className="hidden sm:flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hero Main Content Stage: Left Narrative + Right 3D Hanging ID Card */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Personal Brand, Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Greeting Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2A4D]" />
              <span>{PERSONAL_INFO.intro}</span>
            </div>

            {/* Prominent Name & Professional Role */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight uppercase leading-[0.92] font-display">
                MON AARON
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#FF2A4D]">
                  MARCELO
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="px-3 py-1 rounded-xl bg-[#FF2A4D]/15 border border-[#FF2A4D]/30 text-xs sm:text-sm font-mono font-bold text-[#FF2A4D] uppercase tracking-wider">
                  JUNIOR DEVELOPER
                </span>
                <span className="text-gray-600">•</span>
                <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-xs sm:text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  WEB DEVELOPER
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-xs sm:text-sm font-mono text-gray-400">
                  NEUST Atate Campus
                </span>
              </div>
            </div>

            {/* Tagline & Personal Statement */}
            <div className="space-y-2 max-w-xl">
              <p className="text-lg sm:text-xl font-medium text-white tracking-tight">
                &ldquo;{PERSONAL_INFO.tagline}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-mono">
                Aspiring Web Developer and technology enthusiast dedicated to building modern, functional, and user-friendly web applications. Lead developer of{" "}
                <strong className="text-white font-semibold underline decoration-[#FF2A4D] decoration-2 underline-offset-4">
                  One Palayan-Kalinga Hub
                </strong>
                .
              </p>
            </div>

            {/* Interactive Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#flagship"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-[#B30010] shadow-xl shadow-[#FF2A4D]/35 hover:shadow-[#FF2A4D]/55 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Explore My Portfolio</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#social"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-200 bg-[#12141F] border border-white/10 hover:border-[#00F0FF]/50 hover:text-white transition-all hover:bg-white/5"
              >
                <Globe className="w-4 h-4 text-[#00F0FF]" />
                <span>Find Me</span>
              </a>

              <button
                onClick={openSecretTerminal}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 hover:border-white/25 hover:text-white transition-all"
                title="Launch Terminal Console (Shortcut: ` or ~)"
              >
                <Terminal className="w-3.5 h-3.5 text-[#FF2A4D]" />
                <span className="hidden sm:inline">Console</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg border-t border-white/5 font-mono">
              <div>
                <span className="text-2xl font-black text-white">3+</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Years Coding</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#FF2A4D]">5+</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Systems Built</p>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-400">100%</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">ISO 25010 Quality</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Hanging ID Card with Realistic Swinging Lanyard (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <InteractiveIdCard />
          </div>
        </div>
      </div>

      {/* 4. Bottom Coordinates & Scroll Explorer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500">
        <div className="flex items-center gap-2">
          <span>COORDINATES:</span>
          <span className="text-gray-300">{PERSONAL_INFO.coordinates}</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">PALAYAN CITY, NUEVA ECIJA</span>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 text-gray-400 hover:text-[#FF2A4D] transition-colors group cursor-pointer"
        >
          <span>SCROLL TO DISCOVER</span>
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
