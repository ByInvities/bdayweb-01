import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PixelMushroom, TwineBow } from '../components/PixelProps';
import { useAudio } from '../context/AudioContext';

interface NoRedirectPageProps {
  onRedirectBack: () => void;
}

export const NoRedirectPage: React.FC<NoRedirectPageProps> = ({ onRedirectBack }) => {
  const { playClick, playError } = useAudio();
  const [timeLeft, setTimeLeft] = useState<number>(5);

  useEffect(() => {
    playError();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onRedirectBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onRedirectBack]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
      
      {/* Landscape Kraft Paper Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-2xl sm:max-w-3xl w-full bg-[#e8cca4] border-4 border-[#3d2b1f] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#3d2b1f] relative text-center"
      >
        {/* Twine Bow Header */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#fbf7ee] px-5 py-1 rounded-full border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] flex items-center gap-2">
          <TwineBow className="w-8 h-5" />
          <span className="text-[11px] font-pixel text-[#d9777f] font-bold">Think Again!</span>
        </div>

        {/* Landscape Content Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
          
          {/* Animated Emoji */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl sm:text-7xl shrink-0"
          >
            😤
          </motion.div>

          <div className="text-left flex-1">
            <h2 className="font-pixel text-lg sm:text-2xl text-[#3d2b1f] leading-snug mb-2">
              How dare you?? Think again 😤
            </h2>

            {/* Parchment inner box for single message */}
            <div className="bg-[#fbf7ee] border-2 border-[#3d2b1f] p-4 rounded-2xl shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
              <p className="font-serif-cottage text-base sm:text-lg text-[#5c3d2e] leading-relaxed italic">
                "Did you really just press NO to your favorite sibling? The disrespect! Back you go to rethink your choices!"
              </p>
            </div>
          </div>

        </div>

        {/* Timer Progress Bar */}
        <div className="my-6 max-w-lg mx-auto">
          <div className="flex items-center justify-between text-xs font-pixel text-[#5c3d2e] mb-1.5 px-1">
            <span>Redirecting back in...</span>
            <span className="text-[#d9777f] font-bold">{timeLeft}s</span>
          </div>
          <div className="w-full bg-[#fbf7ee] h-3 rounded-full border-2 border-[#3d2b1f] overflow-hidden p-0.5">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-[#788b68] rounded-full"
            />
          </div>
        </div>

        {/* Manual Redirect Button */}
        <button
          onClick={() => {
            playClick();
            onRedirectBack();
          }}
          className="max-w-xs mx-auto w-full py-3 bg-[#788b68] hover:bg-[#526742] text-white font-pixel text-xs rounded-2xl border-2 border-[#3d2b1f] shadow-[4px_4px_0px_#3d2b1f] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <PixelMushroom className="w-5 h-5" />
          <span>Okay okay, take me back! ➔</span>
        </button>

      </motion.div>

    </div>
  );
};
