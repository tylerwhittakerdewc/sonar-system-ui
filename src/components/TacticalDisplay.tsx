import React from 'react';
import { Contact } from '../types';

interface Props {
  contacts?: Contact[];
}

const TacticalDisplay: React.FC<Props> = ({ contacts = [] }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-sm shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold">Tactical</h3>
        <span className="text-red-300 text-xs">Threat</span>
      </div>

      <div className="space-y-2 max-h-48 overflow-auto">
        {contacts.length === 0 && <div className="text-gray-400 text-xs">No contacts</div>}
        {contacts.map((c) => (
          <div key={c.id} className="flex items-center justify-between bg-black/20 p-2 rounded">
            <div>
              <div className="text-xs text-gray-300">{c.type}</div>
              <div className="text-sm">{c.distance} m</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-300">Dir</div>
              <div className="text-sm">{c.direction}°</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TacticalDisplay;