// Audio Manager for NORMAKITA Digital
// Uses Web Audio API for zero-dependency, copyright-free sound effects & background music,
// and Web Speech Synthesis API for Si Norma mascot voice in Indonesian (id-ID).

export type AudioState = {
  enabled: boolean;
  bgmEnabled: boolean;
  voiceEnabled: boolean;
  volume: number; // 0 to 1
};

const STORAGE_KEY = "normakita-audio-settings";

const defaultState: AudioState = {
  enabled: false,
  bgmEnabled: true,
  voiceEnabled: true,
  volume: 0.7,
};

let audioState: AudioState = { ...defaultState };
const listeners = new Set<() => void>();

function loadSettings() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      audioState = { ...defaultState, ...JSON.parse(raw) };
    }
  } catch {
    // Ignore storage errors
  }
}

function saveSettings() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(audioState));
  } catch {
    // Ignore storage errors
  }
  listeners.forEach((l) => l());
}

loadSettings();

export const audioStore = {
  get: () => audioState,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  toggleMaster() {
    audioState.enabled = !audioState.enabled;
    if (audioState.enabled) {
      startBgm();
    } else {
      stopBgm();
      stopVoice();
    }
    saveSettings();
  },
  toggleBgm() {
    audioState.bgmEnabled = !audioState.bgmEnabled;
    if (audioState.enabled && audioState.bgmEnabled) {
      startBgm();
    } else {
      stopBgm();
    }
    saveSettings();
  },
  toggleVoice() {
    audioState.voiceEnabled = !audioState.voiceEnabled;
    if (!audioState.voiceEnabled) {
      stopVoice();
    }
    saveSettings();
  },
  setVolume(vol: number) {
    audioState.volume = Math.max(0, Math.min(1, vol));
    if (masterGain && ctx) {
      masterGain.gain.setValueAtTime(audioState.volume, ctx.currentTime);
    }
    saveSettings();
  },
};

// Web Audio API context
let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let bgmGain: GainNode | null = null;
let bgmInterval: ReturnType<typeof setInterval> | null = null;
let isDucking = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(audioState.volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    bgmGain = ctx.createGain();
    bgmGain.gain.setValueAtTime(0.18, ctx.currentTime);
    bgmGain.connect(masterGain);
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

// BGM: Pentatonic cheerful marimba / music-box melody (C, D, E, G, A)
const MELODY = [
  { note: 523.25, dur: 0.35, rest: 0.1 }, // C5
  { note: 587.33, dur: 0.35, rest: 0.1 }, // D5
  { note: 659.25, dur: 0.5, rest: 0.15 }, // E5
  { note: 783.99, dur: 0.35, rest: 0.1 }, // G5
  { note: 659.25, dur: 0.35, rest: 0.1 }, // E5
  { note: 880.0, dur: 0.6, rest: 0.2 }, // A5
  { note: 783.99, dur: 0.35, rest: 0.1 }, // G5
  { note: 659.25, dur: 0.35, rest: 0.1 }, // E5
  { note: 587.33, dur: 0.35, rest: 0.1 }, // D5
  { note: 523.25, dur: 0.7, rest: 0.3 }, // C5
];

let melodyStep = 0;

function playMelodyNote() {
  if (!audioState.enabled || !audioState.bgmEnabled) return;
  const c = getAudioContext();
  if (!c || !bgmGain) return;

  const item = MELODY[melodyStep % MELODY.length];
  melodyStep++;

  try {
    const osc = c.createOscillator();
    const noteGain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(item.note, c.currentTime);

    // Warm envelope
    noteGain.gain.setValueAtTime(0, c.currentTime);
    noteGain.gain.linearRampToValueAtTime(0.3, c.currentTime + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + item.dur);

    osc.connect(noteGain);
    noteGain.connect(bgmGain);

    osc.start(c.currentTime);
    osc.stop(c.currentTime + item.dur);
  } catch {
    // Ignore audio errors
  }
}

export function startBgm() {
  if (typeof window === "undefined" || bgmInterval) return;
  getAudioContext();
  bgmInterval = setInterval(playMelodyNote, 420);
}

export function stopBgm() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

// Duck BGM when mascot is speaking
export function duckBgm(duck: boolean) {
  if (!ctx || !bgmGain) return;
  isDucking = duck;
  const targetGain = duck ? 0.04 : 0.18;
  bgmGain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.1);
}

// Sound Effects
export function playPop() {
  if (!audioState.enabled) return;
  const c = getAudioContext();
  if (!c || !masterGain) return;
  try {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, c.currentTime + 0.08);

    g.gain.setValueAtTime(0.25, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);

    osc.connect(g);
    g.connect(masterGain);
    osc.start();
    osc.stop(c.currentTime + 0.08);
  } catch {
    /* ignore audio error */
  }
}

export function playCorrect() {
  if (!audioState.enabled) return;
  const c = getAudioContext();
  if (!c || !masterGain) return;
  try {
    // 3-note cheerful major chord arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, c.currentTime + idx * 0.09);

      g.gain.setValueAtTime(0, c.currentTime + idx * 0.09);
      g.gain.linearRampToValueAtTime(0.35, c.currentTime + idx * 0.09 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + idx * 0.09 + 0.35);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(c.currentTime + idx * 0.09);
      osc.stop(c.currentTime + idx * 0.09 + 0.4);
    });
  } catch {
    /* ignore audio error */
  }
}

export function playTryAgain() {
  if (!audioState.enabled) return;
  const c = getAudioContext();
  if (!c || !masterGain) return;
  try {
    // Gentle supportive bounce (F4, D4)
    const notes = [349.23, 293.66];
    notes.forEach((freq, idx) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, c.currentTime + idx * 0.14);

      g.gain.setValueAtTime(0.2, c.currentTime + idx * 0.14);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + idx * 0.14 + 0.25);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(c.currentTime + idx * 0.14);
      osc.stop(c.currentTime + idx * 0.14 + 0.26);
    });
  } catch {
    /* ignore audio error */
  }
}

export function playCelebration() {
  if (!audioState.enabled) return;
  const c = getAudioContext();
  if (!c || !masterGain) return;
  try {
    // Fanfare chords
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, c.currentTime + idx * 0.08);

      g.gain.setValueAtTime(0.3, c.currentTime + idx * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + idx * 0.08 + 0.6);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(c.currentTime + idx * 0.08);
      osc.stop(c.currentTime + idx * 0.08 + 0.65);
    });
  } catch {
    /* ignore audio error */
  }
}

// Si Norma Mascot Speech Synthesis (Bahasa Indonesia)
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function stopVoice() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  duckBgm(false);
}

export function speakNorma(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (!audioState.enabled || !audioState.voiceEnabled) return;

  stopVoice();
  duckBgm(true);

  // Clean text of emojis and markdown symbols for natural speech
  const clean = text
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      "",
    )
    .replace(/[*_#`~]/g, "")
    .trim();

  if (!clean) {
    duckBgm(false);
    return;
  }

  const utt = new SpeechSynthesisUtterance(clean);
  currentUtterance = utt;
  utt.lang = "id-ID";
  utt.rate = 0.96; // Clear and accessible for grade 5 students
  utt.pitch = 1.15; // Friendly, warm child-friendly tone

  // Attempt to select an Indonesian voice
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find((v) => v.lang.startsWith("id") || v.lang.includes("ID"));
  if (idVoice) {
    utt.voice = idVoice;
  }

  utt.onend = () => {
    duckBgm(false);
    onEnd?.();
  };
  utt.onerror = () => {
    duckBgm(false);
    onEnd?.();
  };

  try {
    window.speechSynthesis.speak(utt);
  } catch {
    duckBgm(false);
  }
}
