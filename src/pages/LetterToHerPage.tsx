import React from "react";
import { motion } from "framer-motion";
import {
  TwineBow,
  PixelMushroom,
  PixelFlower,
  PixelStar,
  PixelHeart,
} from "../components/PixelProps";
import { useAudio } from "../context/AudioContext";

interface LetterToHerPageProps {
  onBackToHub: () => void;
}

export const LetterToHerPage: React.FC<LetterToHerPageProps> = ({
  onBackToHub,
}) => {
  const { playClick } = useAudio();

  // Floating stickers and emojis scattered OUTSIDE the letter card
  const floatingStickers = [
    {
      element: <PixelMushroom className="w-9 h-9" />,
      top: "12%",
      left: "3%",
      delay: 0,
    },
    {
      element: <PixelFlower className="w-8 h-8" />,
      top: "22%",
      right: "4%",
      delay: 0.5,
    },
    {
      element: <PixelStar className="w-7 h-7 text-[#ffb703]" />,
      bottom: "18%",
      left: "4%",
      delay: 1,
    },
    {
      element: <PixelHeart className="w-8 h-8 text-[#d9777f]" />,
      bottom: "25%",
      right: "3%",
      delay: 1.5,
    },
    {
      element: <span className="text-3xl">🌸</span>,
      top: "48%",
      left: "2%",
      delay: 0.8,
    },
    {
      element: <span className="text-3xl">✨</span>,
      top: "52%",
      right: "2%",
      delay: 1.2,
    },
    {
      element: <span className="text-3xl">🎀</span>,
      bottom: "8%",
      left: "6%",
      delay: 0.3,
    },
    {
      element: <span className="text-3xl">🍄</span>,
      bottom: "10%",
      right: "6%",
      delay: 1.7,
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 max-w-4xl mx-auto w-full relative">
      {/* Floating Stickers & Emojis OUTSIDE the Letter Box */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden sm:block">
        {floatingStickers.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [-8, 8, -8],
              rotate: [-6, 6, -6],
            }}
            transition={{
              duration: 3.5 + (idx % 3) * 0.5,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
          >
            {item.element}
          </motion.div>
        ))}
      </div>

      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-6 relative z-20">
        <button
          onClick={() => {
            playClick();
            onBackToHub();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#fbf7ee] text-[#3d2b1f] border-3 border-[#3d2b1f] rounded-2xl shadow-[4px_4px_0px_#3d2b1f] hover:bg-[#e8cca4] font-pixel text-xs cursor-pointer transition-transform active:translate-y-1"
        >
          <TwineBow className="w-6 h-4" />
          <span>➔ Back to Hub</span>
        </button>

        <div className="bg-[#a07153] text-white px-3 py-1 rounded-xl border-2 border-[#3d2b1f] font-pixelify text-xs font-bold flex items-center gap-2">
          <PixelMushroom className="w-5 h-5" />
          <span>Handwritten Letter</span>
        </div>
      </div>

      {/* Clean Single Parchment Letter Box (No inner side box!) */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotate: -1 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        className="w-full bg-[#fbf7ee] border-4 border-[#3d2b1f] rounded-3xl p-6 sm:p-10 shadow-[12px_12px_0px_#3d2b1f] relative text-[#3d2b1f] z-20"
      >
        {/* Twine Bow Top */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#e8cca4] px-5 py-1.5 rounded-full border-2 border-[#3d2b1f] shadow-[3px_3px_0px_#3d2b1f] flex items-center gap-2">
          <TwineBow className="w-9 h-6" />
          <span className="text-xs font-pixel text-[#3d2b1f]">
            Sealed With Love
          </span>
        </div>

        {/* Salutation */}
        <div className="mb-6 border-b-2 border-[#e8dcc4] pb-4">
          <h1 className="font-handwriting text-4xl sm:text-5xl text-[#3d2b1f] font-bold">
            Dear Yamu Didi,, 🌸
          </h1>
          <p className="font-serif-cottage text-sm text-[#7a5232] italic mt-1">
            A Letter From My Heart • July 31st
          </p>
        </div>

        {/* Letter Content */}
        <div className="space-y-4 font-handwriting text-2xl sm:text-3xl text-[#3d2b1f] leading-relaxed">
          <p>
            Being with you has always been the best kind of chaos teasing you,
            annoying you, watching you get mock-angry and then laugh anyway. I
            never once imagined a day would come where you'd be so busy with
            your own life that I'd have to think a hundred times before I could
            tease you again. Growing up really does sneak up on us, doesn't it?
          </p>

          <p>
            I still remember your vidai like it happened five minutes ago. My
            heart was so full that day full of tears I didn't let fall, full of
            every bit of love and care I've carried for you my whole life, full
            of things I wanted to say but couldn't find the courage to. My
            throat felt like it would burst from holding it all in.
          </p>

          <p>
            But I stayed quiet, mostly because I was shy… and partly because I
            knew if I let even one tear slip, your makeup would run, and jiju
            definitely wouldn't want to take home a bride looking like
            Manjulika.
          </p>

          <p>
            Okay okay, I'm kidding but only a little. The real reason I held
            it back is because what I feel for you was never meant to fall
            softly like flowers. It was always meant to pour like rain crashing
            into sunlight messy, sudden, overwhelming and somehow, out of
            that exact chaos, we've always made something beautiful. That's us.
            That's every memory we've built together.
          </p>

          <p>
            I know I'm silly, a little idiotic, and probably the most annoying
            brother life could've given you. But you being my sister that's
            the most beautiful, most precious chapter of my entire life, and I
            wouldn't trade it for anything.
          </p>

          <p>
            I love you more than I've ever known how to say, my Yamu Di. And no
            matter how far, how busy, or how grown-up we get please don't
            forget your silly brother.
          </p>

          <p className="font-bold text-[#d9777f]">
            Happy Birthday, Didi. My person, my chaos, my rainbow. 🎂❤️
          </p>

        </div>

        {/* Sign-off */}
        <div className="mt-8 border-t-2 border-[#e8dcc4] pt-4 flex items-center justify-between">
          <div>
            <div className="font-handwriting text-3xl font-bold text-[#3d2b1f]">
              Lots of love, always,
            </div>
            <div className="font-serif-cottage text-base text-[#7a5232] italic">
              ANSHU ✨
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PixelHeart className="w-8 h-8 text-[#d9777f]" />
            <span className="text-2xl">🎀</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
