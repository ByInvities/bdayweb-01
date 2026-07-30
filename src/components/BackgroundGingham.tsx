import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundGingham: React.FC<{ children: React.ReactNode; variant?: 'sage' | 'brown' | 'dark' }> = ({ 
  children, 
  variant = 'sage' 
}) => {
  const bgClass = variant === 'brown' 
    ? 'bg-brown-gingham' 
    : variant === 'dark' 
      ? 'bg-sage-gingham-dark' 
      : 'bg-sage-gingham';

  // Ambient floating particle positions
  const floaters = [
    { id: 1, left: '5%', top: '15%', size: 'w-4 h-4', delay: 0 },
    { id: 2, left: '92%', top: '25%', size: 'w-6 h-6', delay: 1 },
    { id: 3, left: '12%', top: '75%', size: 'w-5 h-5', delay: 2 },
    { id: 4, left: '88%', top: '82%', size: 'w-4 h-4', delay: 0.5 },
    { id: 5, left: '50%', top: '8%', size: 'w-3 h-3', delay: 1.5 },
  ];

  return (
    <div className={`min-h-screen w-full ${bgClass} relative overflow-hidden text-[#3d2b1f] font-serif-cottage select-none transition-colors duration-500`}>
      
      {/* Floating Sparkles / Petals */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floaters.map((f) => (
          <motion.div
            key={f.id}
            initial={{ y: 0, opacity: 0.3 }}
            animate={{
              y: [-12, 12, -12],
              rotate: [0, 15, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut",
            }}
            style={{ left: f.left, top: f.top }}
            className={`absolute ${f.size} text-[#788b68]/40`}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between pt-16 pb-8 px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
};
