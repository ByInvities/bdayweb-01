class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted = false;
  private volume = 0.5;
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;
  private currentTrackIndex = 0;

  // AudioContext will ONLY be created after user interaction.
  private audioUnlocked = false;

  private tracks = [
    {
      name: "Cozy Afternoon Tea",
      notes: [
        261.63,
        329.63,
        392.0,
        523.25,
        440.0,
        392.0,
        329.63,
        293.66,
      ],
      bPM: 70,
    },
    {
      name: "Polaroid Dreams",
      notes: [
        293.66,
        369.99,
        440.0,
        587.33,
        523.25,
        440.0,
        369.99,
        329.63,
      ],
      bPM: 64,
    },
    {
      name: "Fairy Lights & Stars",
      notes: [
        329.63,
        392.0,
        493.88,
        659.25,
        587.33,
        493.88,
        392.0,
        349.23,
      ],
      bPM: 60,
    },
  ];

  // --------------------------------------------------
  // AUDIO CONTEXT
  // --------------------------------------------------

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    // Do not create AudioContext before user gesture.
    if (!this.audioUnlocked) return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioCtx) return null;

      this.ctx = new AudioCtx();
    }

    return this.ctx;
  }

  // --------------------------------------------------
  // UNLOCK AUDIO
  // Must be called from a button click/tap.
  // --------------------------------------------------

  public async unlockAudio(): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioCtx) return;

      this.audioUnlocked = true;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }
    } catch (error) {
      console.warn("Could not unlock Web Audio:", error);
    }
  }

  // --------------------------------------------------
  // MUTE
  // --------------------------------------------------

  public setMuted(muted: boolean) {
    this.isMuted = muted;

    if (muted) {
      this.stopBgm();
    }

    // IMPORTANT:
    // Do not automatically start BGM here.
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --------------------------------------------------
  // VOLUME
  // --------------------------------------------------

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  // --------------------------------------------------
  // CLICK
  // --------------------------------------------------

  public playClick() {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";

      osc.frequency.setValueAtTime(
        587.33,
        ctx.currentTime
      );

      osc.frequency.exponentialRampToValueAtTime(
        880,
        ctx.currentTime + 0.06
      );

      gain.gain.setValueAtTime(
        0.12 * this.volume,
        ctx.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.08
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  // --------------------------------------------------
  // ENVELOPE OPEN
  // --------------------------------------------------

  public playEnvelopeOpen() {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const bufferSize = Math.floor(
        ctx.sampleRate * 0.15
      );

      const buffer = ctx.createBuffer(
        1,
        bufferSize,
        ctx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";

      filter.frequency.setValueAtTime(
        1200,
        ctx.currentTime
      );

      filter.frequency.exponentialRampToValueAtTime(
        300,
        ctx.currentTime + 0.15
      );

      const gain = ctx.createGain();

      gain.gain.setValueAtTime(
        0.2 * this.volume,
        ctx.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + 0.15
      );

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {}
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  public playError() {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";

      osc.frequency.setValueAtTime(
        180,
        ctx.currentTime
      );

      osc.frequency.setValueAtTime(
        140,
        ctx.currentTime + 0.08
      );

      gain.gain.setValueAtTime(
        0.15 * this.volume,
        ctx.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.22
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {}
  }

  // --------------------------------------------------
  // SUCCESS
  // --------------------------------------------------

  public playSuccess() {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [
        523.25,
        659.25,
        783.99,
        1046.5,
      ];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = freq;

        const startTime =
          ctx.currentTime + idx * 0.08;

        gain.gain.setValueAtTime(
          0.15 * this.volume,
          startTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + 0.25
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {}
  }

  // --------------------------------------------------
  // CANDLE OUT
  // --------------------------------------------------

  public playCandleOut() {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const bufferSize = Math.floor(
        ctx.sampleRate * 0.4
      );

      const buffer = ctx.createBuffer(
        1,
        bufferSize,
        ctx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] =
          (Math.random() * 2 - 1) *
          Math.pow(1 - i / bufferSize, 2);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();

      filter.type = "bandpass";

      filter.frequency.setValueAtTime(
        800,
        ctx.currentTime
      );

      filter.frequency.exponentialRampToValueAtTime(
        200,
        ctx.currentTime + 0.4
      );

      const gain = ctx.createGain();

      gain.gain.setValueAtTime(
        0.25 * this.volume,
        ctx.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.4
      );

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {}
  }

  // --------------------------------------------------
  // CELEBRATION FANFARE
  // --------------------------------------------------

  public playCelebrationFanfare() {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const chord = [
        392.0,
        493.88,
        587.33,
        783.99,
        987.77,
        1174.66,
      ];

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type =
          idx % 2 === 0
            ? "triangle"
            : "sine";

        osc.frequency.value = freq;

        const startTime =
          ctx.currentTime + idx * 0.09;

        gain.gain.setValueAtTime(
          0.18 * this.volume,
          startTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + 0.5
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    } catch {}
  }

  // --------------------------------------------------
  // BACKGROUND MELODY
  // --------------------------------------------------

  public startBgm() {
    if (this.isMuted) return;
    if (this.isBgmPlaying) return;

    // Do not start before user interaction.
    if (!this.audioUnlocked) return;

    const ctx = this.getContext();

    if (!ctx) return;

    this.isBgmPlaying = true;

    this.scheduleNextBgmNote(0);
  }

  // --------------------------------------------------
  // STOP BGM
  // --------------------------------------------------

  public stopBgm() {
    this.isBgmPlaying = false;

    if (this.bgmTimer !== null) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // --------------------------------------------------
  // SWITCH TRACK
  // --------------------------------------------------

  public switchTrack(trackIdx: number) {
    this.currentTrackIndex =
      trackIdx % this.tracks.length;
  }

  public getCurrentTrackName(): string {
    return this.tracks[this.currentTrackIndex].name;
  }

  // --------------------------------------------------
  // BGM NOTE SCHEDULER
  // --------------------------------------------------

  private scheduleNextBgmNote(noteStep: number) {
    if (!this.isBgmPlaying) return;
    if (this.isMuted) return;

    const ctx = this.getContext();

    if (!ctx) {
      this.stopBgm();
      return;
    }

    const currentTrack =
      this.tracks[this.currentTrackIndex];

    const notes = currentTrack.notes;

    const freq =
      notes[noteStep % notes.length];

    try {
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";

      osc.frequency.setValueAtTime(
        freq,
        ctx.currentTime
      );

      subOsc.type = "triangle";

      subOsc.frequency.setValueAtTime(
        freq / 2,
        ctx.currentTime
      );

      const attack = 0.02;
      const duration = 0.6;

      gain.gain.setValueAtTime(
        0,
        ctx.currentTime
      );

      gain.gain.linearRampToValueAtTime(
        0.08 * this.volume,
        ctx.currentTime + attack
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      subOsc.start();

      osc.stop(
        ctx.currentTime + duration
      );

      subOsc.stop(
        ctx.currentTime + duration
      );
    } catch {}

    const intervalMs =
      (60 / currentTrack.bPM) *
      1000 *
      0.75;

    this.bgmTimer = window.setTimeout(() => {
      this.scheduleNextBgmNote(
        noteStep + 1
      );
    }, intervalMs);
  }
}

export const soundEngine = new SoundEngine();
