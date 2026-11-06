"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isMounted, setIsMounted] = useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    setIsMounted(true);

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

  // Canvas Particle & Constellation Loop
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

    // Palette: Cyan, Crimson, Electric Blue, Warm Amber, White
    const colors = [
      "rgba(0, 240, 255, ",   // Cyan
      "rgba(255, 42, 77, ",   // Crimson
      "rgba(24, 119, 242, ",  // Electric Blue
      "rgba(251, 191, 36, ",  // Warm Amber
      "rgba(255, 255, 255, ", // Pure White Star
    ];

    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 28000), 55);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const baseAlpha = Math.random() * 0.45 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.6 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
        });
      }
    };

    initParticles();

    // Main 60 FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const connectionDistance = 115;
      const mouseRepelDistance = 120;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Interactive mouse repulsion physics
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRepelDistance && dist > 0) {
          const force = (1 - dist / mouseRepelDistance) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
          p.alpha = Math.min(1, p.baseAlpha + 0.4);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color === colors[0] ? "#00F0FF" : "#FF2A4D";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw constellation connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (distBetween < connectionDistance) {
            const lineAlpha = (1 - distBetween / connectionDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when tab not visible to save CPU/battery
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
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none"
    >
      {/* 1. Base Deep Space Background */}
      <div className="absolute inset-0 bg-[#07070A]" />

      {/* 2. Floating Breathing Aurora Orbs */}
      {/* Orb 1: Crimson & Violet - Top Left / Hero */}
      <div
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#FF2A4D]/14 via-purple-700/10 to-transparent blur-[140px] will-change-transform"
        style={{ animation: "auroraFloat1 24s ease-in-out infinite" }}
      />

      {/* Orb 2: Electric Cyan & Sky Blue - Middle Right / About & Portfolio */}
      <div
        className="absolute top-1/3 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#00F0FF]/12 via-indigo-600/10 to-transparent blur-[150px] will-change-transform"
        style={{ animation: "auroraFloat2 28s ease-in-out infinite" }}
      />

      {/* Orb 3: Deep Royal Violet & Crimson - Bottom Left / Social & Contact */}
      <div
        className="absolute -bottom-40 left-1/4 w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#7928CA]/14 via-[#FF2A4D]/8 to-transparent blur-[160px] will-change-transform"
        style={{ animation: "auroraFloat3 26s ease-in-out infinite" }}
      />

      {/* 3. Subtle Cyber Dot-Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 95%)",
        }}
      />

      {/* 4. Soft Cyber Horizontal Scanline Wave (Atmospheric Tech Ray) */}
      <div
        className="absolute left-0 right-0 h-[180px] bg-gradient-to-b from-transparent via-cyan-400/[0.025] to-transparent"
        style={{
          animation: "cyberScanBeam 18s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      {/* 5. Dynamic Interactive Mouse Spotlight (Smooth Fluid Illumination) */}
      {isMounted && mousePos.x !== -1000 && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.07), rgba(255, 42, 77, 0.04) 40%, transparent 75%)`,
          }}
        />
      )}

      {/* 6. Dynamic Meteors / Shooting Data Sparks */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Meteor 1 */}
        <div
          className="absolute top-12 left-1/4 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-white -rotate-45"
          style={{ animation: "meteorStreak 11s ease-in-out 2s infinite" }}
        />
        {/* Meteor 2 */}
        <div
          className="absolute top-1/2 right-1/4 w-40 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF2A4D] to-white -rotate-45"
          style={{ animation: "meteorStreak 14s ease-in-out 7s infinite" }}
        />
        {/* Meteor 3 */}
        <div
          className="absolute top-3/4 left-1/3 w-36 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-white -rotate-45"
          style={{ animation: "meteorStreak 16s ease-in-out 12s infinite" }}
        />
      </div>

      {/* 7. HTML5 Interactive Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
