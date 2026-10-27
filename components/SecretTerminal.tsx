"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, CornerDownLeft } from "lucide-react";
import { playClickSound, playVictorySound } from "@/utils/soundEffects";
import { triggerAchievementUnlock } from "@/components/AchievementSystem";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export function openSecretTerminal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("portfolio:open_terminal"));
}

export default function SecretTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Global backtick/tilde keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on ` or ~ (unless currently typing in a real form input)
      if (
        (e.key === "`" || e.key === "~") &&
        !(e.target instanceof HTMLInputElement && e.target !== inputRef.current) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("portfolio:open_terminal", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("portfolio:open_terminal", handleCustomOpen);
    };
  }, []);

  // Focus input and scroll to bottom on open or history change
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  // Initial greeting
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          command: "init",
          output: (
            <div className="space-y-2 text-xs font-mono text-gray-300">
              <pre className="text-[#FF2A4D] font-bold leading-tight select-none text-[10px] sm:text-xs">
{` __  __             _                      
|  \\/  | ___  _ __  / \\   __ _ _ __ ___  _ __  
| |\\/| |/ _ \\| '_ \\ / _ \\ / _\` | '__/ _ \\| '_ \\ 
| |  | | (_) | | | / ___ \\ (_| | | | (_) | | | |
|_|  |_|\\___/|_| |/_/   \\_\\__,_|_|  \\___/|_| |_|`}
              </pre>
              <p className="text-gray-400">
                Mon Aaron Marcelo — Architectural Dev Console v2.4.0
              </p>
              <p className="text-emerald-400">
                Type <span className="text-white font-bold underline">help</span> to view available commands. Press <span className="text-white font-bold">`</span> or <span className="text-white font-bold">ESC</span> to exit.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, [history.length]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    playClickSound();

    if (!trimmed) return;

    // Add to history navigation list
    setCmdHistoryList((prev) => [...prev, cmdText]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-gray-300">
            <p className="text-[#FF2A4D] font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <div><span className="text-emerald-400 font-bold">about</span> - Developer identity &amp; scholar background</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - View flagship civic capstone details</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - Inspect full architectural tech stack</div>
              <div><span className="text-emerald-400 font-bold">matrix</span> - Toggle cyber green digital rain</div>
              <div><span className="text-emerald-400 font-bold">games</span> - Jump to Developer Playground arcade</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Show communication channels &amp; links</div>
              <div><span className="text-emerald-400 font-bold">easteregg</span> - Secret developer easter egg</div>
              <div><span className="text-emerald-400 font-bold">sudo</span> - Request root administrative privileges</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Flush the terminal console screen</div>
              <div><span className="text-emerald-400 font-bold">exit</span> - Terminate developer session</div>
            </div>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-gray-300">
            <p className="text-white font-bold">DEVELOPER PROFILE:</p>
            <p>• Name: <span className="text-white">Mon Aaron Marcelo</span></p>
            <p>• Institution: <span className="text-white">Nueva Ecija University of Science and Technology (NEUST Atate)</span></p>
            <p>• Degree: <span className="text-white">BS Information Technology (BSIT)</span></p>
            <p>• Location: <span className="text-white">Palayan City, Nueva Ecija, Philippines</span></p>
            <p>• Specialization: <span className="text-white">Full-Stack Civic Technologies, Scalable Database Systems &amp; High-Interaction Web Platforms</span></p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-gray-300">
            <p className="text-white font-bold">ENGINEERED PROJECTS:</p>
            <p className="text-[#FF2A4D] font-bold">1. One Palayan-Kalinga Hub (Flagship Capstone)</p>
            <p className="text-gray-400">
              Integrated civic assistance management platform for CSWDO Palayan City. Evaluated under ISO/IEC 25010:2023 with 100% standard compliance across 8 quality dimensions.
            </p>
            <p className="text-[#FF2A4D] font-bold mt-2">2. Civic Tech Simulator &amp; SQL Sandbox</p>
            <p className="text-gray-400">
              In-browser interactive laboratory demonstrating real-time data verification and civic analytics.
            </p>
            <p className="pt-1">
              <a href="#flagship" onClick={() => setIsOpen(false)} className="text-emerald-400 hover:underline">
                → Scroll to flagship showcase
              </a>
            </p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-gray-300">
            <p className="text-white font-bold">ARCHITECTURAL TECH STACK:</p>
            <p><span className="text-cyan-400">• Frontend:</span> Next.js 14, React 18, TypeScript, Tailwind CSS, HTML5 Canvas</p>
            <p><span className="text-indigo-400">• Backend:</span> PHP 8.x, Node.js, RESTful APIs, Session Security Architectures</p>
            <p><span className="text-emerald-400">• Databases:</span> MySQL, Relational Schema Design, Foreign Key Cascades, Index Optimization</p>
            <p><span className="text-rose-400">• Methodologies:</span> Agile Scrum, ISO/IEC 25010:2023 Software Product Quality Standards</p>
          </div>
        );
        break;

      case "matrix":
        setIsMatrixMode((prev) => !prev);
        outputNode = (
          <p className="text-xs font-mono text-emerald-400">
            Matrix protocol {isMatrixMode ? "DEACTIVATED" : "ACTIVATED"}. Entering the cyber stream...
          </p>
        );
        break;

      case "games":
      case "playground":
        setIsOpen(false);
        const playgroundEl = document.getElementById("playground");
        if (playgroundEl) {
          playgroundEl.scrollIntoView({ behavior: "smooth" });
        }
        return;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-gray-300">
            <p className="text-white font-bold">COMMUNICATION ENDPOINTS:</p>
            <p>• GitHub: <a href="https://github.com/monaarontech" target="_blank" rel="noreferrer" className="text-[#FF2A4D] underline">github.com/monaarontech</a></p>
            <p>• Email: <a href="mailto:aaronmarcelo0325@gmail.com" className="text-[#FF2A4D] underline">aaronmarcelo0325@gmail.com</a></p>
            <p>• Location: Palayan City, Nueva Ecija (15.5398° N, 121.0841° E)</p>
          </div>
        );
        break;

      case "easteregg":
      case "secret":
        triggerAchievementUnlock("secret_agent");
        playVictorySound();
        outputNode = (
          <div className="p-3 rounded-lg bg-[#FF2A4D]/10 border border-[#FF2A4D]/40 text-xs font-mono text-white space-y-1">
            <p className="text-[#FF2A4D] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EASTER EGG DISCOVERED: &quot;Zero-Day Explorer&quot;!</span>
            </p>
            <p className="text-gray-300">
              &quot;First, solve the problem. Then, write the code.&quot; — You found Aaron&apos;s secret developer backdoor!
            </p>
            <p className="text-emerald-400 text-[11px]">
              Achievement &quot;Zero-Day Explorer&quot; has been recorded in your local trophy cache.
            </p>
          </div>
        );
        break;

      case "sudo":
        outputNode = (
          <p className="text-xs font-mono text-amber-400">
            Permission denied: Mon Aaron already granted you guest root status on this portfolio. No privilege escalation needed!
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
        setIsOpen(false);
        return;

      default:
        outputNode = (
          <p className="text-xs font-mono text-rose-400">
            command not found: &apos;{trimmed}&apos;. Type <span className="underline font-bold text-white">help</span> for a list of available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output: outputNode }]);
    setInputVal("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistoryList.length > 0) {
        const newIdx = historyIndex + 1 < cmdHistoryList.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIdx);
        setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - newIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - newIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          isMaximized ? "h-[94vh] max-w-6xl" : "h-[70vh] max-h-[580px] max-w-2xl"
        } bg-[#0A0B10] border border-white/15 rounded-2xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden transition-all duration-200`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-[#11131C] border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
              title="Close (ESC)"
            />
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors"
              title="Toggle Size"
            />
            <button
              onClick={() => setIsMatrixMode((prev) => !prev)}
              className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors"
              title="Toggle Matrix Mode"
            />
            <div className="ml-3 flex items-center gap-1.5 text-xs font-mono text-gray-400">
              <TerminalIcon className="w-3.5 h-3.5 text-[#FF2A4D]" />
              <span className="text-gray-200 font-semibold">mon-aaron@portfolio: ~</span>
              <span className="text-gray-500">(bash)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className={`flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm ${
            isMatrixMode ? "text-emerald-400 bg-[#020D08]" : "text-gray-200 bg-[#07080D]"
          }`}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              {item.command !== "init" && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-[#FF2A4D] font-bold">mon-aaron:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
              )}
              <div className="pl-0">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <div className="px-4 py-3 bg-[#0D0E16] border-t border-white/10 flex items-center gap-2">
          <span className="text-[#FF2A4D] font-mono font-bold text-xs sm:text-sm shrink-0">
            mon-aaron:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type 'help', 'about', 'projects', 'games'..."
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-gray-600"
            autoFocus
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="px-2.5 py-1 rounded bg-[#FF2A4D]/20 hover:bg-[#FF2A4D]/40 text-[#FF2A4D] text-xs font-mono flex items-center gap-1 transition-colors"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
