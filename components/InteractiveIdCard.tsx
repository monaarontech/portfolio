"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { QrCode, RotateCw, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { playCardFlipSound, playHoverSound } from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";

export default function InteractiveIdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    setTilt({
      x: normY * -10, // rotateX
      y: normX * 12, // rotateY
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverSound();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const handleFlipCard = () => {
    playCardFlipSound();
    setIsFlipped((prev) => !prev);
    triggerAchievementUnlock("secret_agent");
  };

  return (
    <div className="relative flex flex-col items-center select-none pt-4 pb-2 w-full max-w-[340px] sm:max-w-[380px] mx-auto">
      {/* 1. Lanyard Suspension Straps (Anchored to top of viewport) */}
      <div className="relative w-full flex flex-col items-center pointer-events-none z-10 -mb-5">
        {/* Top ceiling anchor grommet */}
        <div className="w-10 h-3 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 border border-white/20 shadow-lg" />

        {/* V-Neck Fabric Lanyard Straps */}
        <div className="relative w-28 h-28 flex justify-center">
          {/* Left Ribbon Strap */}
          <div
            className="absolute top-0 right-1/2 w-6 h-28 origin-top-right rotate-[-12deg] bg-[#141E33] shadow-md border-x border-[#00F0FF]/20 overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(0, 240, 255, 0.15) 0, rgba(0, 240, 255, 0.15) 4px, transparent 4px, transparent 12px), repeating-linear-gradient(-45deg, rgba(255, 107, 0, 0.15) 0, rgba(255, 107, 0, 0.15) 4px, #141E33 4px, #141E33 12px)",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-black/40 via-transparent to-black/30" />
          </div>

          {/* Right Ribbon Strap */}
          <div
            className="absolute top-0 left-1/2 w-6 h-28 origin-top-left rotate-[12deg] bg-[#141E33] shadow-md border-x border-[#00F0FF]/20 overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(0, 240, 255, 0.15) 0, rgba(0, 240, 255, 0.15) 4px, transparent 4px, transparent 12px), repeating-linear-gradient(45deg, rgba(255, 107, 0, 0.15) 0, rgba(255, 107, 0, 0.15) 4px, #141E33 4px, #141E33 12px)",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-black/30 via-transparent to-black/40" />
          </div>

          {/* Quick-Release Buckle / Clip Clasp at apex */}
          <div className="absolute bottom-0 z-20 flex flex-col items-center">
            {/* Plastic buckle */}
            <div className="w-7 h-5 rounded bg-gray-900 border border-gray-700 shadow-md flex items-center justify-center">
              <div className="w-3.5 h-1.5 rounded-full bg-gray-600" />
            </div>

            {/* Metal Swivel Lobster Clasp Hook */}
            <div className="w-4 h-6 rounded-b-md bg-gradient-to-r from-gray-400 via-gray-100 to-gray-500 shadow-lg border border-gray-600 relative">
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-3 border-2 border-gray-400 rounded-b-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hanging ID Card with Realistic 3D Pendulum Physics & Smooth Flip */}
      <div
        ref={cardContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleFlipCard}
        className={`group relative cursor-pointer ${
          isHovered || isFlipped ? "" : "animate-[cardSwing_6s_ease-in-out_infinite]"
        }`}
        style={{
          transformOrigin: "top center",
          perspective: 1200,
        }}
        title="Click to flip ID card (reveal QR code)!"
      >
        {/* Dynamic Card Sleeve / Perspective Wrapper */}
        <div
          className="relative transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${
              (isFlipped ? 180 : 0) + tilt.y
            }deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          }}
        >
          {/* Top Acrylic Slot Loop */}
          <div className="relative -mb-3 mx-auto w-12 h-6 rounded-t-lg bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-md z-30">
            {/* Cutout punch hole */}
            <div className="w-5 h-2 rounded-full bg-black/80 border border-white/20 shadow-inner" />
          </div>

          {/* The Physical Card Container (300px x 510px, approx 591x1004 ratio) */}
          <div
            className="relative w-[280px] sm:w-[320px] aspect-[591/1004] rounded-2xl p-1 bg-gradient-to-b from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
          >
            {/* FRONT FACE of the ID Card */}
            <div
              className="absolute inset-1 rounded-xl overflow-hidden bg-[#1E222D]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg) translateZ(2px)",
              }}
            >
              <Image
                src="/images/id-front.png"
                alt="Mon Aaron Marcelo - Junior Developer ID Card Front"
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 768px) 280px, 320px"
              />

              {/* Holographic NEUST Seal Shimmer */}
              <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400/20 via-amber-300/20 to-transparent pointer-events-none animate-pulse" />
            </div>

            {/* BACK FACE of the ID Card (QR Code & Connect Info) */}
            <div
              className="absolute inset-1 rounded-xl overflow-hidden bg-[#1E222D]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(2px)",
              }}
            >
              <Image
                src="/images/id-back.png"
                alt="Mon Aaron Marcelo - Connect QR Code Back"
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 768px) 280px, 320px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Floating Helper Badges */}
      <div className="mt-5 flex flex-col items-center gap-2 z-20">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={handleFlipCard}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141F]/90 border border-white/15 hover:border-[#00F0FF]/50 text-xs font-mono text-gray-300 hover:text-white shadow-xl shadow-black/50 transition-all hover:scale-105"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#00F0FF] group-hover:rotate-180 transition-transform duration-500" />
            <span>{isFlipped ? "Flip to ID Front" : "Click to Flip Card (Scan QR)"}</span>
          </button>

          {isFlipped && (
            <a
              href="https://www.facebook.com/yahja.ognimod.7"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2] border border-[#1877F2]/40 text-xs font-mono text-white shadow-lg transition-all hover:scale-105 animate-fade-in"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open Profile Link</span>
            </a>
          )}
        </div>

        <p className="text-[10px] font-mono text-gray-400">
          {isFlipped ? "📱 Scan QR code to connect on Facebook" : "Hover to tilt • Realistic hanging lanyard"}
        </p>
      </div>

      {/* Keyframe animation for natural pendulum swinging */}
      <style jsx global>{`
        @keyframes cardSwing {
          0% {
            transform: rotateZ(0deg) rotateY(0deg);
          }
          25% {
            transform: rotateZ(-2.2deg) rotateY(-3deg);
          }
          50% {
            transform: rotateZ(0deg) rotateY(0deg);
          }
          75% {
            transform: rotateZ(2.2deg) rotateY(3deg);
          }
          100% {
            transform: rotateZ(0deg) rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
}
