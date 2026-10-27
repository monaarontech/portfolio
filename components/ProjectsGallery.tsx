"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SUPPORTING_PROJECTS, Project } from "@/data/portfolioData";
import { ExternalLink, Github, ArrowUpRight, Shield, Activity, Code, Database, X, CheckCircle2 } from "lucide-react";

export default function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getCategoryIcon = (category: string) => {
    if (category.includes("Security")) return Shield;
    if (category.includes("Systems") || category.includes("Lab")) return Activity;
    if (category.includes("Game") || category.includes("Science")) return Code;
    return Database;
  };

  return (
    <section id="projects" className="py-24 bg-[#090A0F] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>03 / SELECTED ARCHITECTURES &amp; SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              VERIFIED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">PROJECTS</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            Functional backend engines, academic infrastructure monitors, and algorithmic implementations built with production intent.
          </p>
        </div>

        {/* 2x2 Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUPPORTING_PROJECTS.map((project) => {
            const Icon = getCategoryIcon(project.category);
            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-[#0E1018] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF2A4D]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF2A4D]/10"
              >
                <div>
                  {/* Top Bar: Number + Category Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-3xl font-black font-mono text-[#FF2A4D]/50 group-hover:text-[#FF2A4D] transition-colors">
                      {project.number}
                    </span>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                      <Icon className="w-3.5 h-3.5 text-[#FF2A4D]" />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FF2A4D] font-mono mb-4">
                    {project.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#141624] border border-white/5 text-[11px] font-mono text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#FF2A4D] transition-colors"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="View GitHub Repository"
                      aria-label="View repository on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-[#0F111A] border border-white/15 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#FF2A4D] uppercase tracking-wider block mb-1">
                  PROJECT {selectedProject.number} • {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-gray-400 mt-1">{selectedProject.tagline}</p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Overview</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#141624] border border-red-500/20">
                  <h5 className="text-xs font-mono font-semibold text-red-400 mb-1 uppercase">Problem Context</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.problem}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#141624] border border-emerald-500/20">
                  <h5 className="text-xs font-mono font-semibold text-emerald-400 mb-1 uppercase">Implemented Solution</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.solution}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Key Engineering Highlights</h4>
                <div className="space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF2A4D] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#141624] border border-white/10 text-xs font-mono text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs font-mono text-gray-400">
                  Mon Aaron Marcelo • Portfolio Archive
                </div>

                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#FF2A4D] hover:bg-[#E50914] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
