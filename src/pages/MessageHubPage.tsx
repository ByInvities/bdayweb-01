import React from 'react';
import { motion } from 'framer-motion';
import { 
  PixelCamera, 
  PixelCassette, 
  PixelEnvelope, 
  PixelGiftBox, 
  PixelPicnicBasket, 
  TwineBow, 
  PixelStar, 
  PixelFlower 
} from '../components/PixelProps';
import { useAudio } from '../context/AudioContext';
import { PageId } from '../types';

interface MessageHubPageProps {
  onNavigate: (page: PageId) => void;
}

export const MessageHubPage: React.FC<MessageHubPageProps> = ({ onNavigate }) => {
  const { playClick } = useAudio();

  const cards = [
    {
      id: 'moments' as PageId,
      title: 'Moments',
      subtitle: 'Scrapbook Photo Gallery',
      icon: <PixelCamera className="w-16 h-16" />,
      color: 'bg-[#f4ece1]',
      hoverColor: 'hover:bg-[#e8dcc4]',
      badge: 'Photos 📷',
    },
    {
      id: 'music' as PageId,
      title: 'Music',
      subtitle: 'Songs That Remind Me Of You',
      icon: <PixelCassette className="w-16 h-16" />,
      color: 'bg-[#e2af70]/30',
      hoverColor: 'hover:bg-[#e2af70]/50',
      badge: 'Playlist 📻',
    },
    {
      id: 'letter' as PageId,
      title: 'Letter to Her',
      subtitle: 'Handwritten Note for Didi',
      icon: <PixelEnvelope className="w-16 h-16" isOpen={true} />,
      color: 'bg-[#f7f1e7]',
      hoverColor: 'hover:bg-[#e8cca4]',
      badge: 'Dear Didi ✉️',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 max-w-4xl mx-auto w-full">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 bg-[#fbf7ee] border-4 border-[#3d2b1f] p-6 sm:p-8 rounded-3xl shadow-[8px_8px_0px_#3d2b1f] relative max-w-2xl w-full"
      >
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#e8cca4] px-4 py-1 rounded-full border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] flex items-center gap-1.5">
          <TwineBow className="w-8 h-5" />
          <span className="text-xs font-pixel text-[#3d2b1f]">Interactive Scrapbook</span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <PixelPicnicBasket className="w-8 h-8" />
          <h1 className="font-pixel text-xl sm:text-2xl text-[#3d2b1f]">
            Message Hub
          </h1>
          <PixelFlower className="w-8 h-8" />
        </div>

        <p className="font-serif-cottage text-base sm:text-lg text-[#7a5232] italic">
          "Pick a prop, find a surprise — memories, music, or a letter 🌾!"
        </p>
      </motion.div>

      {/* Main 3 Prop Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playClick();
              onNavigate(card.id);
            }}
            className={`cursor-pointer ${card.color} ${card.hoverColor} border-3 border-[#3d2b1f] rounded-3xl p-6 shadow-[6px_6px_0px_#3d2b1f] flex flex-col items-center text-center relative transition-all group`}
          >
            {/* Badge */}
            <div className="bg-[#fbf7ee] px-3 py-0.5 rounded-full border border-[#3d2b1f] text-[11px] font-pixel text-[#3d2b1f] mb-4 shadow-[1px_1px_0px_#3d2b1f]">
              {card.badge}
            </div>

            {/* Prop Icon */}
            <div className="my-2 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="font-pixel text-base text-[#3d2b1f] mt-3 mb-1">
              {card.title}
            </h3>
            <p className="font-serif-cottage text-xs sm:text-sm text-[#7a5232]">
              {card.subtitle}
            </p>

            <div className="mt-4 text-xs font-pixel text-[#788b68] flex items-center gap-1 group-hover:underline">
              <span>Explore ➔</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bonus / Surprise Cake Gift Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          playClick();
          onNavigate('cake');
        }}
        className="w-full bg-[#d9777f]/20 hover:bg-[#d9777f]/30 border-3 border-[#3d2b1f] rounded-3xl p-5 shadow-[6px_6px_0px_#3d2b1f] flex items-center justify-between cursor-pointer max-w-2xl relative"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <PixelGiftBox className="w-14 h-14" color="#d9777f" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <PixelStar className="w-5 h-5 text-[#ffb703]" />
            </motion.div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#d9777f] text-white px-2 py-0.5 rounded text-[10px] font-pixel">SURPRISE 🕯️</span>
              <h4 className="font-pixel text-sm sm:text-base text-[#3d2b1f]">Make A Wish & Blow Candles!</h4>
            </div>
            <p className="font-serif-cottage text-xs sm:text-sm text-[#7a5232]">
              Click for a slice of pixel magic 🍰!
            </p>
          </div>
        </div>

        <button className="px-4 py-2 bg-[#788b68] text-white font-pixel text-xs rounded-xl border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] hidden sm:block">
          Open 🎁
        </button>
      </motion.div>

    </div>
  );
};
