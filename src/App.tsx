import React from 'react';
import Navbar from './components/Navbar';
import HUD from './components/HUD';
import SonarCanvas from './components/SonarCanvas';
import Controls from './components/Controls';
import useMockSonarData from './hooks/useMockSonarData';
import NavigationDisplay from './components/NavigationDisplay';
import TacticalDisplay from './components/TacticalDisplay';
import MissionsPanel from './components/MissionsPanel';

const App: React.FC = () => {
  const contacts = useMockSonarData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <Navbar />

      <div className="mt-6 grid grid-cols-12 gap-6 items-start">
        {/* Left column: sonar plus missions & tactical */}
        <div className="col-span-8 space-y-4">
          <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 p-4 rounded-xl shadow-2xl flex justify-center">
            <SonarCanvas contacts={contacts} size={560} maxRange={1400} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MissionsPanel />
            <TacticalDisplay contacts={contacts} />
          </div>
        </div>

        {/* Right column: navigation, system status + communications */}
        <div className="col-span-4 space-y-4">
          <NavigationDisplay contacts={contacts} />
          <HUD contacts={contacts} />
        </div>
      </div>

      <Controls />
    </div>
  );
};

export default App;