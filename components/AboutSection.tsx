"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  Zap,
  Volume2,
  ArrowUpRight,
} from "lucide-react";
import {
  playClickSound,
  playHoverSound,
  playVictorySound,
} from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";
import { triggerConfetti } from "@/utils/confetti";

export default function AboutSection() {
  const [isLockedFullArmor, setIsLockedFullArmor] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const portrait = stage.querySelector(".about-portrait-inner");
    if (!portrait) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const rect = portrait.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    stage.style.setProperty("--hover-x", `${x}%`);
    stage.style.setProperty("--hover-y", `${y}%`);

    if (!isHovered) {
      setIsHovered(true);
      playHoverSound();
    }
  };

  const handlePointerLeave = () => {
    const stage = stageRef.current;
    if (!stage) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 1200);
  };

  const handleToggleArmorLock = (e: React.MouseEvent) => {
    playClickSound();
    const nextState = !isLockedFullArmor;
    setIsLockedFullArmor(nextState);

    if (nextState) {
      playVictorySound();
      triggerConfetti(e.clientX, e.clientY);
      triggerAchievementUnlock("secret_agent");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-transparent relative overflow-hidden border-b border-white/5 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading: Centered "About Me" matching alfari.my.id */}
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display">
            About Me
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-cyan-400 rounded-full" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Identity &bull; Passion &bull; Code
            </span>
            <span className="w-8 h-[2px] bg-[#FF2A4D] rounded-full" />
          </div>
        </div>

        {/* 3-Column Layout: Left Intro | Center Hero Portrait | Right Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Column: Greeting & Call to Action (Approx 3-4 cols) */}
          <div className="lg:col-span-3 text-center lg:text-left flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 space-y-4">
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-semibold text-[#00F0FF] tracking-wide block">
                Hi, I&apos;m
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08] font-display">
                Mon Aaron
                <br />
                <span className="text-gray-100">Marcelo</span>
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-xs">
              Junior Developer &bull; Web Developer
            </p>

            {/* Glowing Blue Contact Button matching "Hubungi Saya" */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium text-sm sm:text-base shadow-[0_0_28px_rgba(24,119,242,0.65)] hover:shadow-[0_0_38px_rgba(24,119,242,0.9)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Center Column: Interactive Portrait with Iron Man Reveal (Approx 5-6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            <div
              ref={stageRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={handleToggleArmorLock}
              className={`about-portrait-stage relative flex items-center justify-center cursor-pointer ${
                isHovered ? "is-interacting" : ""
              } ${isLockedFullArmor ? "is-locked" : ""}`}
              style={
                {
                  "--hover-x": "50%",
                  "--hover-y": "30%",
                } as React.CSSProperties
              }
              title="Point to reveal Iron Man, or click to lock armor!"
            >
              {/* Dual Cosmic Glow Aura (Red & Blue) */}
              <div className="about-portrait-glow" />

              {/* Orbital Concentric Rings */}
              <span className="about-portrait-orbit about-portrait-orbit-one" />
              <span className="about-portrait-orbit about-portrait-orbit-two" />

              {/* Glowing Orbit Spark Dot */}
              <span className="about-portrait-spark" />

              {/* Portrait Container with Smooth Bottom Fade */}
              <div className="about-portrait">
                <div className="about-portrait-inner relative w-[280px] sm:w-[350px] md:w-[390px] aspect-[419/559]">
                  {/* Layer 1: Mon Aaron's Professional Suit Cutout */}
                  <div className="about-person-image absolute inset-0 z-10 pointer-events-none">
                    <Image
                      src="/images/mon-aaron-suit.png"
                      alt="Mon Aaron Marcelo"
                      fill
                      priority
                      className="object-cover object-top drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                      sizes="(max-width: 768px) 320px, 420px"
                    />
                  </div>

                  {/* Layer 2: Iron Man Suit / Mask Reveal Layer (Aligned to Face & Body) */}
                  <div
                    className={`about-ironman-image absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${
                      isLockedFullArmor
                        ? "opacity-100 locked-full"
                        : isHovered
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div
                      className="relative w-full h-full overflow-hidden"
                      style={{
                        transform: "scale(1.22) translate(1.5%, 4%)",
                        transformOrigin: "center top",
                      }}
                    >
                      <Image
                        src="/images/ironman-suit.jpg"
                        alt="Iron Man Armor Mode"
                        fill
                        priority
                        className="object-cover object-top filter saturate-110 contrast-110"
                        sizes="(max-width: 768px) 320px, 420px"
                      />

                      {/* Arc Reactor Center Glowing Light FX */}
                      <div className="absolute top-[70.2%] left-[62.5%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan-300/40 blur-md pointer-events-none animate-pulse" />
                      <div className="absolute top-[70.2%] left-[62.5%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-[0_0_20px_#00F0FF,0_0_35px_#00F0FF] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Helper Pill Below Center Portrait */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                <button
                  type="button"
                  onClick={handleToggleArmorLock}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E1018]/90 border border-white/15 hover:border-cyan-400 text-[11px] font-mono text-gray-300 hover:text-white shadow-lg backdrop-blur-md transition-all hover:scale-105"
                >
                  <Sparkles className="w-3 h-3 text-[#00F0FF]" />
                  <span>
                    {isLockedFullArmor
                      ? "Lock: Full Iron Man (Click to Unlock)"
                      : isHovered
                      ? "Hovering: Iron Man Revealing"
                      : "Point at me to Suit Up"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & View Projects */}
          <div className="lg:col-span-3 text-center lg:text-left flex flex-col items-center lg:items-start justify-center order-3 space-y-5">
            <div className="about-bio text-sm sm:text-base text-gray-300 leading-relaxed font-normal space-y-4">
              <p>
                I am an aspiring <strong className="text-white font-semibold">Junior Developer</strong> dedicated to building digital products that are both functional and visually engaging. I love blending clean code, creative design, and interactive experiences to build memorable digital solutions.
              </p>
              <p className="text-gray-400">
                With <strong className="text-gray-200">React, Next.js, TypeScript, and modern web tools</strong>, I turn complex concepts into intuitive, responsive, and impactful experiences.
              </p>
            </div>

            {/* View Projects Button */}
            <div className="pt-2">
              <a
                href="#portfolio"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan-400/60 text-white hover:text-cyan-400 text-xs sm:text-sm font-mono tracking-wide shadow-md transition-all duration-300 hover:scale-105"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS replicating alfari.my.id mechanics */}
      <style jsx>{`
        .about-portrait-stage {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-portrait-glow {
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          background: radial-gradient(at 50% 35%, rgba(220, 38, 38, 0.42), transparent 45%),
            radial-gradient(at 48% 68%, rgba(24, 119, 242, 0.45), transparent 65%);
          filter: blur(28px);
          z-index: 0;
          pointer-events: none;
        }

        .about-portrait-orbit {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          border-radius: 50%;
          aspect-ratio: 1;
        }

        .about-portrait-orbit-one {
          width: 90%;
          border: 1px solid rgba(108, 151, 215, 0.22);
          top: 8%;
          left: 50%;
          transform: translateX(-50%);
        }

        .about-portrait-orbit-two {
          width: 72%;
          border: 1px solid rgba(229, 61, 81, 0.22);
          top: 17%;
          left: 50%;
          transform: translateX(-50%);
        }

        .about-portrait-spark {
          position: absolute;
          z-index: 3;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #39e5d0;
          top: 56%;
          right: 12%;
          box-shadow: 0 0 14px 4px rgba(57, 229, 208, 0.6);
          pointer-events: none;
          animation: pulse 2.5s infinite;
        }

        .about-portrait {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          -webkit-mask-image: linear-gradient(#000 0% 78%, rgba(0, 0, 0, 0.7) 88%, transparent 100%);
          mask-image: linear-gradient(#000 0% 78%, rgba(0, 0, 0, 0.7) 88%, transparent 100%);
        }

        .about-ironman-image {
          -webkit-mask-image: radial-gradient(
            circle 135px at var(--hover-x, 50%) var(--hover-y, 30%),
            #000 0%,
            #000 62%,
            transparent 100%
          );
          mask-image: radial-gradient(
            circle 135px at var(--hover-x, 50%) var(--hover-y, 30%),
            #000 0%,
            #000 62%,
            transparent 100%
          );
        }

        .about-ironman-image.locked-full {
          -webkit-mask-image: none !important;
          mask-image: none !important;
        }
      `}</style>
    </section>
  );
}
