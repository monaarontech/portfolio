"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowDown, ArrowUpRight, Sparkles, MapPin, CheckCircle2, Terminal } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#090A0F] border-b border-white/5"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FF2A4D]/20 via-[#990011]/15 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-crimson/10 blur-[120px] pointer-events-none -z-10" />

      {/* Massive Editorial Background Typography ("PORTFOLIO") */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none -z-10 opacity-30 sm:opacity-40">
        <h1 className="text-[15vw] font-black uppercase tracking-tighter text-[#FF2A4D]/30 leading-none text-center whitespace-nowrap">
          PORTFOLIO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
            <Terminal className="w-3.5 h-3.5 text-[#FF2A4D]" />
            <span>FULL-STACK DEVELOPER &amp; CIVIC TECH ARCHITECT</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300">{PERSONAL_INFO.availability}</span>
          </div>
        </div>

        {/* Hero Grid: Left Content - Center Portrait - Right Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Headline & Intro (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10">
            <div className="space-y-2">
              <span className="text-[#FF2A4D] font-mono font-medium text-lg tracking-wider block">
                Hello, I&apos;m
              </span>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                MON AARON
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#FF2A4D]">
                  MARCELO
                </span>
              </h1>
            </div>

            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-mono font-semibold text-[#FF2A4D] uppercase tracking-wider">
                Full-Stack Developer &amp; IT Scholar
              </h2>
              <p className="text-sm text-gray-300 font-medium">
                BS Information Technology • NEUST Atate Campus
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-300/90 leading-relaxed max-w-lg">
              {PERSONAL_INFO.statement} Lead developer behind{" "}
              <span className="text-white font-semibold underline decoration-[#FF2A4D] decoration-2 underline-offset-4">
                One Palayan-Kalinga Hub
              </span>
              , modernizing public social welfare delivery for CSWDO Palayan City.
            </p>

            {/* Location & Status Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141722] border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#FF2A4D]" />
                <span>Palayan City, Nueva Ecija</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141722] border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ISO/IEC 25010 Evaluated</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#flagship"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF2A4D] via-[#E50914] to-[#C00] shadow-xl shadow-[#FF2A4D]/25 hover:shadow-[#FF2A4D]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Palayan Hub</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-200 bg-[#141722] border border-white/10 hover:border-white/20 hover:text-white transition-all hover:bg-white/5"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Center Column: Portrait Composition (4 cols) */}
          <div className="lg:col-span-4 flex justify-center items-center z-10 py-4">
            <div
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/15 bg-gradient-to-b from-[#181B26] to-[#0D0F16] shadow-2xl transition-transform duration-300 ease-out group"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
              }}
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent z-10 pointer-events-none opacity-80" />
              <div className="absolute inset-0 bg-[#FF2A4D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

              {/* Real User Photograph */}
              <Image
                src="/images/portrait.jpg"
                alt="Mon Aaron Marcelo - Full-Stack Developer & IT Scholar"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Corner Accent Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#090A0F]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#FF2A4D]" />
                <span>Mon Aaron Marcelo</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-2xl bg-[#090A0F]/90 backdrop-blur-md border border-white/10 text-xs">
                <div className="flex items-center justify-between text-gray-300 mb-1">
                  <span className="font-semibold text-white">Full-Stack Civic Engineer</span>
                  <span className="text-[#FF2A4D] font-mono">2026</span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-1">
                  Nueva Ecija University of Science and Technology
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Stats & Impact Metrics (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-4 z-10">
            {/* Inspirational Quote Card */}
            <div className="p-4 rounded-2xl bg-[#12141F] border border-white/10 relative overflow-hidden group hover:border-[#FF2A4D]/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF2A4D]/10 blur-2xl rounded-full" />
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MISSION STATEMENT</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                &ldquo;Transforming municipal bureaucracy into seamless, dignified digital public services.&rdquo;
              </p>
            </div>

            {/* Metrics Stack */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#10121A] border border-white/10 hover:border-[#FF2A4D]/40 transition-all group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#FF2A4D] transition-colors font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator & Coordinates */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">COORDINATES:</span>
            <span className="text-white font-mono">{PERSONAL_INFO.coordinates}</span>
          </div>

          <a
            href="#about"
            className="flex items-center gap-2 text-gray-400 hover:text-[#FF2A4D] transition-colors group cursor-pointer"
          >
            <span>SCROLL TO EXPLORE STORY</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#FF2A4D]" />
          </a>

          <div className="hidden sm:block text-gray-400">
            <span>REPOSITORY: </span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#FF2A4D] hover:underline"
            >
              github.com/monaarontech
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
