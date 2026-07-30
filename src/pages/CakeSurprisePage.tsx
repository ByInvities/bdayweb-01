import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PixelCake, TwineBow, PixelStar, PixelHeart } from '../components/PixelProps';
import { useAudio } from '../context/AudioContext';
import { Mic, MicOff, Wind, Sparkles } from 'lucide-react';

interface CakeSurprisePageProps {
  onProceedToFinal: () => void;
}

export const CakeSurprisePage: React.FC<CakeSurprisePageProps> = ({ onProceedToFinal }) => {
  const { playClick, playCandleOut, playCelebrationFanfare } = useAudio();
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [micDenied, setMicDenied] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const autoRedirectTimerRef = useRef<number | null>(null);

  const triggerCandleBlow = () => {
    if (!candlesLit) return;

    setCandlesLit(false);
    setWishMade(true);
    playCandleOut();
    playCelebrationFanfare();

    stopMicListening();

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#788b68', '#d9777f', '#e2af70', '#f4ece1', '#ffb703'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 400);
    } catch {}

    // AUTOMATIC REDIRECT after 6 seconds to final page without any buttons!
    autoRedirectTimerRef.current = window.setTimeout(() => {
      onProceedToFinal();
    }, 6000);
  };

  const startMicListening = async () => {
    try {
      playClick();
      setMicDenied(false);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setMicVolume(Math.min(100, Math.round((avg / 255) * 100)));

        if (avg > 42) {
          triggerCandleBlow();
        } else {
          animationFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      animationFrameRef.current = requestAnimationFrame(checkVolume);

    } catch {
      setMicDenied(true);
      setIsListeningMic(false);
    }
  };

  const stopMicListening = () => {
    setIsListeningMic(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopMicListening();
      if (autoRedirectTimerRef.current) {
        clearTimeout(autoRedirectTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 max-w-4xl mx-auto w-full">
      
      {/* Landscape Container Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-[#fbf7ee] border-4 border-[#3d2b1f] rounded-3xl p-6 sm:p-10 shadow-[12px_12px_0px_#3d2b1f] relative text-center"
      >
        {/* Top Header Bow */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#e8cca4] px-5 py-1.5 rounded-full border-2 border-[#3d2b1f] shadow-[3px_3px_0px_#3d2b1f] flex items-center gap-2">
          <TwineBow className="w-9 h-6" />
          <span className="text-xs font-pixel text-[#3d2b1f]">Make A Wish</span>
        </div>

        <div className="absolute top-4 left-4">
          <PixelStar className="w-6 h-6 text-[#ffb703]" />
        </div>
        <div className="absolute top-4 right-4">
          <PixelHeart className="w-6 h-6 text-[#d9777f]" />
        </div>

        {/* Landscape Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-4">
          
          {/* Left Column: Pixel Cake Illustration */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              animate={candlesLit ? { y: [-4, 4, -4] } : { scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="my-2"
            >
              <PixelCake className="w-40 h-40 sm:w-48 sm:h-48" candlesLit={candlesLit} />
            </motion.div>
          </div>

          {/* Right Column: Title, Instructions & Action Controls */}
          <div className="text-left flex flex-col justify-center">
            
            <h1 className="font-pixel text-xl sm:text-2xl text-[#3d2b1f] mb-2">
              {candlesLit ? "Blow Your Candles! 🕯️" : "Wish Granted! ✨"}
            </h1>
            <p className="font-serif-cottage text-base text-[#7a5232] italic mb-6">
              {candlesLit 
                ? "Close your eyes, make a special birthday wish, and blow into your mic or tap!" 
                : "May all your dreams come true, Yamu Didi! Preparing your finale..."
              }
            </p>

            {/* Wish Celebration Text Banner (Shows after blow) */}
            <AnimatePresence>
              {wishMade && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#e8cca4] border-3 border-[#3d2b1f] p-4 rounded-2xl mb-2 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center gap-2 text-base font-pixel text-[#3d2b1f] mb-1">
                    <Sparkles className="w-5 h-5 text-[#d9777f]" />
                    <span>Happy Birthday Didi!</span>
                  </div>
                  <p className="font-serif-cottage text-sm sm:text-base text-[#5c3d2e] italic">
                    "May your upcoming year be filled with warmth, health, giggles, and endless love!"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Microphone Volume Indicator */}
            {isListeningMic && candlesLit && (
              <div className="mb-6 bg-[#f4ece1] border-2 border-[#3d2b1f] p-3 rounded-2xl w-full">
                <div className="flex items-center justify-between text-xs font-pixel text-[#3d2b1f] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Mic className="w-4 h-4 text-[#788b68] animate-pulse" />
                    Listening for blow...
                  </span>
                  <span className="text-[#d9777f] font-bold">{micVolume}%</span>
                </div>
                <div className="w-full bg-[#e8dcc4] h-2.5 rounded-full overflow-hidden border border-[#3d2b1f]">
                  <div 
                    className="h-full bg-[#788b68] transition-all duration-75"
                    style={{ width: `${micVolume}%` }}
                  />
                </div>
              </div>
            )}

            {/* Mic Denied Friendly Notice */}
            {micDenied && candlesLit && (
              <div className="mb-6 bg-[#f4ece1] border-2 border-[#3d2b1f] p-3 rounded-2xl text-xs font-pixelify text-[#d9777f]">
                <div className="flex items-center gap-1 font-bold">
                  <MicOff className="w-4 h-4" />
                  <span>Mic access not granted</span>
                </div>
                <span className="text-[#3d2b1f]">Use the manual blow button below 💨</span>
              </div>
            )}

            {/* Action Buttons (ONLY SHOWN BEFORE blowing candles) */}
            {candlesLit && (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                {!isListeningMic && (
                  <button
                    onClick={startMicListening}
                    className="w-full sm:w-auto px-5 py-3.5 bg-[#788b68] hover:bg-[#526742] text-white font-pixel text-xs rounded-2xl border-2 border-[#3d2b1f] shadow-[4px_4px_0px_#3d2b1f] flex items-center justify-center gap-2 transition-transform active:translate-y-1 cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Blow via Mic 🕯️</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    playClick();
                    triggerCandleBlow();
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#e2af70] hover:bg-[#c69255] text-[#3d2b1f] font-pixel text-xs rounded-2xl border-2 border-[#3d2b1f] shadow-[4px_4px_0px_#3d2b1f] flex items-center justify-center gap-2 transition-transform active:translate-y-1 cursor-pointer"
                >
                  <Wind className="w-4 h-4" />
                  <span>Tap to Blow 💨</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </motion.div>

    </div>
  );
};
