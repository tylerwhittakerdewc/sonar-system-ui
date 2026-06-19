import React from 'react';
import { Contact } from '../types';

interface Props {
  contacts?: Contact[];
}

const SystemStatus: React.FC<Props> = ({ contacts = [] }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-sm shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">System Status</h3>
        <span className="text-xs text-green-300">Nominal</span>
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
          <div className="text-lg">3.5 s</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Contacts</div>
          <div className="text-lg">{contacts.length}</div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;