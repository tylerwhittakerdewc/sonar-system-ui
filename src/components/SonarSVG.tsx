import React from 'react';

const SonarSVG: React.FC = () => {
    const radius = 200; // Radius of the sonar display
    const numRings = 5; // Number of grid rings
    const angleStep = 15; // Angle step for the lines

    const rings = Array.from({ length: numRings }, (_, i) => (
        <circle key={i} cx="250" cy="250" r={(i + 1) * (radius / numRings)} stroke="lightblue" fill="none" />
    ));

    const lines = Array.from({ length: 360 / angleStep }, (_, i) => {
        const angle = i * angleStep;
        const x1 = 250 + radius * Math.cos((angle * Math.PI) / 180);
        const y1 = 250 + radius * Math.sin((angle * Math.PI) / 180);
        return (
            <line key={i} x1="250" y1="250" x2={x1} y2={y1} stroke="lightblue" strokeWidth="1" />
        );
    });

    return (
        <svg width="500" height="500" className="bg-black">
            {rings}
            {lines}
            <circle cx="250" cy="250" r="5" fill="red" /> {/* Center point */}
        </svg>
    );
};

export default SonarSVG;