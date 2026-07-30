import React from 'react';

// Twine Bow SVG Component
export const TwineBow: React.FC<{ className?: string }> = ({ className = "w-16 h-10" }) => (
  <svg viewBox="0 0 64 40" className={`inline-block ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Loop */}
    <path d="M 32 20 C 18 8 4 14 10 26 C 16 34 28 24 32 20 Z" fill="#b08968" stroke="#5c3d2e" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 32 20 C 20 12 8 16 12 24" stroke="#d4b285" strokeWidth="1.5" strokeLinecap="round" />
    {/* Right Loop */}
    <path d="M 32 20 C 46 8 60 14 54 26 C 48 34 36 24 32 20 Z" fill="#b08968" stroke="#5c3d2e" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 32 20 C 44 12 56 16 52 24" stroke="#d4b285" strokeWidth="1.5" strokeLinecap="round" />
    {/* Center Knot */}
    <rect x="28" y="16" width="8" height="8" rx="2" fill="#7f5539" stroke="#3d2314" strokeWidth="2" />
    <rect x="30" y="18" width="4" height="4" fill="#d4b285" />
    {/* Left Tail */}
    <path d="M 30 23 C 24 30 18 36 12 38" stroke="#5c3d2e" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 30 23 C 24 30 18 36 12 38" stroke="#b08968" strokeWidth="1.5" strokeLinecap="round" />
    {/* Right Tail */}
    <path d="M 34 23 C 40 30 46 36 52 38" stroke="#5c3d2e" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 34 23 C 40 30 46 36 52 38" stroke="#b08968" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Pixel Gift Box
export const PixelGiftBox: React.FC<{ className?: string; color?: string }> = ({ className = "w-16 h-16", color = "#d9777f" }) => (
  <svg viewBox="0 0 32 32" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Shadow */}
    <rect x="3" y="28" width="26" height="2" fill="#2d1f18" opacity="0.3" />
    {/* Box Body */}
    <rect x="4" y="14" width="24" height="14" fill={color} />
    <rect x="4" y="14" width="24" height="2" fill="#b3565e" />
    {/* Box Lid */}
    <rect x="3" y="9" width="26" height="5" fill="#f4ece1" />
    <rect x="3" y="13" width="26" height="1" fill="#d4c3b0" />
    {/* Ribbon Vertical */}
    <rect x="14" y="9" width="4" height="19" fill="#e2af70" />
    {/* Ribbon Bow Top */}
    <rect x="10" y="5" width="5" height="4" fill="#e2af70" />
    <rect x="17" y="5" width="5" height="4" fill="#e2af70" />
    <rect x="14" y="6" width="4" height="3" fill="#c69255" />
    {/* Highlights */}
    <rect x="5" y="15" width="2" height="11" fill="#ffffff" opacity="0.25" />
    {/* Border */}
    <path d="M3 9h26v5H3zM4 14h24v14H4z" fill="none" stroke="#3d2b1f" strokeWidth="1" />
  </svg>
);

// Pixel Picnic Basket
export const PixelPicnicBasket: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 32 32" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Handle */}
    <rect x="12" y="3" width="8" height="2" fill="#8c5a3c" />
    <rect x="10" y="5" width="2" height="8" fill="#8c5a3c" />
    <rect x="20" y="5" width="2" height="8" fill="#8c5a3c" />
    {/* Red Gingham Cloth Peeking Out */}
    <rect x="5" y="12" width="22" height="3" fill="#d9534f" />
    <rect x="7" y="12" width="3" height="3" fill="#ffffff" />
    <rect x="15" y="12" width="3" height="3" fill="#ffffff" />
    <rect x="22" y="12" width="3" height="3" fill="#ffffff" />
    {/* Basket Body */}
    <rect x="4" y="15" width="24" height="13" fill="#b07d52" />
    {/* Woven texture */}
    <rect x="6" y="17" width="4" height="2" fill="#7a5232" />
    <rect x="14" y="17" width="4" height="2" fill="#7a5232" />
    <rect x="22" y="17" width="4" height="2" fill="#7a5232" />
    <rect x="10" y="21" width="4" height="2" fill="#7a5232" />
    <rect x="18" y="21" width="4" height="2" fill="#7a5232" />
    <rect x="6" y="25" width="4" height="2" fill="#7a5232" />
    <rect x="14" y="25" width="4" height="2" fill="#7a5232" />
    <rect x="22" y="25" width="4" height="2" fill="#7a5232" />
    {/* Outline */}
    <path d="M4 15h24v13H4z" fill="none" stroke="#3d2b1f" strokeWidth="1" />
  </svg>
);

// Pixel Camera
export const PixelCamera: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 32 32" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Camera Top / Flash */}
    <rect x="9" y="7" width="5" height="3" fill="#788b68" />
    <rect x="21" y="8" width="3" height="2" fill="#e2af70" />
    {/* Camera Body */}
    <rect x="4" y="10" width="24" height="16" fill="#f4ece1" />
    <rect x="4" y="10" width="24" height="5" fill="#788b68" />
    {/* Lens Outer */}
    <rect x="11" y="14" width="10" height="10" fill="#3d2b1f" />
    <rect x="12" y="15" width="8" height="8" fill="#526742" />
    {/* Lens Reflection */}
    <rect x="13" y="16" width="3" height="3" fill="#ffffff" />
    <rect x="18" y="20" width="1" height="1" fill="#ffffff" />
    {/* Strap Loop */}
    <rect x="2" y="12" width="2" height="4" fill="#a07153" />
    <rect x="28" y="12" width="2" height="4" fill="#a07153" />
    {/* Outline */}
    <path d="M4 10h24v16H4z" fill="none" stroke="#3d2b1f" strokeWidth="1" />
  </svg>
);

// Pixel Cassette / Record Player
export const PixelCassette: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 32 32" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Body */}
    <rect x="3" y="8" width="26" height="17" fill="#e2af70" />
    <rect x="5" y="10" width="22" height="13" fill="#3d2b1f" />
    {/* Tape Spools */}
    <rect x="8" y="13" width="6" height="6" fill="#f4ece1" />
    <rect x="10" y="15" width="2" height="2" fill="#3d2b1f" />
    <rect x="18" y="13" width="6" height="6" fill="#f4ece1" />
    <rect x="20" y="15" width="2" height="2" fill="#3d2b1f" />
    {/* Middle Strip */}
    <rect x="14" y="15" width="4" height="2" fill="#d9777f" />
    {/* Bottom Buttons */}
    <rect x="6" y="22" width="3" height="2" fill="#788b68" />
    <rect x="10" y="22" width="3" height="2" fill="#788b68" />
    <rect x="14" y="22" width="3" height="2" fill="#d9777f" />
    <rect x="18" y="22" width="3" height="2" fill="#788b68" />
    <rect x="22" y="22" width="3" height="2" fill="#788b68" />
    {/* Outline */}
    <path d="M3 8h26v17H3z" fill="none" stroke="#3d2b1f" strokeWidth="1" />
  </svg>
);

// Pixel Envelope with Mushroom Wax Seal
export const PixelEnvelope: React.FC<{ className?: string; isOpen?: boolean }> = ({ className = "w-16 h-16", isOpen = false }) => (
  <svg viewBox="0 0 32 32" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Envelope Body */}
    <rect x="3" y="10" width="26" height="17" fill="#f4ece1" />
    {/* Envelope Back flap lines */}
    <path d="M3 10l13 9 13-9" fill="none" stroke="#d4c3b0" strokeWidth="1.5" />
    {isOpen ? (
      /* Open Flap */
      <polygon points="3,10 16,1 29,10" fill="#e8dcc4" stroke="#3d2b1f" strokeWidth="1" />
    ) : (
      /* Closed Flap */
      <polygon points="3,10 16,19 29,10" fill="#fbf7ee" stroke="#3d2b1f" strokeWidth="1" />
    )}
    {/* Wax Seal (Mushroom) */}
    <circle cx="16" cy="18" r="4" fill="#d9777f" />
    <circle cx="16" cy="18" r="3" fill="#b3565e" />
    {/* Mushroom Cap on Seal */}
    <path d="M14 17c0-1.5 1-2.5 2-2.5s2 1 2 2.5h-4z" fill="#ffffff" />
    <rect x="15.5" y="17" width="1" height="2" fill="#ffffff" />
    {/* Outer Outline */}
    <path d="M3 10h26v17H3z" fill="none" stroke="#3d2b1f" strokeWidth="1" />
  </svg>
);

// Pixel Cake with Candle
export const PixelCake: React.FC<{ className?: string; candlesLit?: boolean }> = ({ className = "w-24 h-24", candlesLit = true }) => (
  <svg viewBox="0 0 40 40" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Plate */}
    <ellipse cx="20" cy="35" rx="18" ry="3" fill="#e2af70" />
    <ellipse cx="20" cy="35" rx="16" ry="2" fill="#f4ece1" />
    
    {/* Base Layer */}
    <rect x="8" y="24" width="24" height="9" fill="#fbf7ee" />
    <rect x="8" y="27" width="24" height="3" fill="#e2af70" />
    <rect x="8" y="24" width="24" height="2" fill="#d9777f" />
    {/* Drips */}
    <rect x="10" y="26" width="2" height="3" fill="#d9777f" />
    <rect x="18" y="26" width="3" height="4" fill="#d9777f" />
    <rect x="27" y="26" width="2" height="2" fill="#d9777f" />

    {/* Strawberries on top */}
    <circle cx="12" cy="22" r="2" fill="#d9777f" />
    <circle cx="20" cy="22" r="2" fill="#d9777f" />
    <circle cx="28" cy="22" r="2" fill="#d9777f" />

    {/* Candles */}
    <rect x="14" y="14" width="2" height="8" fill="#f4ece1" />
    <rect x="14" y="16" width="2" height="1" fill="#788b68" />
    <rect x="19" y="12" width="2" height="10" fill="#f4ece1" />
    <rect x="19" y="15" width="2" height="1" fill="#788b68" />
    <rect x="24" y="14" width="2" height="8" fill="#f4ece1" />
    <rect x="24" y="17" width="2" height="1" fill="#788b68" />

    {candlesLit ? (
      <g>
        {/* Flames */}
        <circle cx="15" cy="11" r="2" fill="#ffb703" />
        <circle cx="15" cy="10" r="1" fill="#fb8500" />
        <rect x="14.5" y="9" width="1" height="1" fill="#ffffff" />
        <circle cx="20" cy="9" r="2.5" fill="#ffb703" />
        <circle cx="20" cy="8" r="1.5" fill="#fb8500" />
        <rect x="19.5" y="7" width="1" height="1" fill="#ffffff" />
        <circle cx="25" cy="11" r="2" fill="#ffb703" />
        <circle cx="25" cy="10" r="1" fill="#fb8500" />
        <rect x="24.5" y="9" width="1" height="1" fill="#ffffff" />
      </g>
    ) : (
      <g>
        {/* Smoke curls */}
        <path d="M15 12 Q13 9 15 7" fill="none" stroke="#a0a0a0" strokeWidth="1" strokeDasharray="1 1" />
        <path d="M20 10 Q22 7 20 5" fill="none" stroke="#a0a0a0" strokeWidth="1" strokeDasharray="1 1" />
        <path d="M25 12 Q27 9 25 7" fill="none" stroke="#a0a0a0" strokeWidth="1" strokeDasharray="1 1" />
      </g>
    )}

    {/* Cake Outline */}
    <rect x="8" y="24" width="24" height="9" fill="none" stroke="#3d2b1f" strokeWidth="1" />
  </svg>
);

// Pixel Mushroom
export const PixelMushroom: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 16 16" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Cap */}
    <rect x="4" y="3" width="8" height="6" fill="#d9777f" />
    <rect x="3" y="4" width="10" height="4" fill="#d9777f" />
    <rect x="2" y="6" width="12" height="2" fill="#d9777f" />
    {/* White Dots */}
    <rect x="4" y="5" width="2" height="2" fill="#ffffff" />
    <rect x="9" y="4" width="2" height="2" fill="#ffffff" />
    <rect x="10" y="7" width="1" height="1" fill="#ffffff" />
    {/* Stem */}
    <rect x="6" y="9" width="4" height="5" fill="#f4ece1" />
    <rect x="5" y="13" width="6" height="1" fill="#e8dcc4" />
    {/* Border */}
    <path d="M2 6h12v2H2zM4 3h8v6H4zM6 9h4v5H6z" fill="none" stroke="#3d2b1f" strokeWidth="0.5" />
  </svg>
);

// Pixel Star
export const PixelStar: React.FC<{ className?: string; color?: string }> = ({ className = "w-6 h-6", color = "#ffb703" }) => (
  <svg viewBox="0 0 16 16" className={`pixelated ${className}`} shapeRendering="crispEdges">
    <rect x="7" y="1" width="2" height="14" fill={color} />
    <rect x="1" y="7" width="14" height="2" fill={color} />
    <rect x="4" y="4" width="8" height="8" fill={color} />
    <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
  </svg>
);

// Pixel Heart
export const PixelHeart: React.FC<{ className?: string; color?: string }> = ({ className = "w-6 h-6", color = "#d9777f" }) => (
  <svg viewBox="0 0 16 16" className={`pixelated ${className}`} shapeRendering="crispEdges">
    <rect x="2" y="4" width="4" height="4" fill={color} />
    <rect x="10" y="4" width="4" height="4" fill={color} />
    <rect x="1" y="5" width="14" height="4" fill={color} />
    <rect x="2" y="9" width="12" height="2" fill={color} />
    <rect x="4" y="11" width="8" height="2" fill={color} />
    <rect x="6" y="13" width="4" height="2" fill={color} />
    <rect x="3" y="5" width="2" height="2" fill="#ffffff" opacity="0.6" />
  </svg>
);

// Pixel Flower
export const PixelFlower: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={`pixelated ${className}`} shapeRendering="crispEdges">
    {/* Petals */}
    <circle cx="8" cy="4" r="3" fill="#f4ece1" />
    <circle cx="4" cy="8" r="3" fill="#f4ece1" />
    <circle cx="12" cy="8" r="3" fill="#f4ece1" />
    <circle cx="8" cy="12" r="3" fill="#f4ece1" />
    {/* Center */}
    <circle cx="8" cy="8" r="2.5" fill="#e2af70" />
  </svg>
);
