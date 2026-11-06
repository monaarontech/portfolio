"use client";

import React, { useState, useRef } from "react";
import { RotateCw, ExternalLink } from "lucide-react";
import { playCardFlipSound, playHoverSound } from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";

export default function InteractiveIdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showBackImage, setShowBackImage] = useState(false);
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
      x: normY * -12, // rotateX
      y: normX * 14, // rotateY
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
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    // Switch visible face at the exact 260ms midpoint of the 550ms flip
    setTimeout(() => {
      setShowBackImage(nextFlipped);
    }, 260);

    triggerAchievementUnlock("secret_agent");
  };

  return (
    <div className="relative flex flex-col items-center select-none pt-4 pb-2 w-full max-w-[340px] sm:max-w-[380px] mx-auto">
      {/* 1. Lanyard Suspension Straps (Anchored to top of viewport) */}
      <div className="relative w-full flex flex-col items-center pointer-events-none z-10 -mb-5">
        {/* Top ceiling anchor grommet */}
        <div className="w-10 h-3 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 border border-white/20 shadow-lg" />

        {/* V-Neck Fabric Lanyard Straps with subtle counter-sway */}
        <div className="relative w-28 h-28 flex justify-center animate-[lanyardSway_4.2s_ease-in-out_infinite]">
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

      {/* 2. Hanging ID Card with Enhanced Swingy Pendulum Physics */}
      <div
        ref={cardContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleFlipCard}
        className="group relative cursor-pointer animate-[cardSwing_4.2s_ease-in-out_infinite]"
        style={{
          transformOrigin: "top center",
          perspective: 1200,
        }}
        title="Click to flip ID card (reveal QR code)!"
      >
        {/* Dynamic Card Sleeve / Perspective Wrapper (Handles 3D Flip & Interactive Mouse Tilt) */}
        <div
          className="relative transition-transform duration-550 ease-out"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${
              (isFlipped ? 180 : 0) + tilt.y
            }deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          }}
        >
          {/* Top Acrylic Slot Loop */}
          <div className="relative -mb-3 mx-auto w-12 h-6 rounded-t-lg bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-md z-30">
            {/* Cutout punch hole */}
            <div className="w-5 h-2 rounded-full bg-black/80 border border-white/20 shadow-inner" />
          </div>

          {/* The Physical Card Container (approx 591x1004 ratio) */}
          <div
            className="relative w-[280px] sm:w-[320px] aspect-[591/1004] rounded-2xl p-1 bg-gradient-to-b from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
          >
            {/* FRONT FACE of the ID Card */}
            <div
              className={`absolute inset-1 rounded-xl overflow-hidden bg-[#1E222D] transition-opacity duration-200 ${
                showBackImage ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg) translateZ(1px)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/id-front.png"
                alt="Mon Aaron Marcelo - Junior Developer ID Card Front"
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Holographic NEUST Seal Shimmer */}
              <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400/25 via-amber-300/20 to-transparent pointer-events-none animate-pulse" />
            </div>

            {/* BACK FACE of the ID Card (QR Code & Connect Info) */}
            <div
              className={`absolute inset-1 rounded-xl overflow-hidden bg-[#1E222D] transition-opacity duration-200 ${
                showBackImage ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(1px)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/id-back.png"
                alt="Mon Aaron Marcelo - Connect QR Code Back"
                className="w-full h-full object-cover object-center select-none"
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
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141F]/90 border border-white/15 hover:border-[#00F0FF]/50 text-xs font-mono text-gray-300 hover:text-white shadow-xl shadow-black/50 transition-all hover:scale-105 active:scale-95"
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
          {isFlipped ? "📱 Scan QR code to connect on Facebook" : "Hover to tilt • Realistic pendulum swinging lanyard"}
        </p>
      </div>

      {/* Enhanced Fluid Pendulum Swing Keyframe Animations */}
      <style jsx global>{`
        @keyframes cardSwing {
          0% {
            transform: rotateZ(0deg) rotateY(0deg) rotateX(1deg);
          }
          18% {
            transform: rotateZ(-6.5deg) rotateY(-5deg) rotateX(-2.5deg);
          }
          38% {
            transform: rotateZ(1.2deg) rotateY(1.5deg) rotateX(1.5deg);
          }
          62% {
            transform: rotateZ(6deg) rotateY(5deg) rotateX(-2deg);
          }
          82% {
            transform: rotateZ(-1.8deg) rotateY(-1.5deg) rotateX(1deg);
          }
          100% {
            transform: rotateZ(0deg) rotateY(0deg) rotateX(1deg);
          }
        }

        @keyframes lanyardSway {
          0% {
            transform: rotateZ(0deg);
          }
          20% {
            transform: rotateZ(-2.5deg);
          }
          60% {
            transform: rotateZ(2.2deg);
          }
          100% {
            transform: rotateZ(0deg);
          }
        }
      `}</style>
    </div>
  );
}
