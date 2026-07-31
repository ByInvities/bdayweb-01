import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import { soundEngine } from "../lib/soundEngine";

// IMPORTANT:
// Files inside public/ are accessed without "public/"
const BACKGROUND_MUSIC_FILE = "/audio/song.mp3";
const JUKEBOX_MUSIC_FILE = "/audio/song.mp3";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;

  volume: number;
  setVolume: (vol: number) => void;

  startAudio: () => Promise<void>;

  playClick: () => void;
  playError: () => void;
  playSuccess: () => void;
  playEnvelopeOpen: () => void;
  playCandleOut: () => void;
  playCelebrationFanfare: () => void;

  currentTrackName: string;
  switchTrack: (index: number) => void;

  isJukeboxMode: boolean;
  playJukeboxSong: () => void;
  restoreBgmSong: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  const [currentTrackName, setCurrentTrackName] =
    useState("Yamu's Lofi Melody");

  const [isJukeboxMode, setIsJukeboxMode] =
    useState(false);

  const [audioStarted, setAudioStarted] =
    useState(false);

  const bgmAudioRef =
    useRef<HTMLAudioElement | null>(null);

  const jukeboxAudioRef =
    useRef<HTMLAudioElement | null>(null);

  // --------------------------------------------------
  // CREATE AUDIO ELEMENTS
  // --------------------------------------------------

  useEffect(() => {
    const bgm = new Audio(
      BACKGROUND_MUSIC_FILE
    );

    bgm.loop = true;
    bgm.preload = "auto";
    bgm.volume = volume;

    bgmAudioRef.current = bgm;

    const jukebox = new Audio(
      JUKEBOX_MUSIC_FILE
    );

    jukebox.loop = true;
    jukebox.preload = "auto";
    jukebox.volume = volume;

    jukeboxAudioRef.current = jukebox;

    return () => {
      bgm.pause();
      jukebox.pause();

      bgmAudioRef.current = null;
      jukeboxAudioRef.current = null;
    };
  }, []);

  // --------------------------------------------------
  // VOLUME
  // --------------------------------------------------

  useEffect(() => {
    soundEngine.setVolume(volume);

    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = volume;
    }

    if (jukeboxAudioRef.current) {
      jukeboxAudioRef.current.volume = volume;
    }
  }, [volume]);

  // --------------------------------------------------
  // MUTE
  // --------------------------------------------------

  useEffect(() => {
    soundEngine.setMuted(isMuted);

    if (isMuted) {
      bgmAudioRef.current?.pause();
      jukeboxAudioRef.current?.pause();

      return;
    }

    // Don't auto-play before user interaction.
    if (!audioStarted) return;

    if (isJukeboxMode) {
      jukeboxAudioRef.current
        ?.play()
        .catch(() => {});
    } else {
      bgmAudioRef.current
        ?.play()
        .catch(() => {});
    }
  }, [
    isMuted,
    audioStarted,
    isJukeboxMode,
  ]);

  // --------------------------------------------------
  // START AUDIO
  // IMPORTANT:
  // This must be called from a user click/tap.
  // --------------------------------------------------

  const startAudio = async () => {
    try {
      await soundEngine.unlockAudio();

      setAudioStarted(true);

      if (isMuted) return;

      if (isJukeboxMode) {
        if (jukeboxAudioRef.current) {
          await jukeboxAudioRef.current.play();
        }
      } else {
        if (bgmAudioRef.current) {
          await bgmAudioRef.current.play();
        }
      }
    } catch (error) {
      console.warn(
        "Audio could not start:",
        error
      );
    }
  };

  // --------------------------------------------------
  // MUTE TOGGLE
  // --------------------------------------------------

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // --------------------------------------------------
  // JUKEBOX
  // --------------------------------------------------

  const playJukeboxSong = () => {
    setIsJukeboxMode(true);

    setCurrentTrackName(
      "Tenu Sang Rakhna 🎶"
    );

    soundEngine.stopBgm();

    bgmAudioRef.current?.pause();

    if (!isMuted && audioStarted) {
      jukeboxAudioRef.current
        ?.play()
        .catch(() => {});
    }
  };

  // --------------------------------------------------
  // RESTORE BGM
  // --------------------------------------------------

  const restoreBgmSong = () => {
    setIsJukeboxMode(false);

    setCurrentTrackName(
      "Yamu's Lofi Melody"
    );

    jukeboxAudioRef.current?.pause();

    if (!isMuted && audioStarted) {
      bgmAudioRef.current
        ?.play()
        .catch(() => {});
    }
  };

  // --------------------------------------------------
  // VOLUME
  // --------------------------------------------------

  const handleSetVolume = (vol: number) => {
    const safeVolume = Math.max(
      0,
      Math.min(1, vol)
    );

    setVolumeState(safeVolume);
  };

  // --------------------------------------------------
  // SOUND EFFECTS
  // --------------------------------------------------

  const playClick = () => {
    if (!isMuted) {
      soundEngine.playClick();
    }
  };

  const playError = () => {
    if (!isMuted) {
      soundEngine.playError();
    }
  };

  const playSuccess = () => {
    if (!isMuted) {
      soundEngine.playSuccess();
    }
  };

  const playEnvelopeOpen = () => {
    if (!isMuted) {
      soundEngine.playEnvelopeOpen();
    }
  };

  const playCandleOut = () => {
    if (!isMuted) {
      soundEngine.playCandleOut();
    }
  };

  const playCelebrationFanfare = () => {
    if (!isMuted) {
      soundEngine.playCelebrationFanfare();
    }
  };

  // --------------------------------------------------
  // SWITCH TRACK
  // --------------------------------------------------

  const switchTrack = (index: number) => {
    if (isMuted) return;

    soundEngine.switchTrack(index);

    setCurrentTrackName(
      soundEngine.getCurrentTrackName()
    );
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,

        volume,
        setVolume: handleSetVolume,

        startAudio,

        playClick,
        playError,
        playSuccess,
        playEnvelopeOpen,
        playCandleOut,
        playCelebrationFanfare,

        currentTrackName,
        switchTrack,

        isJukeboxMode,
        playJukeboxSong,
        restoreBgmSong,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);

  if (!ctx) {
    throw new Error(
      "useAudio must be used within AudioProvider"
    );
  }

  return ctx;
};

