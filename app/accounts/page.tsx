'use client';

import { useState } from 'react';
import { getAccountRoles } from '@/lib/data/accounts';

export default function AccountRoles() {
    const [accounts] = useState(getAccountRoles());
    const [filter, setFilter] = useState('all');

    const filteredAccounts = filter === 'all'
        ? accounts
        : accounts.filter(a => a.role === filter || a.status === filter);

    const roleColors: Record<string, string> = {
        admin: 'bg-purple-100 text-purple-800',
        manager: 'bg-blue-100 text-blue-800',
        sales: 'bg-green-100 text-green-800',
        support: 'bg-yellow-100 text-yellow-800',
        viewer: 'bg-gray-100 text-gray-800',
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Account & Role Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Total Users</div>
                    <div className="text-2xl font-bold">{accounts.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Admins</div>
                    <div className="text-2xl font-bold">{accounts.filter(a => a.role === 'admin').length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Managers</div>
                    <div className="text-2xl font-bold">{accounts.filter(a => a.role === 'manager').length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Sales Team</div>
                    <div className="text-2xl font-bold">{accounts.filter(a => a.role === 'sales').length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Active</div>
                    <div className="text-2xl font-bold text-green-600">{accounts.filter(a => a.status === 'active').length}</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-2 px-4 ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    All Users
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`pb-2 px-4 ${filter === 'active' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilter('inactive')}
                    className={`pb-2 px-4 ${filter === 'inactive' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Inactive
                </button>
            </div>

            {/* User Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAccounts.map((account) => (
                            <tr key={account.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                            {account.userName.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{account.userName}</div>
                                            <div className="text-sm text-gray-500">{account.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColors[account.role]}`}>
                                        {account.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {account.permissions.includes('all') ? (
                                            <span className="text-purple-600 font-semibold">Full Access</span>
                                        ) : (
                                            <div className="flex flex-wrap gap-1">
                                                {account.permissions.slice(0, 2).map((perm, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                        {perm.replace('_', ' ')}
                                                    </span>
                                                ))}
                                                {account.permissions.length > 2 && (
                                                    <span className="text-xs text-gray-500">+{account.permissions.length - 2} more</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {account.lastLogin ? new Date(account.lastLogin).toLocaleDateString() : 'Never'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {account.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Deactivate</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Permission Reference */}
            {/* <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Role Permissions Reference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                        <div className="font-semibold text-purple-600 mb-2">Admin</div>
                        <div className="text-sm text-gray-600">Full system access and control</div>
                    </div>
                    <div className="border rounded-lg p-4">
                        <div className="font-semibold text-blue-600 mb-2">Manager</div>
                        <div className="text-sm text-gray-600">Manage customers, orders, and view reports</div>
                    </div>
                    <div className="border rounded-lg p-4">
                        <div className="font-semibold text-green-600 mb-2">Sales</div>
                        <div className="text-sm text-gray-600">Create orders, manage customers</div>
                    </div>
                    <div className="border rounded-lg p-4">
                        <div className="font-semibold text-yellow-600 mb-2">Support</div>
                        <div className="text-sm text-gray-600">View orders, manage reminders</div>
                    </div>
                    <div className="border rounded-lg p-4">
                        <div className="font-semibold text-gray-600 mb-2">Viewer</div>
                        <div className="text-sm text-gray-600">Read-only access to dashboard</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
