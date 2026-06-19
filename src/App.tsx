import React from 'react';
import Navbar from './components/Navbar';
import SonarCanvas from './components/SonarCanvas';
import Controls from './components/Controls';
import useMockSonarData from './hooks/useMockSonarData';
import NavigationDisplay from './components/NavigationDisplay';
import TacticalDisplay from './components/TacticalDisplay';
import MissionsPanel from './components/MissionsPanel';
import SystemStatus from './components/SystemStatus';
import CommunicationsPanel from './components/CommunicationsPanel';
import Compass from './components/Compass';
import WorldMap from './components/WorldMap';

const App: React.FC = () => {
  const contacts = useMockSonarData();

  return (
    <div className="min-h-screen bg-black text-cyan-100 p-6">
      <Navbar />

      <div className="mt-6 grid grid-cols-12 gap-6 items-start">
        {/* Left column: map + missions + tactical */}
        <div className="col-span-3 space-y-4">
          <div className="border border-cyan-500/20 rounded-lg p-2 bg-gradient-to-br from-[#001217] to-[#00151a]/30 shadow-inner">
            <WorldMap />
          </div>

          <div className="border border-cyan-500/20 rounded-lg p-2 bg-gradient-to-br from-[#001217] to-[#00151a]/10">
            <MissionsPanel />
          </div>

          <div className="border border-cyan-500/20 rounded-lg p-2 bg-gradient-to-br from-[#001217] to-[#00151a]/10">
            <TacticalDisplay contacts={contacts} />
          </div>
        </div>

        {/* Center column: sonar centered with neon frame */}
        <div className="col-span-6 flex items-center justify-center">
          <div className="p-4 rounded-2xl shadow-2xl"
               style={{
                 background: 'linear-gradient(180deg, rgba(0,10,12,0.6), rgba(0,6,8,0.3))',
                 border: '1px solid rgba(16,220,200,0.06)',
                 boxShadow: '0 10px 30px rgba(0, 220, 200, 0.03)'
               }}>
            <div className="rounded-xl p-3" style={{ boxShadow: 'inset 0 0 40px rgba(16,220,200,0.02)' }}>
              <SonarCanvas contacts={contacts} size={680} maxRange={1400} />
            </div>
          </div>
        </div>

        {/* Right column: navigation, system status, communications, compass at bottom */}
        <div className="col-span-3 space-y-4">
          <div className="border border-cyan-500/20 rounded-lg p-2 bg-gradient-to-br from-[#001217] to-[#00151a]/10">
            <NavigationDisplay contacts={contacts} />
          </div>

          <div className="border border-cyan-500/20 rounded-lg p-2 bg-gradient-to-br from-[#001217] to-[#00151a]/10">
            <SystemStatus contacts={contacts} />
          </div>

          <div className="border border-cyan-500/20 rounded-lg p-2 bg-gradient-to-br from-[#001217] to-[#00151a]/10">
            <CommunicationsPanel />
          </div>

          <div className="border border-cyan-500/20 rounded-lg p-2 bg-gradient-to-br from-[#001217] to-[#00151a]/10">
            <Compass />
          </div>
        </div>
      </div>

      <Controls />
    </div>
  );
};

export default App;