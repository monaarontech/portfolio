"use client";

import React from "react";
import { Terminal, Database, Server, Code, Shield, Cpu, Layers } from "lucide-react";

export default function TechMarquee() {
  const techStack = [
    { name: "PHP 8", icon: Server },
    { name: "MySQL Relational", icon: Database },
    { name: "Next.js & React", icon: Layers },
    { name: "TypeScript", icon: Code },
    { name: "Tailwind CSS", icon: Layers },
    { name: "Server-Sent Events", icon: Terminal },
    { name: "Two-Factor Auth (OTP)", icon: Shield },
    { name: "ISO/IEC 25010 Quality", icon: Cpu },
    { name: "Python 3", icon: Code },
    { name: "Java SE", icon: Server },
    { name: "Git & GitHub", icon: Terminal },
    { name: "Civic Web Portals", icon: Shield },
  ];

  return (
    <div className="py-6 bg-[#0B0D14] border-y border-white/5 overflow-hidden relative select-none">
      {/* Side Vignettes */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090A0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090A0F] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-8 items-center">
        {[...techStack, ...techStack].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12141F] border border-white/10 text-gray-300 font-mono text-xs whitespace-nowrap hover:border-[#FF2A4D]/50 hover:text-white transition-all shadow-sm"
            >
              <Icon className="w-3.5 h-3.5 text-[#FF2A4D]" />
              <span className="font-medium tracking-wide">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
