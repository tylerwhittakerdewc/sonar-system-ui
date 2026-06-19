import React from 'react';
import { Contact } from '../types';

interface Props {
  contacts?: Contact[];
}

const HUD: React.FC<Props> = ({ contacts = [] }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-sm shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">System Status</h3>
        <span className="text-xs text-gray-300">Nominal</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <div className="text-xs text-gray-300">Power</div>
          <div className="text-lg text-green-300">95%</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Sonar Health</div>
          <div className="text-lg text-green-300">Good</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Ping Rate</div>
          <div className="text-lg">1.8 s</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Contacts</div>
          <div className="text-lg">{contacts.length}</div>
        </div>
      </div>

      <div className="mb-2">
        <h4 className="text-xs text-gray-300 mb-1">Communications</h4>
        <div className="bg-black/20 rounded p-2 max-h-28 overflow-auto text-xs">
          <div className="text-green-300">[09:12] Bridge: All stations report nominal.</div>
          <div className="text-gray-300">[09:15] Sonar: Ping cycle complete.</div>
          <div className="text-yellow-300">[09:16] Comms: Unidentified ping at 320m.</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input className="flex-1 bg-black/20 rounded p-2 text-xs placeholder-gray-400" placeholder="Send message..." />
        <button className="px-3 py-2 bg-blue-600 rounded text-sm">Send</button>
      </div>
    </div>
  );
};

export default HUD;