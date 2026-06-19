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

const App: React.FC = () => {
  const contacts = useMockSonarData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <Navbar />

      <div className="mt-6 grid grid-cols-12 gap-6 items-start">
        {/* Left column: missions + tactical */}
        <div className="col-span-3 space-y-4">
          <MissionsPanel />
          <TacticalDisplay contacts={contacts} />
        </div>

        {/* Center column: sonar centered */}
        <div className="col-span-6 flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 p-4 rounded-xl shadow-2xl">
            <SonarCanvas contacts={contacts} size={560} maxRange={1400} />
          </div>
        </div>

        {/* Right column: navigation, system status, communications, compass */}
        <div className="col-span-3 space-y-4">
          <NavigationDisplay contacts={contacts} />
          <SystemStatus contacts={contacts} />
          <CommunicationsPanel />
          <Compass />
        </div>
      </div>

      <Controls />
    </div>
  );
};

export default App;