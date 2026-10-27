"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { Layout, Server, Database, Code, Cpu, Search, CheckCircle2 } from "lucide-react";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const iconMap: Record<string, React.ElementType> = {
    Layout,
    Server,
    Database,
    Code,
    Cpu,
  };

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (selectedCategory !== "All" && cat.title !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.level.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredSkills.length === 0) return null;
    return { ...cat, skills: filteredSkills };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-24 bg-[#090A0F] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>05 / TECHNICAL EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              VERIFIED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">STACK &amp; SKILLS</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            Technologies and methodologies verified through actual capstone architecture, security engines, and repository commits.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? "bg-[#FF2A4D] text-white font-semibold shadow-md shadow-[#FF2A4D]/25"
                    : "bg-[#12141F] text-gray-400 hover:text-white hover:bg-[#181B28] border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#12141F] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D]"
            />
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="space-y-10">
          {filteredCategories.map((cat, i) => {
            if (!cat) return null;
            const Icon = iconMap[cat.icon] || Code;
            return (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <Icon className="w-4 h-4 text-[#FF2A4D]" />
                  <h3 className="text-base font-bold text-white tracking-wide">{cat.title}</h3>
                  <span className="text-xs font-mono text-gray-500">({cat.skills.length})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-2xl bg-[#0F111A] border border-white/5 hover:border-[#FF2A4D]/30 transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-[#FF2A4D] transition-colors">
                            {skill.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300 border border-white/10">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-normal">
                          {skill.note}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Project Implementation</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
