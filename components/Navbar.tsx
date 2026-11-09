"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight, Sparkles, Terminal, Gamepad2, Share2, FileText } from "lucide-react";
import { openSecretTerminal } from "@/components/SecretTerminal";
import { playClickSound, playHoverSound } from "@/utils/soundEffects";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "portfolio", "social", "contact"];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "About", href: "#about", id: "about" },
    { label: "Portfolio", href: "#portfolio", id: "portfolio" },
    { label: "Find Me", href: "#social", id: "social" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 bg-[#090A0F]/90 backdrop-blur-md border-b border-white/5 shadow-2xl" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Monogram Brand */}
            <a
              href="#hero"
              onMouseEnter={playHoverSound}
              className="group flex items-center gap-3 text-white transition-all hover:opacity-90"
              aria-label="Mon Aaron Marcelo - Back to top"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A1D27] to-[#0F1117] border border-white/10 flex items-center justify-center font-mono font-bold text-sm tracking-wider text-white group-hover:border-[#FF2A4D]/50 transition-all shadow-lg group-hover:shadow-[#FF2A4D]/20">
                <span className="text-[#FF2A4D]">M</span>
                <span className="text-white">/</span>
                <span className="text-gray-300">A</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-bold tracking-wide text-white group-hover:text-[#FF2A4D] transition-colors font-display">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[11px] font-mono text-gray-400">Junior Developer • NEUST</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#12141C]/85 border border-white/10 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={playClickSound}
                    onMouseEnter={playHoverSound}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                      isActive
                        ? "bg-[#FF2A4D] text-white shadow-md shadow-[#FF2A4D]/35 font-bold"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Status Badge, Terminal Shortcut & CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={openSecretTerminal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#12141C] border border-white/10 hover:border-[#FF2A4D]/50 text-gray-300 hover:text-white text-xs font-mono transition-all"
                title="Launch Secret Terminal (` or ~)"
              >
                <Terminal className="w-3.5 h-3.5 text-[#FF2A4D]" />
                <span>Console</span>
                <span className="px-1 py-0.2 rounded bg-white/10 text-[10px] text-gray-400 font-bold">~</span>
              </button>

              <a
                href="/Mon_Aaron_Marcelo_Resume.pdf"
                target="_blank"
                download="Mon_Aaron_Marcelo_Resume.pdf"
                onClick={playClickSound}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#12141C] border border-[#2b5c92]/50 hover:border-[#3b82f6] text-gray-200 hover:text-white text-xs font-mono transition-all hover:bg-[#2b5c92]/20"
                title="Download Mon Aaron Marcelo Resume (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-[#60a5fa]" />
                <span>Resume</span>
              </a>

              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Open for Roles</span>
              </div>

              <a
                href="#contact"
                onClick={playClickSound}
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-[#FF2A4D] to-[#E50914] shadow-lg shadow-[#FF2A4D]/25 hover:shadow-[#FF2A4D]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#12141C] border border-white/10 text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[70px] p-4 bg-[#090A0F]/95 border-b border-white/10 backdrop-blur-2xl transition-all shadow-2xl">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 px-2">
                <span className="text-xs font-mono text-gray-400">NAVIGATION</span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  Available for Hire
                </div>
              </div>

              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    playClickSound();
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-mono font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-[#FF2A4D] text-white font-bold"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="/Mon_Aaron_Marcelo_Resume.pdf"
                  target="_blank"
                  download="Mon_Aaron_Marcelo_Resume.pdf"
                  onClick={() => {
                    playClickSound();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono text-white bg-[#151d2d] border border-[#2b5c92]/60 flex items-center justify-center gap-2 hover:border-[#3b82f6]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#60a5fa]" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSecretTerminal();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono text-gray-300 bg-white/5 border border-white/10 flex items-center justify-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#FF2A4D]" />
                  <span>Launch Developer Console (` key)</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl text-center text-sm font-mono font-bold text-white bg-gradient-to-r from-[#FF2A4D] to-[#E50914] shadow-lg shadow-[#FF2A4D]/25"
                >
                  Let&apos;s Connect
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
