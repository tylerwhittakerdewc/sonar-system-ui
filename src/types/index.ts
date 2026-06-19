export interface Contact {
  id: string;
  type: 'ship' | 'submarine' | 'seaTurtle' | 'whale' | 'swimmer' | 'surfer' | 'kraken' | 'seaLife' | 'human';
  position: { x: number; y: number };
  distance: number;
  speed: number;
  direction: number; // in degrees
  active?: boolean;
}

export interface SonarData {
    contacts: Contact[];
    timestamp: number;
}