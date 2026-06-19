import React from 'react';

interface Props {
  lat?: number;
  lon?: number;
  width?: number;
  height?: number;
  label?: string;
}

const WorldMap: React.FC<Props> = ({
  lat = 15.5,
  lon = 115.7,
  width = 280,
  height = 160,
  label = 'South China Sea',
}) => {
  // simple equirectangular projection
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;

  return (
    <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-cyan-600/20 rounded-lg p-3 shadow-md w-full">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-semibold">Global Map</h4>
        <span className="text-xs text-gray-300">{label}</span>
      </div>

      <div className="relative">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block mx-auto rounded bg-black/60"
        >
          <defs>
            <linearGradient id="mapG" x1="0" x2="1">
              <stop offset="0%" stopColor="#062024" />
              <stop offset="100%" stopColor="#001218" />
            </linearGradient>
          </defs>

          {/* background */}
          <rect x="0" y="0" width={width} height={height} fill="url(#mapG)" />

          {/* light graticule (lon/lat lines) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const gx = (i / 11) * width;
            return <line key={`v${i}`} x1={gx} y1={0} x2={gx} y2={height} stroke="rgba(100,220,180,0.04)" strokeWidth={0.6} />;
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const gy = (i / 7) * height;
            return <line key={`h${i}`} x1={0} y1={gy} x2={width} y2={gy} stroke="rgba(100,220,180,0.04)" strokeWidth={0.6} />;
          })}

          {/* simple equator highlight */}
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="rgba(150,255,180,0.06)" strokeWidth={1} />

          {/* marker */}
          <g transform={`translate(${x}, ${y})`} aria-hidden>
            <circle r="10" fill="rgba(200,60,255,0.06)" />
            <circle r="6" fill="#e84e4e" />
          </g>
        </svg>

        {/* pulsing overlay using tailwind animate-ping */}
        <div
          className="pointer-events-none"
          style={{
            position: 'absolute',
            left: `calc(50% - ${width / 2}px + ${x - 10}px)`,
            top: `calc(${0}px + ${y - 10}px)`,
            width: 20,
            height: 20,
          }}
        >
          <span className="sr-only">Our location</span>
          <span className="absolute inline-flex h-5 w-5 rounded-full bg-red-500 opacity-80" />
          <span className="absolute inline-flex h-5 w-5 rounded-full bg-red-500 opacity-40 animate-ping" />
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-300">
        Projection: equirectangular — location placed at lat {lat}°, lon {lon}°
      </div>
    </div>
  );
};

export default WorldMap;