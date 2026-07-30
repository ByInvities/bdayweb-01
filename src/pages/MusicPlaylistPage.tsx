import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  TwineBow,
  PixelCassette,
  PixelStar,
  PixelHeart,
  PixelFlower,
} from "../components/PixelProps";
import { useAudio } from "../context/AudioContext";
import { Play, Pause, Music, Sparkles } from "lucide-react";

interface MusicPlaylistPageProps {
  onBackToHub: () => void;
}

export const MusicPlaylistPage: React.FC<MusicPlaylistPageProps> = ({
  onBackToHub,
}) => {
  const { playClick, isMuted, toggleMute, playJukeboxSong, restoreBgmSong } =
    useAudio();

  // Switch to Yamu's special track on enter, restore BGM on leave
  useEffect(() => {
    playJukeboxSong();
    return () => {
      restoreBgmSong();
    };
  }, []);

  const perfectSong = {
    title: "Tenu Sang Rakhna 🎶",
    artist: "Arijit Singh, Anumita Nadesan",
    duration: "3:45",
    vibe: "Warm Melodic Sisterly Love 🌸",
    whyRemindsMe:
      "This song captures the unconditional bond and togetherness we share. No matter where life takes us, keeping you by my side as my guide and sister is my greatest joy. This one is for you, Yamu Didi!",
    freqPattern: [
      40, 75, 50, 90, 60, 100, 70, 45, 85, 55, 95, 35, 80, 60, 90, 50,
    ],
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 max-w-5xl mx-auto w-full">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => {
            playClick();
            restoreBgmSong();
            onBackToHub();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#fbf7ee] text-[#3d2b1f] border-3 border-[#3d2b1f] rounded-2xl shadow-[4px_4px_0px_#3d2b1f] hover:bg-[#e8cca4] font-pixel text-xs cursor-pointer transition-transform active:translate-y-1"
        >
          <TwineBow className="w-6 h-4" />
          <span>➔ Back to Hub</span>
        </button>

        <div className="bg-[#788b68] text-white px-3 py-1 rounded-xl border-2 border-[#3d2b1f] font-pixelify text-xs font-bold flex items-center gap-2">
          <Music className="w-4 h-4" />
          <span>Yamu's Special Track</span>
        </div>
      </div>

      {/* Main Jukebox Card in LANDSCAPE format */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-[#fbf7ee] border-4 border-[#3d2b1f] rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_#3d2b1f] mb-8"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#e8cca4] px-4 py-1 rounded-full border-2 border-[#3d2b1f] mb-2 shadow-[2px_2px_0px_#3d2b1f]">
            <Sparkles className="w-4 h-4 text-[#d9777f]" />
            <span className="font-pixel text-xs text-[#3d2b1f]">
              One Perfect Song
            </span>
          </div>

          <h1 className="font-pixel text-xl sm:text-3xl text-[#3d2b1f] mb-2 flex items-center justify-center gap-2">
            <span>The Perfect Song For Yamu Didi 🎶</span>
          </h1>
          <p className="font-serif-cottage text-base sm:text-lg text-[#7a5232] italic">
            "The track that says what my heart couldn't, Didi."
          </p>
        </div>

        {/* Landscape Jukebox Display Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#e8cca4] border-3 border-[#3d2b1f] rounded-2xl p-6 sm:p-8 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.06)]">
          {/* Left Side: Animated Vinyl / Cassette Player & Controls */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative my-2">
              <motion.div
                animate={{ rotate: isMuted ? 0 : [0, 360] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <PixelCassette className="w-28 h-28 sm:w-36 sm:h-36" />
              </motion.div>

              <motion.div
                animate={{ opacity: isMuted ? 0.3 : [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <PixelStar className="w-7 h-7 text-[#ffb703]" />
              </motion.div>
            </div>

            <div>
              <span className="text-[10px] font-pixel bg-[#788b68] text-white px-2.5 py-0.5 rounded-md border border-[#3d2b1f]">
                {isMuted ? "PAUSED" : "NOW PLAYING"}
              </span>
              <h3 className="font-pixel text-lg sm:text-xl text-[#3d2b1f] mt-2 mb-1">
                {perfectSong.title}
              </h3>
              <p className="font-serif-cottage text-sm text-[#5c3d2e] italic">
                {perfectSong.artist} • {perfectSong.vibe}
              </p>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => {
                playClick();
                toggleMute();
              }}
              className="px-6 py-3 bg-[#788b68] text-white rounded-2xl border-3 border-[#3d2b1f] shadow-[4px_4px_0px_#3d2b1f] hover:bg-[#526742] cursor-pointer flex items-center gap-3 font-pixel text-xs transition-transform active:translate-y-1"
            >
              {isMuted ? (
                <Play className="w-5 h-5 fill-current" />
              ) : (
                <Pause className="w-5 h-5 fill-current" />
              )}
              <span>{isMuted ? "Play Music 🎵" : "Pause Music ⏸️"}</span>
            </button>
          </div>

          {/* Right Side: Animated Waveform & Heartfelt Note */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Live Audio Waveform */}
            <div className="bg-[#fbf7ee] p-4 rounded-2xl border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f]">
              <div className="flex items-center justify-between text-xs font-pixel text-[#3d2b1f] mb-3">
                <span className="flex items-center gap-1.5">
                  <PixelFlower className="w-4 h-4" />
                  Live Audio Visualizer
                </span>
                <span>{perfectSong.duration}</span>
              </div>

              <div className="flex items-end justify-between gap-1 h-14 bg-[#f4ece1] p-2 rounded-xl border border-[#3d2b1f]">
                {perfectSong.freqPattern.map((val, idx) => (
                  <motion.div
                    key={idx}
                    animate={
                      isMuted
                        ? { height: "15%" }
                        : {
                            height: [
                              `${val * 0.25}%`,
                              `${val}%`,
                              `${val * 0.35}%`,
                            ],
                          }
                    }
                    transition={{
                      duration: 0.7 + (idx % 4) * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full bg-[#788b68] rounded-t-sm"
                  />
                ))}
              </div>
            </div>

            {/* Why This Song Box */}
            <div className="bg-[#f4ece1] border-2 border-[#3d2b1f] p-5 rounded-2xl shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-1.5 text-xs font-pixel text-[#d9777f] mb-2 font-bold">
                <PixelHeart className="w-4 h-4 text-[#d9777f]" />
                <span>Why this is Yamu Didi's song:</span>
              </div>
              <p className="font-serif-cottage text-base text-[#3d2b1f] leading-relaxed italic">
                "I dedicated 'Tenu Sang Rakhna💞' to you because that's the
                promise I made the day of your vidai that no matter the
                distance, I'll always keep you close to my heart. This song says
                what I never had the courage to, Yamu Di."💓
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
