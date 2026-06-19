import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between">
      <div className="text-2xl font-bold">Sonar System</div>
      <div className="text-sm text-gray-300">v1.0 — Training</div>
    </nav>
  );
};

export default Navbar;