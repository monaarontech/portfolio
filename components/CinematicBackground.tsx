"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  shadowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 500, y: 300 });
  const [isMounted, setIsMounted] = useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 500, y: 300 });

  useEffect(() => {
    setIsMounted(true);
    // Center initially on screen
    if (typeof window !== "undefined") {
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
      setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Canvas Particle & Interactive Constellation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // High-visibility palette: Cyan, Crimson, Electric Blue, Amber Gold, Pure White
    const palette = [
      { color: "rgba(0, 240, 255, ", shadow: "#00F0FF" },   // Neon Cyan
      { color: "rgba(255, 42, 77, ", shadow: "#FF2A4D" },   // Glowing Crimson
      { color: "rgba(24, 119, 242, ", shadow: "#1877F2" },  // Electric Blue
      { color: "rgba(251, 191, 36, ", shadow: "#FBBF24" },  // Warm Amber
      { color: "rgba(255, 255, 255, ", shadow: "#FFFFFF" }, // Star White
    ];

    let particles: Particle[] = [];
    const particleCount = Math.min(Math.max(Math.floor((width * height) / 22000), 45), 80);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const item = palette[Math.floor(Math.random() * palette.length)];
        const baseAlpha = Math.random() * 0.45 + 0.35; // 0.35 to 0.80 for high visibility!
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.65,
          vy: (Math.random() - 0.5) * 0.65,
          radius: Math.random() * 2.2 + 1.2, // 1.2px to 3.4px visible dots
          color: item.color,
          shadowColor: item.shadow,
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // 60 FPS Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const connectionDistance = 135;
      const mouseRepelDistance = 140;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        const pulse = (Math.sin(p.pulsePhase) + 1) * 0.5; // 0 to 1
        p.alpha = p.baseAlpha + pulse * 0.35;

        // Wrap around screen smoothly
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        // Mouse repulsion & interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouseRepelDistance && dist > 0) {
          const force = (1 - dist / mouseRepelDistance) * 2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
          p.alpha = Math.min(1, p.alpha + 0.4);

          // Draw interactive glowing constellation line to cursor!
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / mouseRepelDistance) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw particle dot with glowing halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(1, p.alpha)})`;
        ctx.shadowColor = p.shadowColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw constellation lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (distBetween < connectionDistance) {
            const lineAlpha = (1 - distBetween / connectionDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when tab is hidden to save energy
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#07070A]" />

      {/* 2. Vibrant Atmospheric Aurora Nebulas (Rich Color Saturation) */}
      {/* Top Left / Hero: Vivid Crimson & Deep Violet Aurora */}
      <div
        className="absolute -top-36 -left-36 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#FF2A4D]/35 via-purple-600/25 to-cyan-500/15 blur-[120px] will-change-transform"
        style={{ animation: "auroraFloat1 22s ease-in-out infinite" }}
      />

      {/* Center Right / Portfolio: Electric Cyan & Deep Azure Sky */}
      <div
        className="absolute top-1/4 -right-28 w-[720px] h-[720px] rounded-full bg-gradient-to-bl from-[#00F0FF]/30 via-[#1877F2]/25 to-purple-600/20 blur-[130px] will-change-transform"
        style={{ animation: "auroraFloat2 26s ease-in-out infinite" }}
      />

      {/* Bottom Left / Social & Contact: Royal Violet, Crimson & Amber Hearth */}
      <div
        className="absolute -bottom-48 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#8A2BE2]/35 via-[#FF2A4D]/25 to-amber-500/20 blur-[130px] will-change-transform"
        style={{ animation: "auroraFloat3 24s ease-in-out infinite" }}
      />

      {/* 3. Clearly Visible Cyber Tech Grid (Perspective Grid Pattern) */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 42, 77, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 50%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 50%, transparent 95%)",
          animation: "gridPulse 8s ease-in-out infinite",
        }}
      />

      {/* 4. Subtle Intersecting Tech Crosses on Grid Corners */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 240, 255, 0.4) 1.5px, transparent 1.5px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 5. Sweeping Cyber Scan Beam (Downward Laser Sweep) */}
      <div
        className="absolute left-0 right-0 h-[220px] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none"
        style={{
          animation: "cyberScanBeam 16s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      {/* 6. Interactive Cursor Spotlight (Torch Follower) */}
      {isMounted && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.16), rgba(255, 42, 77, 0.08) 45%, transparent 75%)`,
          }}
        />
      )}

      {/* 7. Floating Holographic Developer Glyphs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span
          className="absolute top-24 left-[12%] text-cyan-400/25 font-mono text-2xl font-bold select-none"
          style={{ animation: "floatGlyph 9s ease-in-out infinite" }}
        >
          &lt;/&gt;
        </span>
        <span
          className="absolute top-1/3 right-[10%] text-[#FF2A4D]/25 font-mono text-3xl font-bold select-none"
          style={{ animation: "floatGlyph 11s ease-in-out 2s infinite" }}
        >
          &#123; &#125;
        </span>
        <span
          className="absolute top-2/3 left-[8%] text-amber-400/20 font-mono text-xl font-bold select-none"
          style={{ animation: "floatGlyph 10s ease-in-out 4s infinite" }}
        >
          // dev
        </span>
        <span
          className="absolute top-3/4 right-[15%] text-cyan-400/25 font-mono text-xl font-bold select-none"
          style={{ animation: "floatGlyph 12s ease-in-out 1s infinite" }}
        >
          =&gt;
        </span>
        <span
          className="absolute top-[85%] left-[20%] text-purple-400/25 font-mono text-lg font-bold select-none"
          style={{ animation: "floatGlyph 14s ease-in-out 3s infinite" }}
        >
          010101
        </span>
      </div>

      {/* 8. Shooting Data Meteors / Laser Sparks */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Meteor 1 */}
        <div
          className="absolute top-16 left-1/4 w-44 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-white -rotate-45 shadow-[0_0_10px_#00F0FF]"
          style={{ animation: "meteorStreak 9s ease-in-out 1s infinite" }}
        />
        {/* Meteor 2 */}
        <div
          className="absolute top-1/2 right-1/4 w-52 h-[2px] bg-gradient-to-r from-transparent via-[#FF2A4D] to-white -rotate-45 shadow-[0_0_10px_#FF2A4D]"
          style={{ animation: "meteorStreak 12s ease-in-out 5s infinite" }}
        />
        {/* Meteor 3 */}
        <div
          className="absolute top-3/4 left-1/3 w-40 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-white -rotate-45 shadow-[0_0_10px_#FBBF24]"
          style={{ animation: "meteorStreak 14s ease-in-out 9s infinite" }}
        />
      </div>

      {/* 9. HTML5 Interactive Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
