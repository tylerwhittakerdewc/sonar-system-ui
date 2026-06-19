import React, { useEffect, useRef, useState } from 'react';

/**
 * Small compass display. Listens for 'headingChange' window events dispatched
 * by Controls (detail: number). Starts at 045° by default.
 */
const Compass: React.FC = () => {
  const [heading, setHeading] = useState<number>(45);
  const ref = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const dispatchHeading = (deg: number) => {
    setHeading(deg);
    const ev = new CustomEvent<number>('headingChange', { detail: deg });
    window.dispatchEvent(ev);
  };

  const getBearingFromEvent = (clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return heading;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    // atan2(dx, -dy) => 0 = north, 90 = east, 180 = south
    const angleDeg = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const bearing = (angleDeg + 360) % 360;
    return Math.round(bearing);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const b = getBearingFromEvent(e.clientX, e.clientY);
      dispatchHeading(b);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // simple SVG compass
  const needleRotation = heading; // degrees

  return (
    <div
      ref={ref}
      className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-cyan-600/20 rounded-lg p-3 text-sm shadow-md w-full cursor-pointer"
      onMouseDown={(e) => {
        draggingRef.current = true;
        const b = getBearingFromEvent(e.clientX, e.clientY);
        dispatchHeading(b);
      }}
      onClick={(e) => {
        const b = getBearingFromEvent(e.clientX, e.clientY);
        dispatchHeading(b);
      }}
      role="slider"
      aria-label="Bearing control"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') dispatchHeading((heading - 5 + 360) % 360);
        if (e.key === 'ArrowRight') dispatchHeading((heading + 5) % 360);
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-semibold">Bearing</h4>
        <div className="text-xs text-gray-300">{heading}°</div>
      </div>

      <div className="flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
          <defs>
            <radialGradient id="g" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#022" />
              <stop offset="100%" stopColor="#001" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#g)" stroke="rgba(20,240,210,0.06)" />
          <g transform="translate(60 60)">
            {/* ticks */}
            {[...Array(36)].map((_, i) => {
              const a = (i * 10) * (Math.PI / 180);
              const len = i % 3 === 0 ? 8 : 4;
              const x1 = Math.cos(a) * 46;
              const y1 = Math.sin(a) * 46;
              const x2 = Math.cos(a) * (46 - len);
              const y2 = Math.sin(a) * (46 - len);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(20,240,210,0.12)" strokeWidth={1} />;
            })}
            {/* N label */}
            <text x="0" y="-40" textAnchor="middle" fill="#76fff0" fontSize="12">N</text>

            {/* needle */}
            <g style={{ transform: `rotate(${needleRotation}deg)` }}>
              <path d="M0,-36 L6,6 L0,12 L-6,6 Z" fill="#06ffd6" stroke="#04a88a" strokeWidth="0.5" />
              <path d="M0,36 L3,6 L0,12 L-3,6 Z" fill="#024dff" stroke="#013a8a" strokeWidth="0.5" transform="rotate(180)" />
            </g>

            <circle cx="0" cy="0" r="3" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.08)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Compass;