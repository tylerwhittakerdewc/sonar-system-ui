import React from 'react';

interface Props {
  lat?: number;
  lon?: number;
  width?: number;
  height?: number;
}

const WorldMap: React.FC<Props> = ({
  lat = 15.5,
  lon = 115.7,
  width = 280,
  height = 160,
}) => {
  // simple equirectangular projection
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;

  // marker adjustments: half the previous size and slightly lower
  const markerSize = 10; // half of previous 20
  const lowerOffset = 8; // push marker a bit lower

  return (
    <div
      className="rounded-lg p-1 shadow-md w-full"
      style={{
        background: 'linear-gradient(180deg, rgba(0,6,8,0.6), rgba(0,8,10,0.25))',
        border: '1px solid rgba(6,240,220,0.08)',
      }}
    >
      <div
        className="relative"
        style={{ width, height, borderRadius: 6, overflow: 'hidden', margin: '0 auto' }}
      >
        {/* image must be placed at public/assets/world-neon.png */}
        <img
          src="/assets/world-neon.png"
          alt="World map"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* smaller marker positioned a bit lower */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: (x - markerSize / 2),
            top: (y - markerSize / 2 + lowerOffset),
            width: markerSize,
            height: markerSize,
            pointerEvents: 'none',
            transform: 'translate(0,0)',
          }}
        >
          <span
            className="absolute inline-flex"
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'rgba(6,255,220,0.14)',
            }}
          />
          <span
            className="absolute inline-flex"
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#06ffd6',
              opacity: 0.95,
            }}
          />
          <span
            className="absolute inline-flex animate-ping"
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#06ffd6',
              opacity: 0.28,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorldMap;