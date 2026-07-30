import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TwineBow, PixelStar, PixelHeart, PixelCamera } from '../components/PixelProps';
import { useAudio } from '../context/AudioContext';
import { PhotoMoment } from '../types';
import { X } from 'lucide-react';

interface MomentsGalleryPageProps {
  onBackToHub: () => void;
}

export const MomentsGalleryPage: React.FC<MomentsGalleryPageProps> = ({ onBackToHub }) => {
  const { playClick } = useAudio();
  const [selectedMoment, setSelectedMoment] = useState<PhotoMoment | null>(null);

  // Total 6 images
  const moments: PhotoMoment[] = [
    {
      id: '1',
      title: 'Queen Yamu 👑',
      image: 'public/images/1.jpeg',
      date: 'Sibling Love',
      caption: '',
      sticker: '👑',
      rotation: 'rotate-[-2deg]',
    },
    {
      id: '2',
      title: 'Cutie',
      image: 'public/images/2.jpeg',
      date: 'blue hour',
      caption: '',
      sticker: '🩷',
      rotation: 'rotate-[3deg]',
    },
    {
      id: '3',
      title: 'Didi 🌾',
      image: 'public/images/3.jpeg',
      date: 'Golden Hour',
      caption: '',
      sticker: '🌻',
      rotation: 'rotate-[-3deg]',
    },
    {
      id: '4',
      title: 'Gori Chori 💗',
      image: 'public/images/4.jpeg',
      date: 'Beauty',
      caption: '',
      sticker: '🧺',
      rotation: 'rotate-[2deg]',
    },
    {
      id: '5',
      title: 'Duo ✨',
      image: 'public/images/5.jpg',
      date: 'Bhai-Didi',
      caption: '',
      sticker: '⭐',
      rotation: 'rotate-[-1deg]',
    },
    {
      id: '9',
      title: 'Patidar 🌸',
      image: 'public/images/9.jpeg',
      date: 'Chaotic chee',
      caption: '',
      sticker: '🌸', 
      rotation: 'rotate-[2.5deg]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1c2826] text-[#fbf7ee] py-10 px-4 relative overflow-hidden font-serif-cottage">
      
      {/* Background Starry Sky */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.4 }}
            style={{
              position: 'absolute',
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
            }}
          >
            <PixelStar className="w-4 h-4 text-[#ffb703]/70" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header & Back Button */}
        <div className="w-full flex items-center justify-between mb-8">
          <button
            onClick={() => {
              playClick();
              onBackToHub();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#fbf7ee] text-[#3d2b1f] border-3 border-[#3d2b1f] rounded-2xl shadow-[4px_4px_0px_#3d2b1f] hover:bg-[#e8cca4] font-pixel text-xs transition-transform active:translate-y-1 cursor-pointer"
          >
            <TwineBow className="w-6 h-4" />
            <span>➔ Back to Hub</span>
          </button>

          <div className="bg-[#788b68] text-white px-3 py-1 rounded-xl border-2 border-[#fbf7ee] font-pixelify text-xs font-bold flex items-center gap-2">
            <PixelCamera className="w-5 h-5" />
            <span>Scrapbook Gallery</span>
          </div>
        </div>

        {/* Gallery Title */}
        <div className="text-center mb-10">
          <h1 className="font-pixel text-2xl sm:text-3xl text-[#f4ece1] mb-2 flex items-center justify-center gap-3">
            <span>Our Moments</span>
            <PixelHeart className="w-7 h-7 text-[#d9777f]" />
          </h1>
          <p className="font-serif-cottage text-lg text-[#a3b198] italic">
            "Long lasting memories more in heart so less nazar🧿!"
          </p>
        </div>

        {/* Grid of 6 Polaroid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12">
          {moments.map((moment) => (
            <motion.div
              key={moment.id}
              whileHover={{ scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick();
                setSelectedMoment(moment);
              }}
              className={`cursor-pointer bg-[#fbf7ee] text-[#3d2b1f] p-4 sm:p-5 rounded-2xl border-3 border-[#3d2b1f] shadow-[8px_8px_0px_#000000] relative ${moment.rotation} transition-all group`}
            >
              {/* Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#d9777f]/40 border border-[#3d2b1f]/30 rotate-[-1deg]" />

              {/* Photo Frame - Black & White by default, Original Color on Hover */}
              <div className="aspect-square w-full bg-[#e8dcc4] rounded-xl border-2 border-[#3d2b1f] overflow-hidden mb-3 relative">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
                />
                <div className="absolute top-2 right-2 bg-[#fbf7ee] px-2 py-0.5 rounded-full border border-[#3d2b1f] text-xs font-pixel shadow-xs">
                  {moment.sticker}
                </div>
              </div>

              {/* Title & Date Only (Captions Removed as requested) */}
              <div className="flex items-center justify-between font-handwriting text-2xl font-bold text-[#3d2b1f]">
                <span>{moment.title}</span>
                <span className="text-xs font-pixel text-[#7a5232]">{moment.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zoom Modal */}
        <AnimatePresence>
          {selectedMoment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={() => setSelectedMoment(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#fbf7ee] text-[#3d2b1f] border-4 border-[#3d2b1f] rounded-3xl p-6 max-w-lg w-full shadow-[12px_12px_0px_#000000] relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    playClick();
                    setSelectedMoment(null);
                  }}
                  className="absolute top-4 right-4 p-2 bg-[#d9777f] text-white rounded-full border-2 border-[#3d2b1f] hover:bg-[#b3565e] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-4/3 w-full bg-[#e8dcc4] rounded-2xl border-3 border-[#3d2b1f] overflow-hidden mb-4">
                  <img
                    src={selectedMoment.image}
                    alt={selectedMoment.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-handwriting text-3xl font-bold text-[#3d2b1f]">
                    {selectedMoment.title}
                  </h3>
                  <span className="font-pixel text-xs bg-[#788b68] text-white px-3 py-1 rounded-full border border-[#3d2b1f]">
                    {selectedMoment.date}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Back Button */}
        <button
          onClick={() => {
            playClick();
            onBackToHub();
          }}
          className="px-6 py-3 bg-[#fbf7ee] text-[#3d2b1f] border-3 border-[#3d2b1f] rounded-2xl shadow-[4px_4px_0px_#3d2b1f] hover:bg-[#e8cca4] font-pixel text-xs transition-transform active:translate-y-1 cursor-pointer flex items-center gap-2"
        >
          <TwineBow className="w-6 h-4" />
          <span>➔ Back to Message Hub</span>
        </button>

      </div>
    </div>
  );
};
