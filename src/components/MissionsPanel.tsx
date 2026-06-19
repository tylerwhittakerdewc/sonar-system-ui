import React from 'react';

const missions = [
  { id: 'm1', name: 'Operation: Save the Black Pearl', status: 'Active' },
  { id: 'm2', name: "Open Davy Jones' Locker", status: 'Planned' },
  { id: 'm3', name: 'Escort Cargo Convoy 21', status: 'Pending' },
];

const MissionsPanel: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-sm shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold">Missions</h3>
        <span className="text-xs text-gray-300">3 total</span>
      </div>

      <div className="space-y-2">
        {missions.map((m) => (
          <div key={m.id} className="flex items-center justify-between bg-black/20 p-2 rounded">
            <div>
              <div className="text-xs text-gray-300">{m.name}</div>
            </div>
            <div className="text-xs text-gray-300">{m.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionsPanel;