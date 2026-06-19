import React from 'react';

const CommunicationsPanel: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border border-gray-700 rounded-lg p-3 text-sm shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-semibold">Communications</h4>
        <span className="text-xs text-gray-300">Channel 01</span>
      </div>

      <div className="bg-black/20 rounded p-2 max-h-36 overflow-auto text-xs mb-2">
        <div className="text-green-300">[09:12] Bridge: All stations report nominal.</div>
        <div className="text-gray-300">[09:15] Sonar: Ping cycle complete.</div>
        <div className="text-yellow-300">[09:16] Comms: Unidentified ping at 320m.</div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input className="flex-1 bg-black/20 rounded p-2 text-xs placeholder-gray-400" placeholder="Send message..." />
        <button className="px-3 py-2 bg-blue-600 rounded text-sm">Send</button>
      </div>
    </div>
  );
};

export default CommunicationsPanel;