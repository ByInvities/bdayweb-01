import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TwineBow } from './PixelProps';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4"
        >
          <div className="bg-[#fbf7ee] text-[#3d2b1f] border-2 border-[#3d2b1f] px-5 py-3 rounded-2xl shadow-[4px_4px_0px_#3d2b1f] flex items-center gap-3 relative max-w-sm">
            {/* Miniature Twine Bow on corner */}
            <div className="absolute -top-3 -left-2 rotate-[-15deg]">
              <TwineBow className="w-8 h-6" />
            </div>

            <div className="text-xl">🥺</div>
            <div className="text-xs sm:text-sm font-pixelify font-bold leading-tight">
              {message}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
