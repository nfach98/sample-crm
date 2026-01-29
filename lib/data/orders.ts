import { Order } from '../types';

export let orders: Order[] = [
    {
        id: 'ORD001',
        customerId: 'CUS001',
        customerName: 'John Doe',
        items: [
            { offeringId: 'OFF001', offeringName: 'Premium Software License', quantity: 2, price: 1500 },
            { offeringId: 'OFF003', offeringName: 'Support Package', quantity: 1, price: 800 },
        ],
        totalAmount: 3800,
        status: 'delivered',
        orderDate: new Date('2026-01-15'),
        deliveryDate: new Date('2026-01-22'),
        paymentStatus: 'paid',
    },
    {
        id: 'ORD002',
        customerId: 'CUS002',
        customerName: 'Jane Smith',
        items: [
            { offeringId: 'OFF002', offeringName: 'Cloud Storage Plan', quantity: 5, price: 200 },
        ],
        totalAmount: 1000,
        status: 'processing',
        orderDate: new Date('2026-01-25'),
        paymentStatus: 'paid',
    },
    {
        id: 'ORD003',
        customerId: 'CUS003',
        customerName: 'Robert Johnson',
        items: [
            { offeringId: 'OFF001', offeringName: 'Premium Software License', quantity: 10, price: 1500 },
            { offeringId: 'OFF004', offeringName: 'Training Workshop', quantity: 2, price: 2500 },
        ],
        totalAmount: 20000,
        status: 'shipped',
        orderDate: new Date('2026-01-20'),
        deliveryDate: new Date('2026-01-30'),
        paymentStatus: 'paid',
    },
    {
        id: 'ORD004',
        customerId: 'CUS001',
        customerName: 'John Doe',
        items: [
            { offeringId: 'OFF005', offeringName: 'Marketing Automation', quantity: 1, price: 3500 },
        ],
        totalAmount: 3500,
        status: 'pending',
        orderDate: new Date('2026-01-28'),
        paymentStatus: 'pending',
    },
    {
        id: 'ORD005',
        customerId: 'CUS002',
        customerName: 'Jane Smith',
        items: [
            { offeringId: 'OFF002', offeringName: 'Cloud Storage Plan', quantity: 3, price: 200 },
            { offeringId: 'OFF003', offeringName: 'Support Package', quantity: 1, price: 800 },
        ],
        totalAmount: 1400,
        status: 'pending',
        orderDate: new Date('2026-01-29'),
        paymentStatus: 'pending',
    },
];

export const getOrders = () => orders;

export const getOrderById = (id: string) => {
    return orders.find(o => o.id === id);
};

export const getOrdersByCustomerId = (customerId: string) => {
    return orders.filter(o => o.customerId === customerId);
};

export const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
        ...order,
        id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
    };
    orders.push(newOrder);
    return newOrder;
};

export const updateOrder = (id: string, updates: Partial<Order>) => {
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
        orders[index] = { ...orders[index], ...updates };
        return orders[index];
    }
    return null;
};
