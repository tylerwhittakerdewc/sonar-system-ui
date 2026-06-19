import React from 'react';

const Controls: React.FC = () => {
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 w-11/12 max-w-6xl bg-gradient-to-br from-gray-900/70 to-gray-800/30 border border-gray-700 rounded-xl p-3 flex items-center justify-between gap-4 shadow-2xl">
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-green-600 rounded">Ping</button>
        <button className="px-4 py-2 bg-yellow-600 rounded">Deploy Buoy</button>
        <button className="px-4 py-2 bg-red-600 rounded">Emergency Stop</button>
        <button
          className="px-4 py-2 bg-black/90 text-white rounded border border-red-600 hover:bg-red-700"
          onClick={() => {
            // destructive action placeholder
            // eslint-disable-next-line no-alert
            alert('DEPLOY NUKES: command queued (simulation)');
          }}
        >
          Deploy Nukes
        </button>
      </div>

      <div className="text-xs text-gray-300">Controls</div>

      <div className="flex items-center gap-3">
        <button className="px-3 py-2 bg-gray-800 rounded">Logs</button>
        <button className="px-3 py-2 bg-gray-800 rounded">Settings</button>
      </div>
    </div>
  );
};

export default Controls;