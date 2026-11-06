"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Award,
  Trophy,
  Layers,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  X,
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/utils/soundEffects";
import { FLAGSHIP_PROJECT, SUPPORTING_PROJECTS, Project } from "@/data/portfolioData";

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "achievements" | "stack">("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allProjects: Project[] = [FLAGSHIP_PROJECT, ...SUPPORTING_PROJECTS];

  const tabs = [
    { id: "projects", label: "Projects", icon: Code2 },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "stack", label: "Tech Stack", icon: Layers },
  ] as const;

  // Curated Tech Stack matching Screenshot 3 from alfari.my.id
  const techStackList = [
    {
      name: "React",
      category: "Frontend",
      color: "#00D8FF",
      svg: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10">
          <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
          <g stroke="#00D8FF" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: "JavaScript",
      category: "Language",
      color: "#F7DF1E",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1.1 0 1.8-.6 1.8-1.8V9h-1.8v7c0 .4-.2.6-.6.6-.3 0-.5-.1-.8-.4l-.7.9zm6.6-.1c.6.6 1.4 1 2.3 1 1.3 0 2.1-.7 2.1-1.7 0-1.1-.8-1.5-1.9-2l-.5-.2c-.7-.3-1-.6-1-1.1 0-.6.5-1 1.3-1 .6 0 1.1.2 1.5.6l.8-.9c-.6-.6-1.3-.9-2.3-.9-1.2 0-2 .7-2 1.7 0 1 .7 1.5 1.7 1.9l.5.2c.8.3 1.2.7 1.2 1.3 0 .7-.6 1.1-1.5 1.1-.8 0-1.5-.4-2-1l-.8.9z" fill="#000000" />
        </svg>
      ),
    },
    {
      name: "HTML5",
      category: "Frontend",
      color: "#E34F26",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm15 5.5h-9.8l.2 2.5h9.3l-.6 6.8-4.9 1.4-4.9-1.4-.3-3.4H6.5l.6 5.5 4.9 1.4 4.9-1.4 1.1-12.8z" fill="#E34F26" />
        </svg>
      ),
    },
    {
      name: "CSS3",
      category: "Frontend",
      color: "#1572B6",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm15 5.5H6.8l.2 2.5h10.8l-.6 6.8-5.2 1.4-5.2-1.4-.3-3.4h2.5l.2 1.7 2.8.8 2.8-.8.3-3.5H6.5l-.2-2.5h11.9l.2-2.5z" fill="#1572B6" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      color: "#38BDF8",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.7-2.1 1.1.2 1.8.9 2.7 1.8 1.4 1.4 3 3 6.6 3 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.7 2.1-1.1-.2-1.8-.9-2.7-1.8-1.4-1.4-3-3-6.6-3zM5.4 12c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.7-2.1 1.1.2 1.8.9 2.7 1.8 1.4 1.4 3 3 6.6 3 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.7 2.1-1.1-.2-1.8-.9-2.7-1.8-1.4-1.4-3-3-6.6-3z" fill="#38BDF8" />
        </svg>
      ),
    },
    {
      name: "Python",
      category: "Language",
      color: "#3776AB",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M11.9 2C8.6 2 8.7 3.4 8.7 3.4v2.5h4.6v.6H6.1S3.8 6.3 3.8 9.8c0 3.5 2.1 3.4 2.1 3.4h1.3v-1.9s-.1-2.2 2.2-2.2h4.5s2.1 0 2.1-2.1V4.9S16.1 2 11.9 2zm-1.3 1.4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#3776AB" />
          <path d="M12.1 22c3.3 0 3.2-1.4 3.2-1.4v-2.5h-4.6v-.6h7.2s2.3.2 2.3-3.3c0-3.5-2.1-3.4-2.1-3.4H16.8v1.9s.1 2.2-2.2 2.2h-4.5s-2.1 0-2.1 2.1v2.1s-.1 2.9 4.1 2.9zm1.3-1.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFD43B" />
        </svg>
      ),
    },
    {
      name: "PHP",
      category: "Backend",
      color: "#777BB4",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
          <path d="M5.5 13.5l1.2-4.5h2.2c.9 0 1.5.2 1.8.6.3.4.3 1 .1 1.7-.2.9-.7 1.5-1.3 1.8-.6.3-1.4.4-2.4.4H5.5zm1.5-1.2h.9c.7 0 1.2-.1 1.5-.3.3-.2.5-.6.6-1.1.1-.5.1-.8-.1-1-.2-.2-.6-.3-1.2-.3H7.5l-.5 2.7zm5 1.2l1.6-6h1.2l-.7 2.4h2.5l.7-2.4h1.2l-1.6 6H15l.7-2.5h-2.5l-.7 2.5H12zm6.5 0l1.2-4.5h2.2c.9 0 1.5.2 1.8.6.3.4.3 1 .1 1.7-.2.9-.7 1.5-1.3 1.8-.6.3-1.4.4-2.4.4h-1.6zm1.5-1.2h.9c.7 0 1.2-.1 1.5-.3.3-.2.5-.6.6-1.1.1-.5.1-.8-.1-1-.2-.2-.6-.3-1.2-.3H19l-.5 2.7z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: "MySQL",
      category: "Database",
      color: "#00758F",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 3c-4.4 0-8 1.8-8 4v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7c0-2.2-3.6-4-8-4zm0 2c3.3 0 6 1.1 6 2.5S15.3 10 12 10 6 8.9 6 7.5 8.7 5 12 5zm6 12c0 1.4-2.7 2.5-6 2.5S6 18.4 6 17v-2.1c1.5 1 3.6 1.6 6 1.6s4.5-.6 6-1.6V17zm0-4.5c0 1.4-2.7 2.5-6 2.5s-6-1.1-6-2.5v-2.1c1.5 1 3.6 1.6 6 1.6s4.5-.6 6-1.6v2.1z" fill="#00758F" />
        </svg>
      ),
    },
    {
      name: "Supabase",
      category: "Database",
      color: "#3ECF8E",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M13.4 2.1c.3-.5 1.1-.3 1.2.3l1.8 8.8c.1.5-.3 1-.8 1H9.8c-.6 0-.9.6-.5 1.1l7.8 8.6c.4.5-.1 1.2-.7 1l-11-4c-.5-.2-.7-.8-.5-1.3L8.6 6.5c.1-.4.5-.7 1-.7h4.8c.6 0 .9-.6.5-1.1l-1.5-2.6z" fill="#3ECF8E" />
        </svg>
      ),
    },
    {
      name: "Firebase",
      category: "Backend",
      color: "#FFCA28",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M4.6 14.8l2-11.8c.1-.5.7-.7 1-.4l3.1 4.5-6.1 7.7zm9.6-4.5L12.5 2.3c-.2-.4-.8-.4-1 0L3.3 17.5l8.7 4.9c.4.2.9.2 1.3 0l7.4-4.2-6.5-7.9z" fill="#FFCA28" />
          <path d="M19.4 18.2L16 3.6c-.1-.5-.7-.7-1-.4l-9 14 7.2 4.1c.4.2.9.2 1.3 0l4.9-3.1z" fill="#FFA000" />
        </svg>
      ),
    },
    {
      name: "Git",
      category: "Tool",
      color: "#F05032",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M21.7 10.9L13.1 2.3c-.4-.4-1.1-.4-1.5 0L9.8 4.1l2.4 2.4c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.3 2.3c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5L13.1 9.2v5.7c.2.1.4.3.5.5.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.4.6-.5V9c.2-.1.4-.3.6-.5L9.3 6.1 2.3 13.1c-.4.4-.4 1.1 0 1.5l8.6 8.6c.4.4 1.1.4 1.5 0l9.3-9.3c.4-.4.4-1.1 0-1.5z" fill="#F05032" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      category: "Tool",
      color: "#FFFFFF",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#FFFFFF">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "Next.js",
      category: "Frontend",
      color: "#FFFFFF",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#FFFFFF">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 14.7l-4.5-6.3v6.3H9.4V7.9h1.6l4.6 6.4V7.9h1.4v8.8h-1.7z" />
        </svg>
      ),
    },
    {
      name: "TypeScript",
      category: "Language",
      color: "#3178C6",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M11 7.5H5.5v2h2V18h2V9.5h2v-2zm6.2 5.3c-.6-.4-1.2-.6-1.8-.8l-.5-.2c-.5-.2-.7-.4-.7-.7 0-.3.3-.6.8-.6.5 0 1 .2 1.4.5l1-1.3c-.7-.6-1.5-.9-2.4-.9-1.6 0-2.6 1-2.6 2.3 0 1 .6 1.7 1.7 2.1l.5.2c.6.2.8.5.8.8 0 .4-.4.7-1 .7-.7 0-1.3-.3-1.9-.8l-1 1.4c.8.8 1.8 1.2 2.9 1.2 1.8 0 2.8-1 2.8-2.5 0-1.1-.6-1.8-1.5-2.2z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: "Vercel",
      category: "Cloud",
      color: "#FFFFFF",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 2L2 20h20L12 2z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      category: "Backend",
      color: "#5FA04E",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5.3 8.2v7.6L12 19.7l6.7-3.9V8.2L12 4.3z" fill="#5FA04E" />
        </svg>
      ),
    },
    {
      name: "Java",
      category: "Language",
      color: "#E76F00",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path d="M7 16c2.5.5 5.5.5 8 0 1.2-.2 2.5-.6 3.5-1.2-1.2.6-2.5 1-3.8 1.2-2.5.4-5.5.4-7.7 0zm1-2.5c2 .4 4.5.4 6.5 0 1-.2 2-.5 2.8-1-1 .5-2 .8-3 1-2 .3-4.5.3-6.3 0z" fill="#E76F00" />
          <path d="M13.5 3c-.5 1.5-1.2 2.8-2 4 1-.5 2-1.2 2.5-2.2.3-.6.5-1.2.5-1.8h-1zm-2 4.5c-.8 1.2-1.8 2.2-2.5 3.5 1.5-.8 2.8-1.8 3.5-3-.3-.2-.7-.4-1-.5z" fill="#5382A1" />
        </svg>
      ),
    },
    {
      name: "XAMPP",
      category: "Tool",
      color: "#FB7A24",
      svg: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <rect width="24" height="24" rx="5" fill="#FB7A24" />
          <path d="M6 7l3.5 5L6 17h2.2l2.4-3.5 2.4 3.5h2.2L11.7 12 15.2 7H13l-2.4 3.5L8.2 7H6z" fill="#FFFFFF" />
        </svg>
      ),
    },
  ];

  // Verified Certificates placeholder data ready for user photos
  const certificatesList = [
    {
      id: "cert-neust-academic",
      title: "Academic Excellence & Dean's List Award",
      issuer: "Nueva Ecija University of Science and Technology",
      date: "Academic Year 2023 - 2024",
      status: "Verified Official Credential",
      description: "Recognized for exemplary academic performance and technical project leadership at NEUST College of Information and Communications Technology.",
      tags: ["NEUST", "Academic Excellence", "Leadership"],
    },
    {
      id: "cert-kalinga-capstone",
      title: "Lead Developer — Municipal Capstone Project",
      issuer: "LGU Palayan City & NEUST ICT Evaluation Board",
      date: "Completed 2024",
      status: "ISO/IEC 25010 Evaluated",
      description: "Designed and engineered the municipal welfare architecture for One Palayan-Kalinga Hub, meeting rigorous international software quality standards.",
      tags: ["ISO/IEC 25010", "System Architecture", "Public Welfare"],
    },
    {
      id: "cert-fullstack-spec",
      title: "Full-Stack Web Engineering Certification",
      issuer: "ICT Specialization Board",
      date: "2024",
      status: "Completed with Distinction",
      description: "Certified proficiency in responsive UI development, RESTful APIs, relational schema normalization, and production cloud deployments.",
      tags: ["Full Stack", "React & Next.js", "MySQL & PHP"],
    },
  ];

  // Major Career & Academic Achievements
  const achievementsList = [
    {
      number: "01",
      title: "One Palayan-Kalinga Hub Municipal Deployment",
      category: "Capstone Achievement",
      metric: "100% ISO 25010 Evaluated",
      summary: "Spearheaded the design, frontend, and database architecture of a mission-critical platform serving municipal residents and social welfare officers.",
    },
    {
      number: "02",
      title: "NEUST Academic Scholar & Technical Lead",
      category: "Academic Achievement",
      metric: "Top Tier Standing",
      summary: "Maintained exceptional academic standing while mentoring peers in web development, database normalization, and modern JavaScript frameworks.",
    },
    {
      number: "03",
      title: "Production CI/CD & Multi-System Engineering",
      category: "Engineering Achievement",
      metric: "5+ Systems Built",
      summary: "Architected end-to-end applications from authentication gateways to physics engines with automated GitHub workflows and Vercel cloud hosting.",
    },
  ];

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#050811] relative overflow-hidden border-b border-white/5">
      {/* Background ambient lighting matching alfari.my.id */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading: Centered "Portfolio" matching alfari.my.id */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display">
            Portfolio
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-mono text-gray-400">
            Selected projects, academic credentials, and core technical proficiencies.
          </p>
        </div>

        {/* Tab Pills Nav: [ </> Projects ] [ 🎖 Certificates ] [ 🏆 Achievements ] [ ⚙ Tech Stack ] */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id);
                }}
                onMouseEnter={() => playHoverSound()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#1877F2] text-white shadow-[0_0_25px_rgba(24,119,242,0.6)] scale-105"
                    : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS SHOWCASE (Matching Screenshot 2 from alfari.my.id) */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-[#0B0F19] border border-white/10 hover:border-cyan-400/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
              >
                {/* Project Visual Preview Header */}
                <div className="relative aspect-[16/10] w-full bg-[#121624] overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10" />

                  {/* High Tech Dashboard UI Representation */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        {project.category}
                      </span>
                      <span>v{project.number || "1.0"}</span>
                    </div>

                    <div className="text-center my-auto">
                      <h4 className="text-base sm:text-lg font-black text-white font-mono tracking-wider drop-shadow-md">
                        {project.title.toUpperCase()}
                      </h4>
                      <p className="text-[11px] font-mono text-gray-400 mt-1">
                        {project.tags.slice(0, 3).join(" • ")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                      <span>SECURE DEPLOY</span>
                      <span className="text-emerald-400">STATUS: ACTIVE</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  {/* Bottom Action: "Details →" button matching Screenshot 2 */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        playClickSound();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-gray-300 hover:text-white transition-all duration-300 group-hover:border-cyan-400/50"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CERTIFICATES (Ready for user pictures) */}
        {activeTab === "certificates" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificatesList.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl bg-[#0B0F19] border border-white/10 hover:border-cyan-400/40 p-6 flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Placeholder Frame for Certificate Picture */}
                    <div className="w-full aspect-[4/3] rounded-xl bg-[#141824] border border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-center group-hover:border-cyan-400/50 transition-colors">
                      <Award className="w-10 h-10 text-cyan-400/80 mb-2" />
                      <span className="text-xs font-mono font-bold text-gray-200">{cert.title}</span>
                      <span className="text-[10px] font-mono text-gray-500 mt-1">{cert.issuer}</span>
                      <span className="mt-3 px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-cyan-400 border border-white/10">
                        {cert.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">{cert.title}</h4>
                      <p className="text-xs text-cyan-400 font-mono">{cert.issuer}</p>
                      <p className="text-xs text-gray-400 leading-relaxed pt-1">{cert.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Informative Helper Badge */}
            <div className="p-4 rounded-xl bg-[#121624] border border-white/10 text-center max-w-xl mx-auto text-xs font-mono text-gray-400">
              📌 Certificate images can be seamlessly uploaded and displayed here.
            </div>
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {achievementsList.map((ach) => (
              <div
                key={ach.number}
                className="relative rounded-2xl bg-[#0B0F19] border border-white/10 hover:border-amber-400/50 p-7 flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono text-amber-400/80">{ach.number}</span>
                    <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-mono text-amber-300">
                      {ach.metric}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white">{ach.title}</h4>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">{ach.category}</p>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{ach.summary}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Capstone Milestone</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: TECH STACK (Pixel-Matched to Screenshot 3 from alfari.my.id) */}
        {activeTab === "stack" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 animate-fade-in">
            {techStackList.map((tech) => (
              <div
                key={tech.name}
                onMouseEnter={() => playHoverSound()}
                className="group rounded-2xl bg-[#0B0F19] border border-white/10 hover:border-cyan-400/50 p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] cursor-default"
              >
                <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {tech.svg}
                </div>
                <div className="text-center space-y-0.5">
                  <span className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-white transition-colors block">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 block">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Case Study Modal (when Details is clicked) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0E121E] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-gray-400">{selectedProject.tagline}</p>
            </div>

            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>{selectedProject.description}</p>
              {selectedProject.solution && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono font-bold text-white block mb-1">Architecture &amp; Solution:</span>
                  <p className="text-xs text-gray-400">{selectedProject.solution}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-gray-400 uppercase">Technologies Used:</span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t: string) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-[#141824] text-xs font-mono text-cyan-400 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-mono text-xs font-bold transition-all shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live System</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
