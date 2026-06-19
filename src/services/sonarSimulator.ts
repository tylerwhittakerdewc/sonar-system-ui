import { Contact } from '../types';
import { getRandomPosition, calculateDistance } from '../utils/math';

let contacts: Contact[] = [];

const pickType = (): Contact['type'] => {
  const types: Contact['type'][] = ['submarine', 'ship', 'seaLife', 'human'];
  return types[Math.floor(Math.random() * types.length)];
};

export const spawnContact = (type?: Contact['type']): Contact => {
    const pos = getRandomPosition();
    const newContact: Contact = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        type: type ?? pickType(),
        position: pos,
        distance: Math.round(calculateDistance(0, 0, pos.x, pos.y)),
        speed: 0,
        direction: 0,
        active: true,
    };
    contacts.push(newContact);
    return newContact;
};

export const updateContact = (id: string, newPosition: { x: number; y: number }): void => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        contact.position = newPosition;
        contact.distance = Math.round(calculateDistance(0, 0, newPosition.x, newPosition.y));
    }
};

export const removeContact = (id: string): void => {
    contacts = contacts.filter(c => c.id !== id);
};

export const getActiveContacts = (): Contact[] => {
    return contacts.filter(c => c.active);
};

export const clearContacts = (): void => {
    contacts = [];
};