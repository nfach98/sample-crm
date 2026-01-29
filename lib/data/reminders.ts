import { EmailReminder } from '../types';

export let emailReminders: EmailReminder[] = [
    {
        id: 'REM001',
        subject: 'Follow-up: Product Demo',
        recipientId: 'CUS004',
        recipientName: 'Emily Davis',
        recipientEmail: 'emily.davis@startup.io',
        message: 'Hi Emily, following up on our product demo. Would you like to schedule a call?',
        scheduledDate: new Date('2026-01-30'),
        status: 'scheduled',
        type: 'follow-up',
    },
    {
        id: 'REM002',
        subject: 'Payment Reminder: Invoice #ORD004',
        recipientId: 'CUS001',
        recipientName: 'John Doe',
        recipientEmail: 'john.doe@example.com',
        message: 'Dear John, this is a friendly reminder about the pending payment for Invoice #ORD004.',
        scheduledDate: new Date('2026-01-31'),
        status: 'scheduled',
        type: 'payment',
    },
    {
        id: 'REM003',
        subject: 'Meeting Reminder: Quarterly Review',
        recipientId: 'CUS003',
        recipientName: 'Robert Johnson',
        recipientEmail: 'robert.j@enterprise.com',
        message: 'Hi Robert, reminder about our quarterly review meeting tomorrow at 2 PM.',
        scheduledDate: new Date('2026-01-28'),
        status: 'sent',
        sentDate: new Date('2026-01-28'),
        type: 'meeting',
    },
    {
        id: 'REM004',
        subject: 'General Update: New Features Available',
        recipientId: 'CUS002',
        recipientName: 'Jane Smith',
        recipientEmail: 'jane.smith@business.com',
        message: 'Hi Jane, we have exciting new features available in your software package!',
        scheduledDate: new Date('2026-02-01'),
        status: 'scheduled',
        type: 'general',
    },
    {
        id: 'REM005',
        subject: 'Follow-up: Contract Renewal',
        recipientId: 'CUS003',
        recipientName: 'Robert Johnson',
        recipientEmail: 'robert.j@enterprise.com',
        message: 'Dear Robert, your contract is up for renewal next month. Let\'s discuss renewal terms.',
        scheduledDate: new Date('2026-02-05'),
        status: 'scheduled',
        type: 'follow-up',
    },
];

export const getEmailReminders = () => emailReminders;

export const getEmailReminderById = (id: string) => {
    return emailReminders.find(r => r.id === id);
};

export const addEmailReminder = (reminder: Omit<EmailReminder, 'id'>) => {
    const newReminder: EmailReminder = {
        ...reminder,
        id: `REM${String(emailReminders.length + 1).padStart(3, '0')}`,
    };
    emailReminders.push(newReminder);
    return newReminder;
};

export const updateEmailReminder = (id: string, updates: Partial<EmailReminder>) => {
    const index = emailReminders.findIndex(r => r.id === id);
    if (index !== -1) {
        emailReminders[index] = { ...emailReminders[index], ...updates };
        return emailReminders[index];
    }
    return null;
};

export const deleteEmailReminder = (id: string) => {
    const index = emailReminders.findIndex(r => r.id === id);
    if (index !== -1) {
        emailReminders.splice(index, 1);
        return true;
    }
    return false;
};
