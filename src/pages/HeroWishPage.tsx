import React from 'react';
import { motion } from 'framer-motion';
import { TwineBow, PixelHeart, PixelFlower, PixelStar, PixelMushroom } from '../components/PixelProps';
import { useAudio } from '../context/AudioContext';

interface HeroWishPageProps {
  onContinue: () => void;
}

export const HeroWishPage: React.FC<HeroWishPageProps> = ({ onContinue }) => {
  const { playClick } = useAudio();

  // Floating stickers
  const stickers = [
    { component: <PixelHeart className="w-8 h-8 text-[#d9777f]" />, top: '-12px', left: '-12px', delay: 0 },
    { component: <PixelFlower className="w-8 h-8" />, top: '-12px', right: '-12px', delay: 0.5 },
    { component: <PixelStar className="w-7 h-7 text-[#ffb703]" />, bottom: '12px', left: '-12px', delay: 1 },
    { component: <PixelMushroom className="w-8 h-8" />, bottom: '-12px', right: '-12px', delay: 1.5 },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 max-w-4xl mx-auto w-full">
      
      {/* Landscape Container Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="w-full bg-[#fbf7ee] border-4 border-[#3d2b1f] rounded-3xl p-6 sm:p-10 shadow-[12px_12px_0px_#3d2b1f] relative text-center"
      >
        {/* Top Header Bow */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#e8cca4] px-5 py-1.5 rounded-full border-2 border-[#3d2b1f] shadow-[3px_3px_0px_#3d2b1f] flex items-center gap-2">
          <TwineBow className="w-10 h-6" />
          <span className="text-xs font-pixel text-[#3d2b1f]">31st July Special</span>
        </div>

        {/* Landscape Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-4">
          
          {/* Left Column: Premium Photo Frame with Ornate Framing */}
          <div className="relative max-w-xs mx-auto w-full">
            
            {stickers.map((s, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [-6, 6, -6],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 3 + idx * 0.5,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: "easeInOut",
                }}
                style={{
                  position: 'absolute',
                  top: s.top,
                  bottom: s.bottom,
                  left: s.left,
                  right: s.right,
                  zIndex: 20,
                }}
              >
                {s.component}
              </motion.div>
            ))}

            {/* High Quality Cottagecore Frame */}
            <div className="bg-[#f7f1e7] p-4 sm:p-5 rounded-3xl border-4 border-[#3d2b1f] shadow-[0_12px_30px_rgba(120,139,104,0.35)] rotate-[-1.5deg] hover:rotate-0 transition-all duration-300 relative group">
              
              {/* Washi Tape Header */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#788b68]/50 border border-[#3d2b1f]/30 rotate-[2deg] shadow-xs" />

              {/* Inner Photo Border with Glow */}
              <div className="overflow-hidden rounded-2xl border-3 border-[#3d2b1f] bg-[#e2af70]/20 aspect-3/4 max-h-[280px] sm:max-h-[310px] flex items-center justify-center relative shadow-inner">
                <img
                  src="public/images/8.jpeg"
                  alt="Yamu Didi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ''; // Fallback image if the original fails to load;
                  }}
                />
                
                {/* Subtle Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Photo Title */}
              <div className="mt-3 font-handwriting text-2xl sm:text-3xl text-[#3d2b1f] font-bold flex items-center justify-center gap-1.5">
                <span>"Queen Yamu 👑"</span>
              </div>
            </div>

          </div>

          {/* Right Column: Title & Birthday Wishes */}
          <div className="text-left flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <h1 className="font-pixel text-xl sm:text-2xl lg:text-3xl text-[#3d2b1f] leading-snug tracking-tight mb-2">
                Happy Birthday <br />
                <span className="text-[#d9777f] underline decoration-wavy decoration-[#e2af70]">Yamu Didi!</span> 🎉
              </h1>
              <p className="font-serif-cottage text-base sm:text-lg text-[#7a5232] italic">
                To the world's most wonderful sister ✨
              </p>
            </motion.div>

            {/* Sweet Wishes Box */}
            <div className="bg-[#e8cca4] border-2 border-[#3d2b1f] p-4 sm:p-5 rounded-2xl mb-6 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
              <p className="font-serif-cottage text-sm sm:text-base text-[#3d2b1f] leading-relaxed">
                "You're my chaos, my rainbow, My Yamu Di"❤️🌸
              </p>
            </div>

            {/* Action Prompt */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClick();
                onContinue();
              }}
              className="px-6 py-3.5 bg-[#788b68] hover:bg-[#526742] text-white font-pixel text-xs rounded-2xl border-3 border-[#3d2b1f] shadow-[4px_4px_0px_#3d2b1f] flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto self-start"
            >
              <span>Explore Message Hub ➔</span>
            </motion.button>

          </div>

        </div>

      </motion.div>

    </div>
  );
};
