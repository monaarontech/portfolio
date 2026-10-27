"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GraduationCap, Code2, Target, HeartHandshake, Compass, CheckCircle, Calendar, Milestone } from "lucide-react";
import { playClickSound, playHoverSound } from "@/utils/soundEffects";

const MILESTONES = [
  {
    year: "2022",
    title: "Foundations & Logic",
    desc: "Began BSIT journey at NEUST Atate. Mastered algorithmic problem solving, structured programming, and discrete mathematics.",
  },
  {
    year: "2024",
    title: "Relational Modeling",
    desc: "Engineered scalable normalized database schemas in MySQL, built secure PHP backend services, and built dynamic web architectures.",
  },
  {
    year: "2025",
    title: "Flagship Civic Architect",
    desc: "Designed and implemented One Palayan-Kalinga Hub for CSWDO Palayan City, automating AICS assistance and social housing workflows.",
  },
  {
    year: "2026",
    title: "ISO Standard & Modern Stack",
    desc: "Achieved 100% compliance across ISO/IEC 25010:2023 quality dimensions. Scaled to Next.js 14, TypeScript, and cinematic UX.",
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"philosophy" | "academic" | "approach">("philosophy");
  const [activeMilestone, setActiveMilestone] = useState(2); // default 2025

  const handleMilestoneClick = (idx: number) => {
    playClickSound();
    setActiveMilestone(idx);
  };

  return (
    <section id="about" className="py-24 bg-[#090A0F] relative overflow-hidden border-b border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF2A4D]/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>01 / IDENTITY &amp; MINDSET</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">MON AARON</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            Bridging civic empathy with software engineering to deliver systems people can rely on every single day.
          </p>
        </div>

        {/* Content Layout: Left Story + Right Tabs & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Biography (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              <p>
                I am an aspiring <strong className="text-white font-semibold">Full-Stack Software Developer</strong> and{" "}
                <strong className="text-white font-semibold">Information Technology scholar</strong> at the{" "}
                <span className="text-[#FF2A4D]">Nueva Ecija University of Science and Technology (NEUST Atate Campus)</span>, based in Palayan City, Philippines.
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                My passion lies at the intersection of practical civic engineering, robust relational database modeling, and fluid interactive frontend systems. Rather than building static mockups, I gravitate toward engineering real-world solutions that eliminate systemic inefficiencies — replacing fragile paper logs, long queues, and fragmented records with scalable, audited web platforms.
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                As the lead developer of <strong className="text-white">One Palayan-Kalinga Hub</strong>, I worked directly with frontline municipal welfare workers to translate intricate public service guidelines (AICS crisis relief, socialized housing beneficiary placement, and PWD/Senior pensions) into an ISO/IEC 25010-evaluated digital architecture.
              </p>
            </div>

            {/* Interactive Tab Selector */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#12141F] border border-white/10">
                <button
                  onClick={() => setActiveTab("philosophy")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    activeTab === "philosophy"
                      ? "bg-[#FF2A4D] text-white shadow-lg shadow-[#FF2A4D]/25 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>My Philosophy</span>
                </button>
                <button
                  onClick={() => setActiveTab("academic")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    activeTab === "academic"
                      ? "bg-[#FF2A4D] text-white shadow-lg shadow-[#FF2A4D]/25 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Journey</span>
                </button>
                <button
                  onClick={() => setActiveTab("approach")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    activeTab === "approach"
                      ? "bg-[#FF2A4D] text-white shadow-lg shadow-[#FF2A4D]/25 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>How I Build</span>
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="p-6 rounded-2xl bg-[#10121A] border border-white/10 relative overflow-hidden transition-all duration-300">
                {activeTab === "philosophy" && (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-[#FF2A4D]" />
                      Technology in Service of People
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      I believe software should respect human time and dignity. When a mother needs emergency medical assistance or a senior citizen applies for social pension, they should not be subjected to hours in the heat or endless paperwork. Code has the power to bring clarity, transparency, and fairness to public services.
                    </p>
                  </div>
                )}

                {activeTab === "academic" && (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#FF2A4D]" />
                      NEUST Atate Campus • BSIT Scholar
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      At Nueva Ecija University of Science and Technology, my coursework and capstone research have centered on enterprise system architecture, relational database normalization, web security, and formal software quality standards (ISO/IEC 25010:2023). Every semester has reinforced the balance between theoretical engineering and applied impact.
                    </p>
                  </div>
                )}

                {activeTab === "approach" && (
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#FF2A4D]" />
                      Resilient, Security-First Engineering
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      My approach starts with normalized database schemas and strict data validation before writing the first line of frontend code. I prioritize SQL-injection defense, rate-limiting, bcrypt hashing, and accessible semantic HTML that works seamlessly on desktop workstations and low-bandwidth mobile devices.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Timeline Milestones */}
            <div className="p-6 rounded-2xl bg-[#10121A] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider font-semibold">
                  <Milestone className="w-4 h-4" />
                  <span>DEVELOPER LEARNING JOURNEY</span>
                </div>
                <span className="text-[11px] font-mono text-gray-500">Click a milestone year</span>
              </div>

              {/* Year Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {MILESTONES.map((m, idx) => (
                  <button
                    key={m.year}
                    onClick={() => handleMilestoneClick(idx)}
                    onMouseEnter={playHoverSound}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                      activeMilestone === idx
                        ? "bg-[#FF2A4D] text-white shadow-lg shadow-[#FF2A4D]/30"
                        : "bg-[#141624] text-gray-400 hover:text-white border border-white/5"
                    }`}
                  >
                    {m.year}
                  </button>
                ))}
              </div>

              {/* Active Milestone Card */}
              <div className="p-4 rounded-xl bg-[#141624]/60 border border-white/5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{MILESTONES[activeMilestone].year} • {MILESTONES[activeMilestone].title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-mono">
                  {MILESTONES[activeMilestone].desc}
                </p>
              </div>
            </div>

            {/* Quick Facts List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#12141F] border border-white/5">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Full-Stack &amp; Civic Tech</h4>
                  <p className="text-[11px] text-gray-400">PHP 8, MySQL, Next.js, TypeScript, REST</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#12141F] border border-white/5">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Security &amp; Data Privacy</h4>
                  <p className="text-[11px] text-gray-400">RA 10173 Compliance, MFA/OTP, RBAC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pull Quote Card & Secondary Portrait Composition (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pull Quote Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1C1418] via-[#12141D] to-[#0D0F17] border border-[#FF2A4D]/30 relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF2A4D]/15 blur-3xl rounded-full" />
              <span className="text-6xl text-[#FF2A4D]/40 font-serif leading-none block select-none">“</span>
              <p className="text-lg sm:text-xl font-medium text-white leading-relaxed -mt-4 relative z-10">
                {PERSONAL_INFO.pullQuote}
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{PERSONAL_INFO.name}</div>
                  <div className="text-xs font-mono text-gray-400">Full-Stack Software Developer</div>
                </div>
                <div className="font-mono text-xs px-2.5 py-1 rounded bg-[#FF2A4D]/20 text-[#FF2A4D] font-bold">
                  NEUST IT
                </div>
              </div>
            </div>

            {/* University & Campus Card */}
            <div className="p-6 rounded-3xl bg-[#10121A] border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF2A4D]/10 border border-[#FF2A4D]/20 flex items-center justify-center text-[#FF2A4D]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Nueva Ecija University of Science and Technology</h4>
                  <p className="text-xs font-mono text-gray-400">Atate Campus • Palayan City, Nueva Ecija</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Program:</span>
                  <span className="text-white font-medium">BS Information Technology</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Capstone Specialization:</span>
                  <span className="text-white font-medium">Municipal Social Welfare Enterprise System</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Evaluation Framework:</span>
                  <span className="text-[#FF2A4D] font-mono font-medium">ISO/IEC 25010:2023 Standard</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-medium">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
