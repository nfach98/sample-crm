import { AccountRole } from '../types';

export let accountRoles: AccountRole[] = [
    {
        id: 'ACC001',
        userId: 'USR001',
        userName: 'Admin User',
        email: 'admin@company.com',
        role: 'admin',
        permissions: ['all'],
        createdAt: new Date('2025-01-01'),
        lastLogin: new Date('2026-01-29'),
        status: 'active',
    },
    {
        id: 'ACC002',
        userId: 'USR002',
        userName: 'Sarah Manager',
        email: 'sarah.m@company.com',
        role: 'manager',
        permissions: ['view_dashboard', 'manage_customers', 'manage_orders', 'view_reports'],
        createdAt: new Date('2025-01-15'),
        lastLogin: new Date('2026-01-28'),
        status: 'active',
    },
    {
        id: 'ACC003',
        userId: 'USR003',
        userName: 'Tom Sales',
        email: 'tom.s@company.com',
        role: 'sales',
        permissions: ['view_dashboard', 'manage_customers', 'create_orders', 'view_offerings'],
        createdAt: new Date('2025-02-01'),
        lastLogin: new Date('2026-01-29'),
        status: 'active',
    },
    {
        id: 'ACC004',
        userId: 'USR004',
        userName: 'Lisa Support',
        email: 'lisa.s@company.com',
        role: 'support',
        permissions: ['view_dashboard', 'view_customers', 'view_orders', 'manage_reminders'],
        createdAt: new Date('2025-03-01'),
        lastLogin: new Date('2026-01-27'),
        status: 'active',
    },
    {
        id: 'ACC005',
        userId: 'USR005',
        userName: 'Mark Viewer',
        email: 'mark.v@company.com',
        role: 'viewer',
        permissions: ['view_dashboard', 'view_reports'],
        createdAt: new Date('2025-04-01'),
        lastLogin: new Date('2025-12-15'),
        status: 'inactive',
    },
];

export const getAccountRoles = () => accountRoles;

export const getAccountRoleById = (id: string) => {
    return accountRoles.find(a => a.id === id);
};

export const addAccountRole = (account: Omit<AccountRole, 'id'>) => {
    const newAccount: AccountRole = {
        ...account,
        id: `ACC${String(accountRoles.length + 1).padStart(3, '0')}`,
    };
    accountRoles.push(newAccount);
    return newAccount;
};

export const updateAccountRole = (id: string, updates: Partial<AccountRole>) => {
    const index = accountRoles.findIndex(a => a.id === id);
    if (index !== -1) {
        accountRoles[index] = { ...accountRoles[index], ...updates };
        return accountRoles[index];
    }
    return null;
};

export const deleteAccountRole = (id: string) => {
    const index = accountRoles.findIndex(a => a.id === id);
    if (index !== -1) {
        accountRoles.splice(index, 1);
        return true;
    }
    return false;
};
