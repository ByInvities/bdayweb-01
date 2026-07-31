import React from "react";
import { motion } from "framer-motion";

import {
  PixelGiftBox,
  TwineBow,
  PixelMushroom,
  PixelFlower,
  PixelStar,
} from "../components/PixelProps";

import { useAudio } from "../context/AudioContext";

interface OpeningPageProps {
  onSelectYes: () => void;
  onSelectNo: () => void;
}

export const OpeningPage: React.FC<
  OpeningPageProps
> = ({
  onSelectYes,
  onSelectNo,
}) => {
  const {
    playClick,
    startAudio,
  } = useAudio();

  const handleYes = async () => {
    // Unlock audio because this is a real user gesture.
    await startAudio();

    // Play button click sound after audio is unlocked.
    playClick();

    // Continue your existing invitation flow.
    onSelectYes();
  };

  const handleNo = () => {
    playClick();
    onSelectNo();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4">

      {/* Landscape Container Card */}
      <motion.div
        initial={{
          scale: 0.9,
          opacity: 0,
          y: 20,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="max-w-3xl w-full bg-[#e8cca4] border-4 border-[#3d2b1f] rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_#3d2b1f] relative text-center"
      >

        {/* Top Decorative Bow */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#fbf7ee] px-5 py-1.5 rounded-full border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] flex items-center gap-2">

          <TwineBow className="w-9 h-6" />

          <span className="text-xs font-pixel text-[#3d2b1f] font-semibold">
            Special Delivery
          </span>

        </div>

        {/* Floating Background Pixel Stickers */}

        <div className="absolute -top-3 -right-3">
          <PixelFlower className="w-8 h-8 animate-bounce" />
        </div>

        <div className="absolute -bottom-3 -left-3">
          <PixelMushroom className="w-8 h-8" />
        </div>

        {/* Landscape Horizontal Content Layout */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-4 text-left">

          {/* Gift Box */}

          <motion.div
            animate={{
              y: [-6, 6, -6],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="shrink-0 relative"
          >

            <PixelGiftBox
              className="w-28 h-28 sm:w-36 sm:h-36"
              color="#d9777f"
            />

            <motion.div
              animate={{
                opacity: [
                  0.2,
                  1,
                  0.2,
                ],
                scale: [
                  0.8,
                  1.2,
                  0.8,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute -top-2 -right-2"
            >
              <PixelStar className="w-6 h-6 text-[#ffb703]" />
            </motion.div>

          </motion.div>

          {/* Parchment Banner */}

          <div className="flex-1 bg-[#fbf7ee] border-2 border-[#3d2b1f] rounded-2xl p-6 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.06)]">

            <p className="font-handwriting text-3xl sm:text-4xl text-[#3d2b1f] font-bold tracking-wide">
              "I have something for you!! 🎁"
            </p>

            <p className="font-serif-cottage text-base text-[#7a5232] mt-2 italic">
              A tiny cozy surprise made especially for Yamu Didi ✨
            </p>

          </div>

        </div>

        {/* YES / NO BUTTONS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mt-6">

          {/* YES */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleYes}
            className="px-6 py-4 bg-[#788b68] hover:bg-[#526742] text-white font-pixel text-xs sm:text-sm rounded-2xl border-3 border-[#3d2b1f] shadow-[4px_4px_0px_#3d2b1f] flex items-center justify-center gap-3 transition-colors cursor-pointer group"
          >

            <span className="w-6 h-6 rounded-full bg-[#f4ece1] text-[#788b68] flex items-center justify-center font-bold text-sm border border-[#3d2b1f] group-hover:scale-110 transition-transform">
              ✓
            </span>

            <span>
              YES! 🎉
            </span>

          </motion.button>

          {/* NO */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleNo}
            className="px-6 py-4 bg-[#f4ece1] hover:bg-[#e8dcc4] text-[#3d2b1f] font-pixel text-xs sm:text-sm rounded-2xl border-3 border-[#3d2b1f] shadow-[4px_4px_0px_#3d2b1f] flex items-center justify-center gap-3 transition-colors cursor-pointer group"
          >

            <span className="w-6 h-6 rounded-full bg-[#d9777f] text-white flex items-center justify-center font-bold text-sm border border-[#3d2b1f] group-hover:scale-110 transition-transform">
              ✕
            </span>

            <span>
              NO... 😤
            </span>

          </motion.button>

        </div>

      </motion.div>

    </div>
  );
};

