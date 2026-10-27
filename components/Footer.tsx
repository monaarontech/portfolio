"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp, Github, Mail, MapPin, Terminal } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#06070A] text-gray-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#12141F] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white">
              <span className="text-[#FF2A4D]">M</span>
              <span>/</span>
              <span>A</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-xs font-mono text-gray-500">
                Full-Stack Software Developer • NEUST Atate
              </div>
            </div>
          </div>

          {/* Quick Nav Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#flagship" className="hover:text-white transition-colors">Palayan Hub</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#dev-studio" className="hover:text-white transition-colors">Dev Studio</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Return to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#10121C] border border-white/10 hover:border-[#FF2A4D]/40 text-xs font-mono text-gray-300 hover:text-white transition-all shadow-sm"
            aria-label="Return to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF2A4D] transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom Credits & Verification */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All verified projects &amp; capstone research preserved.
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Terminal className="w-3.5 h-3.5 text-[#FF2A4D]" />
            <span>Built with Next.js 14, TypeScript &amp; Tailwind • Vercel Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
