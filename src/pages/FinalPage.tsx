import React from 'react';
import { motion } from 'framer-motion';
import { PixelStar, PixelFlower } from '../components/PixelProps';
import { useAudio } from '../context/AudioContext';
import { PageId } from '../types';

interface FinalPageProps {
  onNavigate: (page: PageId) => void;
}

export const FinalPage: React.FC<FinalPageProps> = ({ onNavigate }) => {
  const { playClick } = useAudio();

  const handleScreenClick = () => {
    playClick();
    onNavigate('opening');
  };

  return (
    <div 
      onClick={handleScreenClick}
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-[#fbf7ee] flex flex-col items-center justify-center p-6 z-50 select-none font-serif-cottage cursor-pointer"
      title="Click anywhere to return to start ➔"
    >
      
      {/* FULL SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/images/8.jpeg"
          alt="Yamu Didi"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/8.jpeg';
          }}
        />

        {/* Soft atmospheric vignette & gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
      </div>

      {/* Gentle Floating Stars & Petals over Full Screen Image */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: [0, 900],
              x: [0, (i % 2 === 0 ? 40 : -40)],
              rotate: [0, 360],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 7 + (i % 5),
              repeat: Infinity,
              delay: i * 0.35,
              ease: "linear",
            }}
            style={{
              position: 'absolute',
              left: `${(i * 11) % 96}%`,
              top: `-5%`,
            }}
          >
            {i % 2 === 0 ? (
              <PixelStar className="w-6 h-6 text-[#ffb703]" />
            ) : (
              <PixelFlower className="w-6 h-6 text-[#d9777f]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* CENTER FULL-SCREEN CONTENT: ONLY "Love you didi ❤️" AND THE QUOTE */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto my-auto pointer-events-none">
        
        {/* Main "Love you didi ❤️" text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-white font-bold drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] tracking-wide">
            "Love you didi ❤️"
          </h1>
        </motion.div>

        {/* Quote under it */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-serif-cottage text-xl sm:text-3xl text-[#f4ece1] italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-2xl leading-relaxed"
        >
          "Thank you for being the most incredible elder sister in the universe." ✨
        </motion.p>

      </div>

    </div>
  );
};
