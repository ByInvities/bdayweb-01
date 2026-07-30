import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { soundEngine } from '../lib/soundEngine';

const BACKGROUND_MUSIC_FILE: string | null = '/bgm.mp3'; // 👈 Background ambient music
const JUKEBOX_MUSIC_FILE: string | null = 'public/audio/song.mp3'; // 👈 Music section song

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (vol: number) => void;
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

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.5);
  const [currentTrackName, setCurrentTrackName] = useState<string>("Yamu's Lofi Melody");
  const [isJukeboxMode, setIsJukeboxMode] = useState<boolean>(false);

  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
  const jukeboxAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    if (BACKGROUND_MUSIC_FILE) {
      bgmAudioRef.current = new Audio(BACKGROUND_MUSIC_FILE);
      bgmAudioRef.current.loop = true;
      bgmAudioRef.current.volume = volume;
    }
    if (JUKEBOX_MUSIC_FILE) {
      jukeboxAudioRef.current = new Audio(JUKEBOX_MUSIC_FILE);
      jukeboxAudioRef.current.loop = true;
      jukeboxAudioRef.current.volume = volume;
    }

    return () => {
      if (bgmAudioRef.current) bgmAudioRef.current.pause();
      if (jukeboxAudioRef.current) jukeboxAudioRef.current.pause();
    };
  }, []);

  // Sync volume & mute
  useEffect(() => {
    soundEngine.setVolume(volume);
    if (bgmAudioRef.current) bgmAudioRef.current.volume = volume;
    if (jukeboxAudioRef.current) jukeboxAudioRef.current.volume = volume;

    if (isMuted) {
      if (bgmAudioRef.current) bgmAudioRef.current.pause();
      if (jukeboxAudioRef.current) jukeboxAudioRef.current.pause();
      soundEngine.setMuted(true);
    } else {
      soundEngine.setMuted(false);
      if (isJukeboxMode) {
        if (jukeboxAudioRef.current) {
          jukeboxAudioRef.current.play().catch(() => {});
        }
      } else {
        if (bgmAudioRef.current) {
          bgmAudioRef.current.play().catch(() => {});
        } else {
          soundEngine.startBgm();
        }
      }
    }
  }, [volume, isMuted, isJukeboxMode]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const playJukeboxSong = () => {
    setIsJukeboxMode(true);
    setCurrentTrackName("Tenu Sang Rakhna 🎶");
    soundEngine.stopBgm();

    if (bgmAudioRef.current) {
      bgmAudioRef.current.pause();
    }
    if (jukeboxAudioRef.current && !isMuted) {
      jukeboxAudioRef.current.play().catch(() => {});
    }
  };

  const restoreBgmSong = () => {
    setIsJukeboxMode(false);
    setCurrentTrackName("Yamu's Lofi Melody");

    if (jukeboxAudioRef.current) {
      jukeboxAudioRef.current.pause();
    }
    if (bgmAudioRef.current && !isMuted) {
      bgmAudioRef.current.play().catch(() => {});
    } else if (!isMuted) {
      soundEngine.startBgm();
    }
  };

  const handleSetVolume = (vol: number) => {
    setVolumeState(vol);
  };

  const switchTrack = (index: number) => {
    soundEngine.switchTrack(index);
    setCurrentTrackName(soundEngine.getCurrentTrackName());
  };

  const playClick = () => soundEngine.playClick();
  const playError = () => soundEngine.playError();
  const playSuccess = () => soundEngine.playSuccess();
  const playEnvelopeOpen = () => soundEngine.playEnvelopeOpen();
  const playCandleOut = () => soundEngine.playCandleOut();
  const playCelebrationFanfare = () => soundEngine.playCelebrationFanfare();

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        volume,
        setVolume: handleSetVolume,
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
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};