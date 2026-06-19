export const mockContacts = [
  {
    id: 1,
    type: 'submarine',
    name: 'Submarine Alpha',
    depth: 300,
    distance: 1500,
    status: 'active',
  },
  {
    id: 2,
    type: 'ship',
    name: 'Cargo Ship Bravo',
    depth: 50,
    distance: 2500,
    status: 'active',
  },
  {
    id: 3,
    type: 'sea life',
    name: 'Dolphin',
    depth: 20,
    distance: 500,
    status: 'observed',
  },
  {
    id: 4,
    type: 'human',
    name: 'Diver Charlie',
    depth: 10,
    distance: 300,
    status: 'in distress',
  },
  {
    id: 5,
    type: 'submarine',
    name: 'Submarine Delta',
    depth: 400,
    distance: 1800,
    status: 'inactive',
  },
];

export const mockSonarData = {
  timestamp: new Date().toISOString(),
  contacts: mockContacts,
};