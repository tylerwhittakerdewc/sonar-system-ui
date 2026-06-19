export const degreesToRadians = (degrees: number): number => {
    return (degrees * Math.PI) / 180;
};

export const radiansToDegrees = (radians: number): number => {
    return (radians * 180) / Math.PI;
};

export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const calculateAngle = (x: number, y: number): number => {
    return Math.atan2(y, x);
};

export const getRandomPosition = (max = 500): { x: number; y: number } => {
    // random position within a square centered at (0,0)
    return {
        x: Math.random() * max - max / 2,
        y: Math.random() * max - max / 2,
    };
};