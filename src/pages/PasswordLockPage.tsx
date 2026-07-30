import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PixelEnvelope, TwineBow, PixelStar, PixelHeart } from '../components/PixelProps';
import { useAudio } from '../context/AudioContext';
import { Toast } from '../components/Toast';

interface PasswordLockPageProps {
  onUnlockSuccess: () => void;
}

export const PasswordLockPage: React.FC<PasswordLockPageProps> = ({ onUnlockSuccess }) => {
  const { playClick, playError, playSuccess, playEnvelopeOpen } = useAudio();
  const [pin, setPin] = useState<string>('');
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const CORRECT_PIN = '3107'; // 31st July

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      playClick();
      const nextPin = pin + num;
      setPin(nextPin);

      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      playClick();
      setPin(pin.slice(0, -1));
    }
  };

  const handleClear = () => {
    playClick();
    setPin('');
  };

  const verifyPin = (inputPin: string) => {
    if (inputPin === CORRECT_PIN) {
      playSuccess();
      playEnvelopeOpen();
      setIsUnlocked(true);
      setTimeout(() => {
        onUnlockSuccess();
      }, 1200);
    } else {
      playError();
      setErrorToast("Not quite! Try the date again 🥺");
      setTimeout(() => {
        setErrorToast(null);
        setPin('');
      }, 2500);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 relative">
      
      {/* Toast Notification */}
      <Toast message={errorToast} />

      {/* Landscape Card Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-2xl sm:max-w-3xl w-full bg-[#fbf7ee] border-4 border-[#3d2b1f] rounded-3xl p-6 sm:p-8 shadow-[10px_10px_0px_#3d2b1f] relative text-center"
      >
        {/* Top Bow */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#e8cca4] px-5 py-1 rounded-full border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] flex items-center gap-1.5">
          <TwineBow className="w-8 h-5" />
          <span className="text-xs font-pixel text-[#3d2b1f]">Encrypted Letter</span>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-4 left-4">
          <PixelHeart className="w-5 h-5 text-[#d9777f]" />
        </div>
        <div className="absolute top-4 right-4">
          <PixelStar className="w-5 h-5 text-[#ffb703]" />
        </div>

        {/* Landscape Horizontal Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center my-4">
          
          {/* Left Side: Envelope & Instructions */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              animate={
                isUnlocked 
                  ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }
                  : errorToast 
                    ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                    : { y: [-3, 3, -3] }
              }
              transition={{ duration: errorToast ? 0.4 : 3, repeat: errorToast ? 0 : Infinity }}
              className="my-2"
            >
              <PixelEnvelope className="w-28 h-28 sm:w-32 sm:h-32" isOpen={isUnlocked} />
            </motion.div>

            <h2 className="font-pixel text-base sm:text-lg text-[#3d2b1f] mt-2 mb-1">
              Enter the special date 🔐
            </h2>
            <p className="font-serif-cottage text-sm text-[#7a5232] italic">
              Hint: Yamu Didi's birthday date (DDMM)
            </p>

            {/* Hint toggle */}
            <button
              onClick={() => {
                playClick();
                setShowHint(!showHint);
              }}
              className="text-xs font-pixelify text-[#7a5232] hover:text-[#3d2b1f] underline cursor-pointer mt-3"
            >
              {showHint ? "July 31st ➔ 3107" : "Need another hint? 💡"}
            </button>
          </div>

          {/* Right Side: Keypad & PIN Display */}
          <div className="flex flex-col items-center">
            
            {/* PIN Display Boxes */}
            <div className="flex justify-center gap-3 mb-5">
              {[0, 1, 2, 3].map((idx) => {
                const digit = pin[idx];
                return (
                  <div
                    key={idx}
                    className={`w-11 h-12 rounded-xl border-3 border-[#3d2b1f] flex items-center justify-center font-pixel text-xl transition-all shadow-[2px_2px_0px_#3d2b1f] ${
                      digit 
                        ? 'bg-[#788b68] text-white scale-105' 
                        : 'bg-[#e8dcc4] text-transparent'
                    }`}
                  >
                    {digit ? '•' : ''}
                  </div>
                );
              })}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((item) => {
                const isAction = item === 'C' || item === '⌫';
                return (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'C') handleClear();
                      else if (item === '⌫') handleDelete();
                      else handleKeyPress(item);
                    }}
                    className={`py-2.5 rounded-xl border-2 border-[#3d2b1f] font-pixel text-xs sm:text-sm transition-all shadow-[2px_2px_0px_#3d2b1f] active:translate-y-0.5 cursor-pointer ${
                      isAction
                        ? 'bg-[#e2af70] hover:bg-[#c69255] text-[#3d2b1f]'
                        : 'bg-[#f4ece1] hover:bg-[#788b68] hover:text-white text-[#3d2b1f]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};
