import { Customer } from '../types';

export let customers: Customer[] = [
    {
        id: 'CUS001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        company: 'Tech Corp',
        status: 'active',
        createdAt: new Date('2025-01-15'),
        lastContact: new Date('2026-01-28'),
        totalOrders: 12,
        totalSpent: 45800,
    },
    {
        id: 'CUS002',
        name: 'Jane Smith',
        email: 'jane.smith@business.com',
        phone: '+1234567891',
        company: 'Business Solutions Inc',
        status: 'active',
        createdAt: new Date('2025-03-20'),
        lastContact: new Date('2026-01-25'),
        totalOrders: 8,
        totalSpent: 32400,
    },
    {
        id: 'CUS003',
        name: 'Robert Johnson',
        email: 'robert.j@enterprise.com',
        phone: '+1234567892',
        company: 'Enterprise Group',
        status: 'active',
        createdAt: new Date('2025-05-10'),
        lastContact: new Date('2026-01-20'),
        totalOrders: 15,
        totalSpent: 67500,
    },
    {
        id: 'CUS004',
        name: 'Emily Davis',
        email: 'emily.davis@startup.io',
        phone: '+1234567893',
        company: 'Startup Innovations',
        status: 'lead',
        createdAt: new Date('2026-01-10'),
        lastContact: new Date('2026-01-15'),
        totalOrders: 0,
        totalSpent: 0,
    },
    {
        id: 'CUS005',
        name: 'Michael Brown',
        email: 'michael.b@company.com',
        phone: '+1234567894',
        company: 'Global Company Ltd',
        status: 'inactive',
        createdAt: new Date('2024-12-01'),
        lastContact: new Date('2025-11-30'),
        totalOrders: 5,
        totalSpent: 18900,
    },
];

export const getCustomers = () => customers;

export const getCustomerById = (id: string) => {
    return customers.find(c => c.id === id);
};

export const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
        ...customer,
        id: `CUS${String(customers.length + 1).padStart(3, '0')}`,
    };
    customers.push(newCustomer);
    return newCustomer;
};

export const updateCustomer = (id: string, updates: Partial<Customer>) => {
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers[index] = { ...customers[index], ...updates };
        return customers[index];
    }
    return null;
};

export const deleteCustomer = (id: string) => {
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        return true;
    }
    return false;
};
