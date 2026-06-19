import React, { useEffect, useState } from 'react';

/**
 * Small compass display. Listens for 'headingChange' window events dispatched
 * by Controls (detail: number). Starts at 045° by default.
 */
const Compass: React.FC = () => {
  const [heading, setHeading] = useState<number>(45);

  useEffect(() => {
    const onChange = (e: Event) => {
      // CustomEvent created in Controls with detail = heading
      const ce = e as CustomEvent<number>;
      if (typeof ce.detail === 'number') setHeading(ce.detail);
    };
    window.addEventListener('headingChange', onChange as EventListener);
    return () => window.removeEventListener('headingChange', onChange as EventListener);
  }, []);

  // simple SVG compass
  const needleRotation = heading; // degrees

  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-700 rounded-lg p-3 text-sm shadow-md w-full">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-semibold">Compass</h4>
        <div className="text-xs text-gray-300">{heading}°</div>
      </div>

      <div className="flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
          <defs>
            <radialGradient id="g" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#123" />
              <stop offset="100%" stopColor="#001" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#g)" stroke="rgba(200,200,200,0.06)" />
          <g transform="translate(60 60)">
            {/* ticks */}
            {[...Array(36)].map((_, i) => {
              const a = (i * 10) * (Math.PI / 180);
              const len = i % 3 === 0 ? 8 : 4;
              const x1 = Math.cos(a) * 46;
              const y1 = Math.sin(a) * 46;
              const x2 = Math.cos(a) * (46 - len);
              const y2 = Math.sin(a) * (46 - len);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,200,200,0.12)" strokeWidth={1} />;
            })}
            {/* N label */}
            <text x="0" y="-40" textAnchor="middle" fill="#9ee6a5" fontSize="12">N</text>

            {/* needle */}
            <g style={{ transform: `rotate(${needleRotation}deg)` }}>
              <path d="M0,-36 L6,6 L0,12 L-6,6 Z" fill="#e84e4e" stroke="#a02a2a" strokeWidth="0.5" />
              <path d="M0,36 L3,6 L0,12 L-3,6 Z" fill="#2e9bff" stroke="#1a6fb0" strokeWidth="0.5" transform="rotate(180)" />
            </g>

            <circle cx="0" cy="0" r="3" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.08)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Compass;