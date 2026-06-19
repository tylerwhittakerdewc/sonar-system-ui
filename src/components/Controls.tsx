import React, { useState } from 'react';

const Controls: React.FC = () => {
  const [heading, setHeading] = useState(45);
  const [throttle, setThrottle] = useState(50);

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 w-11/12 max-w-6xl bg-gradient-to-br from-gray-900/70 to-gray-800/30 border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-300">Helm</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setHeading(h => (h - 5 + 360) % 360)} className="px-3 py-2 bg-gray-800 rounded">◀</button>
          <div className="bg-black/20 rounded px-3 py-2 text-sm">{heading}°</div>
          <button onClick={() => setHeading(h => (h + 5) % 360)} className="px-3 py-2 bg-gray-800 rounded">▶</button>
        </div>
      </div>

      <div className="flex-1 px-4">
        <div className="text-xs text-gray-300 mb-1">Throttle</div>
        <input
          type="range"
          min={0}
          max={100}
          value={throttle}
          onChange={(e) => setThrottle(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-green-600 rounded">Ping</button>
        <button className="px-4 py-2 bg-yellow-600 rounded">Deploy Buoy</button>
        <button className="px-4 py-2 bg-red-600 rounded">Emergency Stop</button>
        <button
          className="px-4 py-2 bg-black/90 text-white rounded border border-red-600 hover:bg-red-700"
          onClick={() => {
            // destructive action placeholder
            // integrate real confirmation/flow later
            // eslint-disable-next-line no-alert
            alert('DEPLOY NUKES: command queued (simulation)');
          }}
        >
          Deploy Nukes
        </button>
      </div>
    </div>
  );
};

export default Controls;