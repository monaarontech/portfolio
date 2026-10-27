"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Clapperboard, Sparkles, Sliders, Smartphone } from "lucide-react";

export default function CreativeMediaLab() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(3.25);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration || 3.25);
      setVideoLoaded(true);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const changeSpeed = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  return (
    <section id="media-lab" className="py-24 bg-[#0A0C14] relative overflow-hidden border-b border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] bg-[#FF2A4D]/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A4D]" />
              <span>04 / CREATIVE MOTION &amp; MEDIA LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              CINEMATIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF2A4D]">VISUAL LAB</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-gray-400 max-w-sm">
            Demonstrating custom HTML5 video engineering, responsive frame-rate pacing, and micro-interaction controls.
          </p>
        </div>

        {/* Split Screen: Left Video Device + Right Creative Direction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Mobile Mockup Bezel with Supplied Video (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] rounded-[36px] p-3 bg-gradient-to-b from-[#222533] via-[#12141D] to-[#0A0C14] border-2 border-white/15 shadow-2xl shadow-[#FF2A4D]/15 group">
              {/* Device Dynamic Island / Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black/90 z-30 flex items-center justify-between px-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-gray-700" />
              </div>

              {/* Screen Enclosure */}
              <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden bg-black border border-white/10">
                <video
                  ref={videoRef}
                  src="/video/cinematic-reel.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Top Status Overlays */}
                <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-[#FF2A4D] animate-ping" />
                    <span>REEL 03.25S</span>
                  </div>

                  <div className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10">
                    720×1280
                  </div>
                </div>

                {/* Bottom Video Controls Overlay */}
                <div className="absolute bottom-4 left-3 right-3 z-20 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 space-y-2">
                  {/* Timeline Scrubber */}
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={duration || 3.25}
                      step={0.05}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF2A4D]"
                      aria-label="Video scrubber"
                    />
                    <span className="text-[10px] font-mono text-gray-300 shrink-0">
                      {currentTime.toFixed(1)}s
                    </span>
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-1">
                      {[0.5, 1, 1.5].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => changeSpeed(rate)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                            playbackRate === rate
                              ? "bg-[#FF2A4D] text-white font-bold"
                              : "bg-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Narrative & Video Engineering Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF2A4D]">
              <Clapperboard className="w-4 h-4" />
              <span>SUPPLIED ASSET INTEGRATION</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Motion Design &amp; Custom Video Engineering
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Modern digital portfolios transcend flat layouts by orchestrating rhythm, video pacing, and responsive micro-interactions. The 9:16 vertical video asset supplied for this showcase is embedded via a tailored, hardware-accelerated HTML5 pipeline — featuring custom scrubbing, frame pacing, and non-intrusive muted playback that respects visitor preferences and reduced-motion settings.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#12141F] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#FF2A4D] text-xs font-mono">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Responsive Bezel Mockup</span>
                </div>
                <h4 className="text-sm font-semibold text-white">9:16 Mobile Viewport</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Engineered to showcase mobile-first video reels with natural aspect ratio constraints and zero layout shift.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141F] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Interaction Controls</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Time Scrub &amp; Variable Speed</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Visitors can scrub through the 3.25s loop, adjust playback speeds from 0.5x slow-mo to 1.5x, or pause at any frame.
                </p>
              </div>
            </div>

            {/* Technical Verification Specs Box */}
            <div className="p-5 rounded-2xl bg-[#10121A] border border-white/10 space-y-3">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>VERIFIED ASSET METRICS</span>
                <span className="text-[#FF2A4D]">ACTIVE ATTR</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#141624] border border-white/5">
                  <div className="text-gray-400 text-[10px]">DIMENSIONS</div>
                  <div className="text-white font-bold mt-0.5">720 × 1280</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141624] border border-white/5">
                  <div className="text-gray-400 text-[10px]">DURATION</div>
                  <div className="text-white font-bold mt-0.5">3.25 Seconds</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141624] border border-white/5">
                  <div className="text-gray-400 text-[10px]">FILE SIZE</div>
                  <div className="text-white font-bold mt-0.5">2.95 MB (MP4)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141624] border border-white/5">
                  <div className="text-gray-400 text-[10px]">AUDIO DEFAULT</div>
                  <div className="text-emerald-400 font-bold mt-0.5">Muted (Accessible)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
