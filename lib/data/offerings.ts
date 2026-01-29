import { Offering } from '../types';

export let offerings: Offering[] = [
    {
        id: 'OFF001',
        name: 'Premium Software License',
        description: 'Full-featured enterprise software with unlimited users and premium support',
        category: 'Software',
        price: 1500,
        stock: 100,
        status: 'active',
        createdAt: new Date('2025-01-01'),
    },
    {
        id: 'OFF002',
        name: 'Cloud Storage Plan',
        description: '1TB cloud storage with advanced security features',
        category: 'Cloud Services',
        price: 200,
        stock: 500,
        status: 'active',
        createdAt: new Date('2025-01-15'),
    },
    {
        id: 'OFF003',
        name: 'Support Package',
        description: '24/7 premium support with dedicated account manager',
        category: 'Services',
        price: 800,
        stock: 50,
        status: 'active',
        createdAt: new Date('2025-02-01'),
    },
    {
        id: 'OFF004',
        name: 'Training Workshop',
        description: 'Comprehensive 2-day on-site training workshop',
        category: 'Training',
        price: 2500,
        stock: 20,
        status: 'active',
        createdAt: new Date('2025-03-01'),
    },
    {
        id: 'OFF005',
        name: 'Marketing Automation',
        description: 'Advanced marketing automation platform with AI capabilities',
        category: 'Software',
        price: 3500,
        stock: 75,
        status: 'active',
        createdAt: new Date('2025-04-01'),
    },
    {
        id: 'OFF006',
        name: 'Basic License',
        description: 'Entry-level software license for small teams',
        category: 'Software',
        price: 500,
        stock: 0,
        status: 'out-of-stock',
        createdAt: new Date('2025-05-01'),
    },
];

export const getOfferings = () => offerings;

export const getOfferingById = (id: string) => {
    return offerings.find(o => o.id === id);
};

export const addOffering = (offering: Omit<Offering, 'id'>) => {
    const newOffering: Offering = {
        ...offering,
        id: `OFF${String(offerings.length + 1).padStart(3, '0')}`,
    };
    offerings.push(newOffering);
    return newOffering;
};

export const updateOffering = (id: string, updates: Partial<Offering>) => {
    const index = offerings.findIndex(o => o.id === id);
    if (index !== -1) {
        offerings[index] = { ...offerings[index], ...updates };
        return offerings[index];
    }
    return null;
};

export const deleteOffering = (id: string) => {
    const index = offerings.findIndex(o => o.id === id);
    if (index !== -1) {
        offerings.splice(index, 1);
        return true;
    }
    return false;
};
