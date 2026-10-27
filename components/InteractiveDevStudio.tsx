"use client";

import React, { useState } from "react";
import { Terminal, Database, CheckCircle2, Play, Code2, Sparkles, Cpu, Layers, ShieldCheck, Laptop } from "lucide-react";

export default function InteractiveDevStudio() {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"pipeline" | "sql" | "quality">("pipeline");
  const [pipelineStep, setPipelineStep] = useState(2);
  const [sqlQuery, setSqlQuery] = useState("SELECT citizen_id, service_type, status FROM aics_cases WHERE status = 'VERIFIED';");
  const [sqlResult, setSqlResult] = useState<any[]>([
    { citizen_id: "PLN-2026-0841", service_type: "Medical Crisis Relief", status: "VERIFIED", disbursement: "₱10,000.00" },
    { citizen_id: "PLN-2026-0912", service_type: "Educational Assistance", status: "VERIFIED", disbursement: "₱5,000.00" },
    { citizen_id: "PLN-2026-1044", service_type: "Emergency Food Support", status: "VERIFIED", disbursement: "In-Kind / Released" },
  ]);

  const pipelineStages = [
    { id: 0, label: "Citizen Booking", sub: "Online Slot Reservation" },
    { id: 1, label: "Pre-Verification", sub: "Document Checklist Validation" },
    { id: 2, label: "CSWDO Intake", sub: "Social Worker Case Assessment" },
    { id: 3, label: "Fund Allocation", sub: "AICS Milestone Tracking" },
    { id: 4, label: "QR Claim Stub", sub: "Disbursement & Final Release" },
  ];

  const runSampleQuery = (type: "cases" | "slots" | "audit") => {
    if (type === "cases") {
      setSqlQuery("SELECT citizen_id, service_type, status FROM aics_cases WHERE status = 'VERIFIED';");
      setSqlResult([
        { citizen_id: "PLN-2026-0841", service_type: "Medical Crisis Relief", status: "VERIFIED", disbursement: "₱10,000.00" },
        { citizen_id: "PLN-2026-0912", service_type: "Educational Assistance", status: "VERIFIED", disbursement: "₱5,000.00" },
        { citizen_id: "PLN-2026-1044", service_type: "Emergency Food Support", status: "VERIFIED", disbursement: "In-Kind / Released" },
      ]);
    } else if (type === "slots") {
      setSqlQuery("SELECT date, morning_quota, afternoon_quota, status FROM appointment_slots ORDER BY date ASC LIMIT 3;");
      setSqlResult([
        { date: "2026-11-02", morning_quota: "25/25 (FULL)", afternoon_quota: "18/25 (OPEN)", status: "ACTIVE" },
        { date: "2026-11-03", morning_quota: "12/25 (OPEN)", afternoon_quota: "10/25 (OPEN)", status: "ACTIVE" },
        { date: "2026-11-04", morning_quota: "0/0 (HOLIDAY)", afternoon_quota: "0/0 (BLACKOUT)", status: "BLACKOUT" },
      ]);
    } else {
      setSqlQuery("SELECT log_id, admin_user, action_performed, timestamp FROM audit_trail ORDER BY id DESC LIMIT 2;");
      setSqlResult([
        { log_id: "LOG-9921", admin_user: "cswdo_officer_1", action_performed: "APPROVED_HOUSING_AKAP", timestamp: "10:42:15 AM" },
        { log_id: "LOG-9920", admin_user: "system_cron", action_performed: "PURGED_EXPIRED_OTP_TOKENS", timestamp: "10:00:00 AM" },
      ]);
    }
  };

  return (
    <section id="dev-studio" className="py-24 bg-[#0A0C14] relative overflow-hidden border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF2A4D]/10 blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>04 / INTERACTIVE WORKSTATION &amp; DEV CONSOLE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              LIVE SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">STUDIO</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            Experience the real architecture of Mon Aaron Marcelo&apos;s software engines in this live interactive workstation console.
          </p>
        </div>

        {/* Laptop Frame Mockup Enclosure */}
        <div className="relative max-w-5xl mx-auto">
          {/* Floating Badges (Similar to the interactive cards in the reference video!) */}
          <div className="hidden lg:flex absolute -top-6 -left-6 z-30 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141624]/90 backdrop-blur-md border border-[#FF2A4D]/40 text-xs font-mono text-white shadow-xl animate-float">
            <span className="w-2 h-2 rounded-full bg-[#FF2A4D] animate-ping" />
            <span>Server-Sent Events: LIVE</span>
          </div>

          <div className="hidden lg:flex absolute -top-6 -right-6 z-30 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141624]/90 backdrop-blur-md border border-emerald-500/40 text-xs font-mono text-white shadow-xl animate-float" style={{ animationDelay: "1.5s" }}>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RA 10173 Privacy Hardened</span>
          </div>

          <div className="hidden lg:flex absolute -bottom-6 -left-6 z-30 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141624]/90 backdrop-blur-md border border-white/15 text-xs font-mono text-white shadow-xl animate-float" style={{ animationDelay: "3s" }}>
            <Database className="w-4 h-4 text-[#FF2A4D]" />
            <span>3NF Normalized Relational DB</span>
          </div>

          {/* Physical Laptop Display Bezel */}
          <div className="rounded-[28px] p-3 sm:p-4 bg-gradient-to-b from-[#2A2D3C] via-[#151824] to-[#0A0C14] border-2 border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            {/* Screen Top Bezel with Camera */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>

              {/* Camera Notch */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/10 text-[11px] font-mono text-gray-400">
                <span className="w-2 h-2 rounded-full bg-[#FF2A4D]" />
                <span className="text-white font-semibold">mon-aaron-studio@neust-server</span>
              </div>

              <div className="text-xs font-mono text-gray-400">
                PHP 8.2 • MySQL
              </div>
            </div>

            {/* Screen Content Window */}
            <div className="bg-[#090A0F] rounded-2xl p-4 sm:p-6 mt-3 border border-white/10 space-y-6">
              {/* Console Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveConsoleTab("pipeline")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                      activeConsoleTab === "pipeline"
                        ? "bg-[#FF2A4D] text-white font-bold shadow-md shadow-[#FF2A4D]/30"
                        : "bg-[#141624] text-gray-400 hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>AICS Workflow Pipeline</span>
                  </button>

                  <button
                    onClick={() => setActiveConsoleTab("sql")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                      activeConsoleTab === "sql"
                        ? "bg-[#FF2A4D] text-white font-bold shadow-md shadow-[#FF2A4D]/30"
                        : "bg-[#141624] text-gray-400 hover:text-white"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Live Relational Query Console</span>
                  </button>

                  <button
                    onClick={() => setActiveConsoleTab("quality")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                      activeConsoleTab === "quality"
                        ? "bg-[#FF2A4D] text-white font-bold shadow-md shadow-[#FF2A4D]/30"
                        : "bg-[#141624] text-gray-400 hover:text-white"
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>ISO/IEC 25010 Quality Benchmark</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  STATUS: OPERATIONAL
                </span>
              </div>

              {/* Tab 1: Interactive Workflow Pipeline */}
              {activeConsoleTab === "pipeline" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>CLICK ANY STAGE TO SIMULATE CITIZEN CASE FLOW:</span>
                    <span className="text-[#FF2A4D]">STAGE {pipelineStep + 1} OF 5</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {pipelineStages.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => setPipelineStep(stage.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                          pipelineStep === stage.id
                            ? "bg-[#1C1F2E] border-[#FF2A4D] shadow-lg shadow-[#FF2A4D]/20 scale-105"
                            : pipelineStep > stage.id
                            ? "bg-[#12141F] border-emerald-500/30 text-gray-300"
                            : "bg-[#0E101A] border-white/5 text-gray-500"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold text-[#FF2A4D]">
                            0{stage.id + 1}
                          </span>
                          {pipelineStep >= stage.id && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          )}
                        </div>
                        <div className="text-xs font-bold text-white mb-0.5">{stage.label}</div>
                        <div className="text-[10px] text-gray-400 line-clamp-1">{stage.sub}</div>
                      </button>
                    ))}
                  </div>

                  {/* Stage Detailed Simulation Box */}
                  <div className="p-4 rounded-xl bg-[#121422] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono text-[#FF2A4D] font-semibold">
                        CURRENT SYSTEM ACTION: {pipelineStages[pipelineStep].label}
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        {pipelineStep === 0 && "Resident inputs barangay ID, selects social assistance type, and locks an automated calendar appointment slot."}
                        {pipelineStep === 1 && "CSWDO staff pre-verifies uploaded barangay certificates, medical abstracts, or enrollment forms."}
                        {pipelineStep === 2 && "Social worker conducts the General Intake Sheet (GIS) assessment and establishes emergency aid qualification."}
                        {pipelineStep === 3 && "Mayor / CSWDO head approval updates the live AICS Kanban board and transmits an automated SMS notification."}
                        {pipelineStep === 4 && "System prints an encrypted QR-coded claim stub for immediate cash or in-kind relief disbursement."}
                      </p>
                    </div>

                    <button
                      onClick={() => setPipelineStep((prev) => (prev + 1) % 5)}
                      className="px-4 py-2 rounded-lg bg-[#FF2A4D] hover:bg-[#E50914] text-xs font-mono font-bold text-white shrink-0 transition-colors"
                    >
                      Advance Stage →
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Live SQL Console */}
              {activeConsoleTab === "sql" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-gray-400">EXECUTE PRESET QUERY:</span>
                    <button
                      onClick={() => runSampleQuery("cases")}
                      className="px-2.5 py-1 rounded bg-[#161828] hover:bg-[#FF2A4D] hover:text-white text-gray-300 border border-white/10 transition-colors"
                    >
                      aics_cases
                    </button>
                    <button
                      onClick={() => runSampleQuery("slots")}
                      className="px-2.5 py-1 rounded bg-[#161828] hover:bg-[#FF2A4D] hover:text-white text-gray-300 border border-white/10 transition-colors"
                    >
                      appointment_slots
                    </button>
                    <button
                      onClick={() => runSampleQuery("audit")}
                      className="px-2.5 py-1 rounded bg-[#161828] hover:bg-[#FF2A4D] hover:text-white text-gray-300 border border-white/10 transition-colors"
                    >
                      audit_trail
                    </button>
                  </div>

                  {/* Terminal Code Block */}
                  <div className="p-3.5 rounded-xl bg-black border border-white/10 font-mono text-xs text-gray-300 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[#FF2A4D] font-bold">mysql&gt;</span>
                      <span className="text-emerald-400 truncate">{sqlQuery}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 shrink-0">0.002 sec</span>
                  </div>

                  {/* Rendered Results Table */}
                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0E101A]">
                    <table className="w-full text-xs font-mono text-left">
                      <thead className="bg-[#141624] text-gray-300 border-b border-white/10">
                        <tr>
                          {Object.keys(sqlResult[0] || {}).map((col) => (
                            <th key={col} className="p-2.5 uppercase tracking-wider text-[11px] font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sqlResult.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            {Object.values(row).map((val: any, vIdx) => (
                              <td key={vIdx} className="p-2.5 text-gray-300">
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: ISO/IEC 25010 Benchmark Radar */}
              {activeConsoleTab === "quality" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#121422] border border-white/10 space-y-3">
                    <div className="text-xs font-mono text-[#FF2A4D] font-semibold uppercase">
                      Software Product Quality Verification
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-normal">
                      Subjected to rigorous testing with CSWDO social workers and IT faculty members under the ISO/IEC 25010:2023 international standard.
                    </p>

                    <div className="space-y-2 pt-2">
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-gray-300 mb-1">
                          <span>Functional Suitability</span>
                          <span className="text-emerald-400 font-bold">100% (Verbal: Very High)</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-emerald-400 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-gray-300 mb-1">
                          <span>Performance Efficiency</span>
                          <span className="text-emerald-400 font-bold">98% (Low Latency)</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[98%] h-full bg-emerald-400 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-gray-300 mb-1">
                          <span>Security &amp; Non-Repudiation</span>
                          <span className="text-emerald-400 font-bold">100% (Data Privacy Compliant)</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-emerald-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#121422] border border-white/10 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#FF2A4D] font-semibold uppercase mb-1">
                        Field Testing Summary
                      </div>
                      <div className="text-xs text-gray-300 leading-relaxed">
                        Evaluated across 8 core dimensions with authenticated user trials in CSWDO Palayan City. The system eliminated paper loss and prevented duplicate aid allocations across local welfare registries.
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-xs text-emerald-400">
                      ✓ Zero Fatal Vulnerabilities
                      <br />
                      ✓ 3NF Normalized Database Verified
                      <br />
                      ✓ Real-Time SSE Notification Confirmed
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Laptop Base / Keyboard Deck Notch */}
            <div className="mt-3 pt-2 flex items-center justify-center">
              <div className="w-32 h-1 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
