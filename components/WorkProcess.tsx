"use client";

import React from "react";
import { WORK_PROCESS } from "@/data/portfolioData";
import { Search, Compass, Palette, Code, CheckCircle, ArrowRight } from "lucide-react";

export default function WorkProcess() {
  const stepIcons = [Search, Compass, Palette, Code, CheckCircle];

  return (
    <section id="process" className="py-24 bg-[#0A0C13] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>06 / METHODOLOGY &amp; RIGOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">WORK PROCESS</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            From municipal casework observation to ISO/IEC 25010 empirical evaluation: how every project is built to endure.
          </p>
        </div>

        {/* Process Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {WORK_PROCESS.map((step, idx) => {
            const Icon = stepIcons[idx] || Code;
            return (
              <div
                key={step.step}
                className="group p-6 rounded-3xl bg-[#0F111A] border border-white/10 hover:border-[#FF2A4D]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Background Step Number */}
                <div className="absolute top-2 right-3 text-5xl font-black font-mono text-white/5 select-none group-hover:text-[#FF2A4D]/10 transition-colors">
                  {step.step}
                </div>

                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#141624] border border-white/10 flex items-center justify-center text-[#FF2A4D] mb-4 group-hover:bg-[#FF2A4D] group-hover:text-white transition-all shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-xs font-mono text-[#FF2A4D] font-bold block mb-1">
                    PHASE {step.step}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>{step.tagline}</span>
                  {idx < WORK_PROCESS.length - 1 && (
                    <ArrowRight className="hidden md:block w-3.5 h-3.5 text-gray-600 group-hover:text-[#FF2A4D] transition-colors" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
