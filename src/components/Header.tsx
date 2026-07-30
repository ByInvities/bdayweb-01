import React, { useState } from 'react';
import { Volume2, VolumeX, Home, Sparkles, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { isMuted, toggleMute, volume, setVolume, playClick, currentTrackName } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const canGoHome = currentPage !== 'opening' && currentPage !== 'no_redirect' && currentPage !== 'password';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand / Home Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {canGoHome && (
            <button
              onClick={() => {
                playClick();
                onNavigate('hub');
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#fbf7ee] text-[#3d2b1f] border-2 border-[#3d2b1f] rounded-lg shadow-[2px_2px_0px_#3d2b1f] hover:bg-[#e2af70] transition-colors text-xs font-pixel active:translate-y-0.5 cursor-pointer"
              title="Return to Message Hub"
            >
              <Home className="w-3.5 h-3.5 text-[#788b68]" />
              <span className="hidden sm:inline">Hub</span>
            </button>
          )}

          <div className="bg-[#fbf7ee]/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] flex items-center gap-2 text-xs font-pixelify text-[#3d2b1f] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d9777f] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Yamu Didi's Birthday 🎀</span>
          </div>
        </div>

        {/* Right Side: Audio Controls */}
        <div className="flex items-center gap-2 pointer-events-auto relative">
          {/* Currently Playing Track Label */}
          {!isMuted && (
            <div className="hidden md:flex items-center gap-1.5 bg-[#788b68] text-white px-2.5 py-1 rounded-lg border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] text-[11px] font-retro tracking-wide animate-pulse-gentle">
              <Music className="w-3 h-3 text-[#f4ece1]" />
              <span className="max-w-[120px] truncate">{currentTrackName}</span>
            </div>
          )}

          {/* Mute / Unmute Button */}
          <button
            onClick={() => {
              playClick();
              toggleMute();
            }}
            onMouseEnter={() => setShowVolumeSlider(true)}
            className={`p-2 rounded-lg border-2 border-[#3d2b1f] shadow-[2px_2px_0px_#3d2b1f] transition-transform active:scale-95 cursor-pointer ${
              isMuted 
                ? 'bg-[#d9777f] text-white' 
                : 'bg-[#fbf7ee] text-[#3d2b1f] hover:bg-[#e8dcc4]'
            }`}
            title={isMuted ? "Unmute Ambient Music" : "Mute Sound"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#788b68]" />
            )}
          </button>

          {/* Volume Hover Slider */}
          {showVolumeSlider && !isMuted && (
            <div 
              onMouseLeave={() => setShowVolumeSlider(false)}
              className="absolute right-0 top-12 bg-[#fbf7ee] border-2 border-[#3d2b1f] shadow-[3px_3px_0px_#3d2b1f] p-2.5 rounded-lg flex items-center gap-2 w-36 z-50"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#788b68] cursor-pointer h-2 bg-[#e8dcc4] rounded-lg"
              />
              <span className="text-[10px] font-pixel text-[#3d2b1f]">{Math.round(volume * 100)}%</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
