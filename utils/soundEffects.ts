// Web Audio API synthesized sound effects
// 100% native, zero dependencies, zero external audio files, instant playback

let audioCtx: AudioContext | null = null;
let isMuted = false;

// Initialize or resume AudioContext safely on user gesture
export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isMuted = muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_sound_muted", muted ? "true" : "false");
  }
}

export function getSoundMuted(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("portfolio_sound_muted");
  return stored === "true";
}

// Gentle UI Hover Click
export function playHoverSound() {
  if (isMuted || getSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

// Mechanical / Arcade Click
export function playClickSound() {
  if (isMuted || getSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // ignore
  }
}

// Star Catch / Success point chime
export function playScoreSound() {
  if (isMuted || getSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    // C6 -> E6 rapid arpeggio
    osc1.frequency.setValueAtTime(1046.5, now);
    osc1.frequency.setValueAtTime(1318.5, now + 0.06);

    osc2.frequency.setValueAtTime(523.25, now);
    osc2.frequency.setValueAtTime(659.25, now + 0.06);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.18);
    osc2.stop(now + 0.18);
  } catch {
    // ignore
  }
}

// Bug / Error Buzz
export function playErrorSound() {
  if (isMuted || getSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // ignore
  }
}

// Victory / Achievement Fanfare
export function playVictorySound() {
  if (isMuted || getSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime + i * 0.09);

      const noteDuration = i === notes.length - 1 ? 0.45 : 0.12;
      gain.gain.setValueAtTime(0.14, startTime + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.09 + noteDuration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.09);
      osc.stop(startTime + i * 0.09 + noteDuration);
    });
  } catch {
    // ignore
  }
}

// Card Flip Snap
export function playCardFlipSound() {
  if (isMuted || getSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // ignore
  }
}
