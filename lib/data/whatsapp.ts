import { WhatsAppNotification } from '../types';

export let whatsappNotifications: WhatsAppNotification[] = [
    {
        id: 'WA001',
        recipientId: 'CUS001',
        recipientName: 'John Doe',
        recipientPhone: '+1234567890',
        message: 'Your order #ORD004 is being processed. We will notify you once it ships.',
        scheduledDate: new Date('2026-01-29'),
        status: 'sent',
        sentDate: new Date('2026-01-29'),
        type: 'order-update',
    },
    {
        id: 'WA002',
        recipientId: 'CUS002',
        recipientName: 'Jane Smith',
        recipientPhone: '+1234567891',
        message: 'Special promotion! Get 20% off on all Cloud Storage Plans this week.',
        scheduledDate: new Date('2026-01-30'),
        status: 'scheduled',
        type: 'promotion',
    },
    {
        id: 'WA003',
        recipientId: 'CUS003',
        recipientName: 'Robert Johnson',
        recipientPhone: '+1234567892',
        message: 'Your order #ORD003 has been shipped! Track your delivery: [tracking-link]',
        scheduledDate: new Date('2026-01-28'),
        status: 'sent',
        sentDate: new Date('2026-01-28'),
        type: 'order-update',
    },
    {
        id: 'WA004',
        recipientId: 'CUS004',
        recipientName: 'Emily Davis',
        recipientPhone: '+1234567893',
        message: 'Reminder: Your demo session is scheduled for tomorrow at 3 PM. Looking forward to it!',
        scheduledDate: new Date('2026-01-31'),
        status: 'scheduled',
        type: 'reminder',
    },
    {
        id: 'WA005',
        recipientId: 'CUS001',
        recipientName: 'John Doe',
        recipientPhone: '+1234567890',
        message: 'Need help with your recent purchase? Our support team is here 24/7.',
        scheduledDate: new Date('2026-02-01'),
        status: 'scheduled',
        type: 'support',
    },
];

export const getWhatsAppNotifications = () => whatsappNotifications;

export const getWhatsAppNotificationById = (id: string) => {
    return whatsappNotifications.find(n => n.id === id);
};

export const addWhatsAppNotification = (notification: Omit<WhatsAppNotification, 'id'>) => {
    const newNotification: WhatsAppNotification = {
        ...notification,
        id: `WA${String(whatsappNotifications.length + 1).padStart(3, '0')}`,
    };
    whatsappNotifications.push(newNotification);
    return newNotification;
};

export const updateWhatsAppNotification = (id: string, updates: Partial<WhatsAppNotification>) => {
    const index = whatsappNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
        whatsappNotifications[index] = { ...whatsappNotifications[index], ...updates };
        return whatsappNotifications[index];
    }
    return null;
};

export const deleteWhatsAppNotification = (id: string) => {
    const index = whatsappNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
        whatsappNotifications.splice(index, 1);
        return true;
    }
    return false;
};
