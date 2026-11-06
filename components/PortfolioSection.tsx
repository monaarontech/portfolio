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
  Maximize2,
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/utils/soundEffects";
import { FLAGSHIP_PROJECT, SUPPORTING_PROJECTS, Project } from "@/data/portfolioData";

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "achievements" | "stack">("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(null);

  const allProjects: Project[] = [FLAGSHIP_PROJECT, ...SUPPORTING_PROJECTS];

  const tabs = [
    { id: "projects", label: "Projects", icon: Code2 },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "stack", label: "Tech Stack", icon: Layers },
  ] as const;

  // Real Verified Certificates Uploaded by Mon Aaron Marcelo
  const certificatesList = [
    {
      id: "cert-neust-academic-excellence",
      title: "Certificate of Academic Excellence",
      issuer: "Nueva Ecija University of Science and Technology (NEUST)",
      date: "February 13, 2026",
      status: "Dean's Honor List • GWA 1.55",
      image: "/images/certificates/cert-neust-academic-excellence.png",
      credentialId: "NEUST-FUSO-HONOR-2026",
      description:
        "Conferred by NEUST Honor Society and University President Dr. Rhodora R. Jugo for remarkable scholastic achievement in Bachelor of Science in Information Technology (BSIT) with an outstanding 1.55 General Weighted Average.",
      tags: ["NEUST", "Academic Excellence", "GWA 1.55", "BSIT Honor Society"],
      isHonor: true,
    },
    {
      id: "cert-dict-google-workspace",
      title: "ICT Skills Training: Google Workspace",
      issuer: "DICT Region III & ILCDB",
      date: "August 11, 2026",
      status: "Verified Official Credential",
      image: "/images/certificates/cert-dict-google-workspace.jpg",
      credentialId: "2026-08-PAM-WB-02-OL-381",
      description: "Official 3-hour competency training on professional Google Workspace collaboration tools conducted by DICT Region 3.",
      tags: ["DICT Region III", "Google Workspace", "Cloud Tools"],
    },
    {
      id: "cert-dict-ai-business",
      title: "Introduction to AI for Business Advertising",
      issuer: "DICT Region II & Quirino Provincial Office",
      date: "August 6, 2026",
      status: "Verified Official Credential",
      image: "/images/certificates/cert-dict-ai-business.jpg",
      credentialId: "ILCD_R2_ISDDL_2026_73",
      description: "Explored artificial intelligence integration in modern digital advertising, content creation, and MSME growth strategies.",
      tags: ["DICT Region II", "Artificial Intelligence", "MSME Strategy"],
    },
    {
      id: "cert-techacademy-ccna",
      title: "Growing Your I.T. Career: CCNA Networking",
      issuer: "Tech Academy (Billy Ramirez IT Solutions)",
      date: "August 1, 2026",
      status: "Verified Official Credential",
      image: "/images/certificates/cert-techacademy-ccna.jpg",
      credentialId: "YFNNAS-CE000213",
      description: "Webinar on Cisco Certified Network Associate (CCNA) fundamentals, routing & switching protocols, and network architecture.",
      tags: ["Tech Academy", "CCNA", "Networking"],
    },
    {
      id: "cert-dict-gamedev",
      title: "PRESS START: Game Development in Modern Era",
      issuer: "DICT Regional Office VIII & IIDB",
      date: "August 17, 2026",
      status: "Verified Official Credential",
      image: "/images/certificates/cert-dict-gamedev.jpg",
      credentialId: "DICT Region VIII IIDB",
      description: "Technical workshop on hobbyist and modern game development pipelines, interactive physics, and digital creative production.",
      tags: ["DICT Region VIII", "Game Development", "Interactive Tech"],
    },
    {
      id: "cert-techacademy-it-cert",
      title: "How to Grow Your Career with IT Certifications",
      issuer: "Tech Academy (Billy Ramirez IT Solutions)",
      date: "October 3, 2026",
      status: "Verified Official Credential",
      image: "/images/certificates/cert-techacademy-it-cert.jpg",
      credentialId: "TAPH-CE000251",
      description: "Strategic insights into IT certification roadmaps, industry qualifications, and professional engineering pathways.",
      tags: ["Tech Academy", "Career Strategy", "IT Certifications"],
    },
  ];

  // Major Career & Academic Achievements
  const achievementsList = [
    {
      number: "01",
      title: "NEUST Certificate of Academic Excellence (GWA: 1.55)",
      category: "Academic Honor",
      metric: "1.55 GWA Honor Society",
      summary: "Conferred by University President Dr. Rhodora R. Jugo, VP Engr. Feliciana P. Jacoba, and Dean Ma. Lourdes R. Quijano for remarkable scholastic achievement in BSIT for the 2nd Semester AY 2024–2025.",
    },
    {
      number: "02",
      title: "One Palayan-Kalinga Hub Municipal Deployment",
      category: "Flagship Civic Capstone",
      metric: "CSWDO Palayan City",
      summary: "Spearheaded the architecture and deployment of the municipal welfare operations platform, serving 847+ appointments and managing ₱1.2M+ in AICS social assistance funds.",
    },
    {
      number: "03",
      title: "University Student Government Voting System (v2.0)",
      category: "Campus Systems",
      metric: "Enhanced v2.0 Platform",
      summary: "Engineered a secure campus election platform with real-time ballot verification, multiple candidate positions, and student voter receipt issuance.",
    },
  ];

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
                {/* Project Visual Preview Header with Authentic System Screenshot */}
                <div className="relative aspect-[16/10] w-full bg-[#121624] overflow-hidden border-b border-white/10">
                  {project.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/25 to-black/40 z-10" />

                  {/* High Tech Dashboard UI Representation */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between z-20">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-cyan-400 border border-white/15 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-gray-300 border border-white/10">
                        v{project.number || "1.0"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-gray-300 border border-white/10">
                        {project.tags.slice(0, 2).join(" • ")}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 backdrop-blur-md text-emerald-400 border border-emerald-500/30 font-bold">
                        VERIFIED SYSTEM
                      </span>
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
                        setModalImageIndex(0);
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

        {/* TAB 2: CERTIFICATES (With Real User Uploaded Certificates & Lightbox) */}
        {activeTab === "certificates" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificatesList.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedCertificate(cert);
                  }}
                  className={`group rounded-2xl bg-[#0B0F19] p-5 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.85)] cursor-pointer ${
                    cert.isHonor
                      ? "border border-amber-400/40 hover:border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.12)]"
                      : "border border-white/10 hover:border-cyan-400/50"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Real Certificate Image Preview with Zoom Indicator */}
                    <div className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#141824] border transition-colors ${
                      cert.isHonor ? "border-amber-400/30 group-hover:border-amber-400/60" : "border-white/10 group-hover:border-cyan-400/50"
                    }`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 justify-between">
                        <span className={`text-[10px] font-mono flex items-center gap-1 ${cert.isHonor ? "text-amber-300" : "text-cyan-300"}`}>
                          <Maximize2 className="w-3 h-3" /> Click to view full certificate
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500">{cert.date}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                          cert.isHonor
                            ? "bg-amber-400/15 text-amber-300 border-amber-400/35"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/25"
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                      <h4 className={`text-base font-bold transition-colors ${
                        cert.isHonor ? "text-white group-hover:text-amber-300" : "text-white group-hover:text-cyan-400"
                      }`}>
                        {cert.title}
                      </h4>
                      <p className={`text-xs font-mono ${cert.isHonor ? "text-amber-400/90" : "text-cyan-400"}`}>{cert.issuer}</p>
                      <p className="text-xs text-gray-400 leading-relaxed pt-1 line-clamp-2">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          cert.isHonor ? "bg-amber-400/10 text-amber-300/90 border border-amber-400/20" : "bg-white/5 text-gray-400"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Informative Helper Badge */}
            <div className="p-4 rounded-xl bg-[#121624] border border-white/10 text-center max-w-xl mx-auto text-xs font-mono text-gray-400 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>More official certifications being added soon.</span>
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

      {/* Certificate Lightbox Modal (Click on any certificate to view high-res) */}
      {selectedCertificate && (
        <div
          onClick={() => setSelectedCertificate(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-[#0E121E] border border-white/20 p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedCertificate.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {selectedCertificate.issuer} &bull; {selectedCertificate.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="w-full max-h-[70vh] object-contain rounded-xl select-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400 pt-2">
              <span>Credential ID: <strong className="text-white">{selectedCertificate.credentialId}</strong></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Official Verified Issuer
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Project Case Study Modal (when Details is clicked) */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl bg-[#0E121E] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
          >
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

            {/* High-Resolution System Screenshot Preview */}
            <div className="space-y-3">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    selectedProject.galleryImages?.[modalImageIndex]?.url ||
                    selectedProject.coverImage
                  }
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono text-white border border-white/10 shadow-md">
                    {selectedProject.galleryImages?.[modalImageIndex]?.caption || selectedProject.title}
                  </span>
                </div>
              </div>

              {/* Multi-Screenshot Gallery Switcher if available */}
              {selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProject.galleryImages.map((img, idx) => (
                    <button
                      key={img.url}
                      onClick={() => setModalImageIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                        modalImageIndex === idx
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,216,255,0.2)]"
                          : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {img.tag || `Screen ${idx + 1}`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* System Overview, Problem & Solution */}
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <p>{selectedProject.description}</p>

              {selectedProject.solution && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400 block uppercase tracking-wider">
                    Architecture &amp; Implementation:
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.solution}</p>
                </div>
              )}
            </div>

            {/* Core Features */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                  Key System Modules &amp; Capabilities:
                </span>
                <div className="space-y-1.5">
                  {selectedProject.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Metrics & Stats */}
            {selectedProject.stats && selectedProject.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {selectedProject.stats.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#141824] border border-white/10 text-center">
                    <span className="text-[10px] font-mono text-gray-400 block">{s.label}</span>
                    <span className="text-sm font-bold font-mono text-white mt-0.5 block">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies Used */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-gray-400 uppercase">Technologies Used:</span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t: string) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-[#141824] text-xs font-mono text-cyan-400 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center gap-3">
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
