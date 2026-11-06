"use client";

import React from "react";
import { SOCIAL_LINKS, PERSONAL_INFO } from "@/data/portfolioData";
import { Github, Instagram, ArrowUpRight, Globe, Share2, Sparkles, MessageCircle, QrCode } from "lucide-react";
import { playHoverSound, playClickSound } from "@/utils/soundEffects";

// Custom TikTok icon since Lucide does not have a native TikTok SVG
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.6a6.34 6.34 0 0 0 9.17 5.65 6.27 6.27 0 0 0 3.65-5.58V8.69a8.18 8.18 0 0 0 4.77 1.52v-3.4c-.34 0-.68-.04-1-.12z" />
    </svg>
  );
}

// Custom Facebook icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function SocialMediaSection() {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <Github className="w-6 h-6" />;
      case "Instagram":
        return <Instagram className="w-6 h-6" />;
      case "TikTok":
        return <TikTokIcon className="w-6 h-6" />;
      case "Facebook":
        return <FacebookIcon className="w-6 h-6" />;
      default:
        return <Globe className="w-6 h-6" />;
    }
  };

  return (
    <section id="social" className="py-24 bg-transparent relative overflow-hidden border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-blue-600/10 via-[#FF2A4D]/10 to-cyan-500/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
            <Share2 className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>CONNECT &amp; NETWORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            FIND ME AROUND{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-[#FF2A4D]">
              THE WEB
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-mono leading-relaxed">
            Whether you want to collaborate on civic technology, review my code repositories, or connect professionally, reach out on any of my official handles below.
          </p>
        </div>

        {/* 4-Column Grid of Modern Social Media Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_LINKS.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className={`group relative p-6 rounded-3xl bg-[#0D0F18] border border-white/10 ${item.bgHover} transition-all duration-300 flex flex-col justify-between hover:scale-[1.03] hover:shadow-2xl`}
            >
              <div>
                {/* Top Row: Icon + External Arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {getIcon(item.platform)}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/15 flex items-center justify-center text-gray-400 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Platform Name & Handle */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                  {item.platform}
                </h3>
                <p
                  className="text-xs font-mono font-bold tracking-wide mb-3"
                  style={{ color: item.color }}
                >
                  {item.username}
                </p>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Badge / Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                <span>{item.followers}</span>
                <span className="font-semibold underline decoration-white/20 group-hover:decoration-white">
                  Connect &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* QR Code Callout Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#121422] to-[#0E101A] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">
                Physical ID Card QR Code
              </h4>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                My Facebook profile is physically encoded on the back of my hanging ID badge in the Hero section. Click the card to flip it anytime!
              </p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.facebook}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-[#1877F2]/30 transition-all hover:scale-105"
          >
            <FacebookIcon className="w-4 h-4" />
            <span>Open Facebook Profile</span>
          </a>
        </div>
      </div>
    </section>
  );
}
