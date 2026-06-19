import React from 'react';
import { Contact } from '../types';

interface Props {
  contacts?: Contact[];
}

const NavigationDisplay: React.FC<Props> = ({ contacts = [] }) => {
  // derive simple navigation info from nearest contact (if any)
  const nearest = contacts.length
    ? contacts.reduce((a, b) => (a.distance < b.distance ? a : b))
    : null;

  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-sm shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold">Navigation</h3>
        <span className="text-green-300 text-xs">Auto</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs text-gray-300">Heading</div>
          <div className="text-lg">045°</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Speed</div>
          <div className="text-lg">12 kt</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Depth</div>
          <div className="text-lg">120 m</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Nearest</div>
          <div className="text-lg">{nearest ? `${nearest.distance} m` : '—'}</div>
        </div>
      </div>
    </div>
  );
};

export default NavigationDisplay;