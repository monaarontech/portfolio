"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Github, MapPin, Copy, Check, Send, Sparkles, ArrowUpRight, GraduationCap, Laptop, Coffee, Terminal } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage("Please fill out all required fields.");
      return;
    }

    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Mon Aaron,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoUrl;
    setStatusMessage("Opening your email client to send message... Thank you!");
  };

  return (
    <section id="contact" className="py-24 bg-[#07070A] relative overflow-hidden border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[650px] h-[500px] bg-[#FF2A4D]/15 blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>07 / GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              LET&apos;S WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">TOGETHER</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            I&apos;m currently open for new software engineering opportunities, civic collaborations, and technical partnerships.
          </p>
        </div>

        {/* 2-Column Grid: Left Details & Form + Right Laptop Mockup Setup (Matching Reference Poster!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Info & Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AVAILABLE FOR FREELANCE &amp; FULL-TIME ROLES</span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Let&apos;s build something that drives measurable impact. Whether you need an enterprise civic portal, a hardened backend security architecture, or a modern full-stack web application, reach out directly.
              </p>
            </div>

            {/* Direct Channels Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#0F111A] border border-white/10 space-y-2 group hover:border-[#FF2A4D]/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Mail className="w-4 h-4 text-[#FF2A4D]" />
                    <span>EMAIL DIRECT</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="text-[11px] font-mono text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-mono font-bold text-white hover:text-[#FF2A4D] transition-colors block truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F111A] border border-white/10 space-y-2 group hover:border-[#FF2A4D]/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Github className="w-4 h-4 text-white" />
                    <span>GITHUB REPOSITORIES</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF2A4D] transition-colors" />
                </div>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-mono font-bold text-white hover:text-[#FF2A4D] transition-colors block"
                >
                  github.com/monaarontech
                </a>
              </div>
            </div>

            {/* Interactive Message Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0F111A] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>QUICK CONTACT FORM</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141624] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-400">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141624] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-gray-400">PROJECT / INQUIRY MESSAGE</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share a brief overview of what you'd like to build..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141624] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D] resize-none"
                />
              </div>

              {statusMessage && (
                <div className="p-3 rounded-xl bg-[#FF2A4D]/15 border border-[#FF2A4D]/30 text-xs font-mono text-white">
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2A4D] to-[#E50914] shadow-lg shadow-[#FF2A4D]/30 hover:shadow-[#FF2A4D]/50 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Message</span>
              </button>
            </form>
          </div>

          {/* Right Column: High-End Workstation & Laptop Mockup (Matching the Reference Poster!) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* The Stylized Dark Laptop Mockup */}
            <div className="relative w-full max-w-[420px] rounded-3xl p-4 bg-gradient-to-br from-[#1C1F2E] via-[#10121B] to-[#0A0C14] border-2 border-white/15 shadow-2xl space-y-3 group hover:border-[#FF2A4D]/50 transition-all">
              {/* Screen Top Bezel */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10 px-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-[10px] font-mono text-gray-400">monaaron-terminal</span>
                <Terminal className="w-3.5 h-3.5 text-[#FF2A4D]" />
              </div>

              {/* Screen Content: Live Interactive Code & Branding */}
              <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs space-y-3">
                <div className="text-gray-400 text-[11px]">
                  <span className="text-[#FF2A4D] font-bold">const</span> developer = &#123;
                </div>
                <div className="pl-4 text-[11px] space-y-1">
                  <div>name: <span className="text-emerald-400">&quot;Mon Aaron Marcelo&quot;</span>,</div>
                  <div>focus: <span className="text-emerald-400">&quot;Civic Software Architect&quot;</span>,</div>
                  <div>flagship: <span className="text-[#FF2A4D]">&quot;Palayan Kalinga Hub&quot;</span>,</div>
                  <div>status: <span className="text-yellow-400">&quot;Ready to Build&quot;</span>,</div>
                  <div>response_time: <span className="text-cyan-400">&quot;&lt; 24 Hours&quot;</span></div>
                </div>
                <div className="text-gray-400 text-[11px]">&#125;;</div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-500">
                  <span>NEUST Atate Campus</span>
                  <span className="text-[#FF2A4D]">15.54° N, 121.08° E</span>
                </div>
              </div>

              {/* Laptop Keyboard Lip Notch */}
              <div className="pt-1 flex items-center justify-center">
                <div className="w-24 h-1 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Coffee Mug Accent (Echoing the reference poster mug with initial "M"!) */}
            <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#12141F] border border-white/10 text-xs font-mono text-gray-300">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF2A4D] to-[#990011] flex items-center justify-center font-bold text-white shadow-sm">
                M
              </div>
              <div>
                <div className="text-white font-semibold">Fueling Innovation</div>
                <div className="text-[10px] text-gray-400">Coffee &amp; Clean Code</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
