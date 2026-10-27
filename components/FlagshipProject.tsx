"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FLAGSHIP_PROJECT } from "@/data/portfolioData";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Calendar,
  Users,
  ChevronRight,
  Maximize2,
  Sparkles,
  Lock,
} from "lucide-react";

export default function FlagshipProject() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"modules" | "architecture" | "evaluation">("modules");

  const currentImage = FLAGSHIP_PROJECT.galleryImages[selectedImageIndex];

  return (
    <section id="flagship" className="py-24 bg-[#0A0C13] relative overflow-hidden border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FF2A4D]/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>02 / FLAGSHIP CAPSTONE SHOWCASE</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl sm:text-6xl font-black font-mono text-[#FF2A4D]/60 select-none">
                {FLAGSHIP_PROJECT.number}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                ONE PALAYAN-KALINGA <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#FF2A4D]">HUB</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-[#FF2A4D]/15 border border-[#FF2A4D]/30 text-[#FF2A4D] font-medium">
              Civic Tech Capstone
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-medium">
              CSWDO Palayan City
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
              ISO/IEC 25010 Evaluated
            </span>
          </div>
        </div>

        {/* Flagship Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left: Project Narrative & Context (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {FLAGSHIP_PROJECT.tagline}
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {FLAGSHIP_PROJECT.description}
            </p>

            {/* Problem & Solution Cards */}
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#12141F] border border-red-500/20 relative overflow-hidden">
                <div className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider mb-1">
                  The Problem Solved
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {FLAGSHIP_PROJECT.problem}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141F] border border-emerald-500/20 relative overflow-hidden">
                <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  The Engineered Solution
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {FLAGSHIP_PROJECT.solution}
                </p>
              </div>
            </div>

            {/* Verified Tech Stack Pills */}
            <div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
                Verified Production Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {FLAGSHIP_PROJECT.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#141724] border border-white/10 text-xs font-mono text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={FLAGSHIP_PROJECT.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF2A4D] to-[#E50914] shadow-lg shadow-[#FF2A4D]/25 hover:shadow-[#FF2A4D]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-gray-300 bg-[#141724] border border-white/10 hover:border-white/20 hover:text-white transition-all"
              >
                <span>Request Capstone Demo</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Browser Mockup with Real Screenshots (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Browser Frame */}
            <div className="rounded-2xl overflow-hidden bg-[#0F1118] border border-white/15 shadow-2xl transition-all duration-300 hover:border-[#FF2A4D]/40 group">
              {/* Browser Header Bar */}
              <div className="px-4 py-3 bg-[#161822] border-b border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                <div className="flex-1 max-w-sm mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-md bg-[#0A0C13] border border-white/10 text-[11px] font-mono text-gray-400 select-none truncate">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">https://cswdo.palayancity.gov.ph/kalinga-hub/</span>
                </div>

                <button
                  onClick={() => setFullscreenImage(currentImage.url)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Expand to Fullscreen"
                  aria-label="Expand screenshot"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Screenshot Display Area */}
              <div className="relative aspect-[16/10] bg-[#0A0C12] overflow-hidden">
                <Image
                  src={currentImage.url}
                  alt={currentImage.caption}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />

                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#090A0F]/90 backdrop-blur-md border border-white/10 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#FF2A4D]" />
                    <span className="font-semibold text-white truncate">{currentImage.caption}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-gray-300 shrink-0">
                    {currentImage.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Switcher */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-gray-400 flex items-center justify-between">
                <span>SELECT SYSTEM MODULE PREVIEW:</span>
                <span className="text-[#FF2A4D]">
                  {selectedImageIndex + 1} of {FLAGSHIP_PROJECT.galleryImages.length}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {FLAGSHIP_PROJECT.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#FF2A4D] ring-2 ring-[#FF2A4D]/30 scale-105"
                        : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                    }`}
                    title={img.caption}
                  >
                    <Image
                      src={img.url}
                      alt={img.caption}
                      fill
                      className="object-cover object-top"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Tabs: Core Modules / Architecture / ISO 25010 */}
        <div className="p-8 rounded-3xl bg-[#0F111A] border border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF2A4D]" />
              <h4 className="text-base font-bold text-white">DEEP-DIVE SYSTEM SPECIFICATIONS</h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("modules")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === "modules"
                    ? "bg-[#FF2A4D] text-white font-semibold shadow-md shadow-[#FF2A4D]/20"
                    : "bg-[#141622] text-gray-400 hover:text-white"
                }`}
              >
                Key Implemented Modules
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === "architecture"
                    ? "bg-[#FF2A4D] text-white font-semibold shadow-md shadow-[#FF2A4D]/20"
                    : "bg-[#141622] text-gray-400 hover:text-white"
                }`}
              >
                Security &amp; Relational Architecture
              </button>
              <button
                onClick={() => setActiveTab("evaluation")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeTab === "evaluation"
                    ? "bg-[#FF2A4D] text-white font-semibold shadow-md shadow-[#FF2A4D]/20"
                    : "bg-[#141622] text-gray-400 hover:text-white"
                }`}
              >
                ISO/IEC 25010 Quality Standard
              </button>
            </div>
          </div>

          {/* Tab 1: Implemented Modules */}
          {activeTab === "modules" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FLAGSHIP_PROJECT.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-[#141622] border border-white/5 hover:border-white/15 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FF2A4D] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Architecture & Security */}
          {activeTab === "architecture" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#FF2A4D] uppercase">01 / Relational Normalization</div>
                <h5 className="text-sm font-semibold text-white">3NF Schema Design</h5>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Strict foreign key constraints linking residents to appointments, AICS disbursements, and housing allocations prevent duplicate benefit distribution across departments.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#FF2A4D] uppercase">02 / Authentication &amp; RBAC</div>
                <h5 className="text-sm font-semibold text-white">Multi-Tier Access Control</h5>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Bcrypt salted password hashing, automated session expiration, and role-segregated portals for Municipal Administrators, CSWDO Caseworkers, and Registered Citizens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#FF2A4D] uppercase">03 / Real-Time Data Pipeline</div>
                <h5 className="text-sm font-semibold text-white">Server-Sent Events (SSE)</h5>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Persistent HTTP notification streams broadcast live appointment approval events and schedule reschedules directly to citizen devices without polling overhead.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: ISO/IEC 25010 Quality Evaluation */}
          {activeTab === "evaluation" && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                As documented in the formal capstone thesis manuscript, <strong className="text-white">One Palayan-Kalinga Hub</strong> was formally evaluated across the eight international software product quality characteristics of <strong className="text-[#FF2A4D]">ISO/IEC 25010:2023</strong> by panels of IT Experts, CSWDO Municipal Personnel, and Resident Evaluators:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#141622] border border-white/5">
                  <div className="text-emerald-400 font-bold">EXCELLENT</div>
                  <div className="text-gray-300 mt-1">Functional Suitability</div>
                </div>
                <div className="p-3 rounded-xl bg-[#141622] border border-white/5">
                  <div className="text-emerald-400 font-bold">VERIFIED</div>
                  <div className="text-gray-300 mt-1">Performance Efficiency</div>
                </div>
                <div className="p-3 rounded-xl bg-[#141622] border border-white/5">
                  <div className="text-emerald-400 font-bold">ACCESSIBLE</div>
                  <div className="text-gray-300 mt-1">Usability &amp; Inclusivity</div>
                </div>
                <div className="p-3 rounded-xl bg-[#141622] border border-white/5">
                  <div className="text-emerald-400 font-bold">HARDENED</div>
                  <div className="text-gray-300 mt-1">Security &amp; Privacy</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] aspect-[16/10]">
            <Image
              src={fullscreenImage}
              alt="Fullscreen preview"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/10 text-white font-mono text-xs hover:bg-white/20"
          >
            CLOSE [ESC]
          </button>
        </div>
      )}
    </section>
  );
}
