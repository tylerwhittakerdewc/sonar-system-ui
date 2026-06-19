import { useEffect, useState } from 'react';
import { Contact } from '../types';

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const generateRandomContact = (): Contact => {
    const types: Contact['type'][] = ['ship','submarine','seaTurtle','whale','swimmer','surfer','kraken'];
    const distance = Math.floor(Math.random() * 1200); // meters
    const angle = Math.floor(Math.random() * 360); // degrees
    const position = {
        x: Math.round(distance * Math.cos(degToRad(angle))),
        y: Math.round(distance * Math.sin(degToRad(angle))),
    };

    return {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        position,
        distance,
        speed: Math.floor(Math.random() * 30),
        direction: Math.floor(Math.random() * 360),
        active: true,
    } as Contact;
};

const useMockSonarData = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setContacts((prev) => {
                const newContact = generateRandomContact();
                return [...prev, newContact].slice(-12); // keep last 12
            });
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return contacts;
};

export default useMockSonarData;