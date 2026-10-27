"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Github, MapPin, Copy, Check, Send, Sparkles, ArrowUpRight, GraduationCap } from "lucide-react";

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

    // Compose formatted mailto link
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Mon Aaron,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoUrl;
    setStatusMessage("Opening your email client to send message... Thank you!");
  };

  return (
    <section id="contact" className="py-24 bg-[#090A0F] relative overflow-hidden border-b border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-[#FF2A4D]/15 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>07 / GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              LET&apos;S BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">SOMETHING MEANINGFUL</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            Whether for software engineering roles, civic technology collaborations, or capstone inquiries, I am eager to connect.
          </p>
        </div>

        {/* Contact Layout: Left Details + Right Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels & Verified Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Direct Contact &amp; Verified Channels
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              Based in Palayan City, Nueva Ecija, available for full-stack engineering, civic software consultations, and forward-thinking development roles.
            </p>

            {/* Email Action Card */}
            <div className="p-5 rounded-2xl bg-[#12141F] border border-white/10 space-y-3 relative overflow-hidden group hover:border-[#FF2A4D]/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <Mail className="w-4 h-4 text-[#FF2A4D]" />
                  <span>PRIMARY EMAIL</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base sm:text-lg font-mono font-bold text-white hover:text-[#FF2A4D] transition-colors block truncate"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* GitHub Card */}
            <div className="p-5 rounded-2xl bg-[#12141F] border border-white/10 space-y-2 group hover:border-[#FF2A4D]/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <Github className="w-4 h-4 text-white" />
                  <span>SOURCE CODE REPOSITORIES</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF2A4D] transition-colors" />
              </div>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-base font-mono font-bold text-white hover:text-[#FF2A4D] transition-colors block"
              >
                github.com/monaarontech
              </a>
              <p className="text-xs text-gray-400">
                Home of One Palayan-Kalinga Hub and open source code repositories.
              </p>
            </div>

            {/* Campus & Location Card */}
            <div className="p-5 rounded-2xl bg-[#12141F] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <MapPin className="w-4 h-4 text-[#FF2A4D]" />
                <span>LOCATION &amp; ACADEMIC BASE</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {PERSONAL_INFO.location}
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>NEUST Atate Campus • BS Information Technology</span>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#0F111A] border border-white/10 shadow-2xl relative">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SEND A DIRECT MESSAGE</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">
                      Your Name <span className="text-[#FF2A4D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">
                      Your Email <span className="text-[#FF2A4D]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">
                    Message <span className="text-[#FF2A4D]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2A4D] resize-none"
                  />
                </div>

                {statusMessage && (
                  <div className="p-3 rounded-xl bg-[#FF2A4D]/15 border border-[#FF2A4D]/30 text-xs font-mono text-white">
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF2A4D] to-[#E50914] shadow-lg shadow-[#FF2A4D]/25 hover:shadow-[#FF2A4D]/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via Email</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
