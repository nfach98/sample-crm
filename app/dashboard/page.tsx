'use client';

import Link from 'next/link';
import { getCustomers } from '@/lib/data/customers';
import { getOrders } from '@/lib/data/orders';
import { getCampaigns } from '@/lib/data/marketing';
import { getEmailReminders } from '@/lib/data/reminders';

export default function Dashboard() {
    const customers = getCustomers();
    const orders = getOrders();
    const campaigns = getCampaigns();
    const reminders = getEmailReminders();

    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const pendingReminders = reminders.filter(r => r.status === 'scheduled').length;

    const recentOrders = orders.slice(-5).reverse();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600 mb-1">Total Customers</div>
                    <div className="text-3xl font-bold">{customers.length}</div>
                    <div className="text-sm text-green-600 mt-2">{activeCustomers} active</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600 mb-1">Total Orders</div>
                    <div className="text-3xl font-bold">{orders.length}</div>
                    <div className="text-sm text-orange-600 mt-2">{pendingOrders} pending</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                    <div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 mt-2">All time</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600 mb-1">Active Campaigns</div>
                    <div className="text-3xl font-bold">{activeCampaigns}</div>
                    <div className="text-sm text-blue-600 mt-2">{campaigns.length} total</div>
                </div>
            </div>

            {/* Recent Orders & Reminders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex justify-between items-center border-b pb-3">
                                <div>
                                    <div className="font-medium">{order.id}</div>
                                    <div className="text-sm text-gray-600">{order.customerName}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">${order.totalAmount}</div>
                                    <span className={`text-xs px-2 py-1 rounded ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href="/orders" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                        View all orders →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Reminders</h2>
                    <div className="space-y-3">
                        {reminders.filter(r => r.status === 'scheduled').slice(0, 5).map((reminder) => (
                            <div key={reminder.id} className="border-b pb-3">
                                <div className="font-medium text-sm">{reminder.subject}</div>
                                <div className="text-sm text-gray-600">{reminder.recipientName}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {new Date(reminder.scheduledDate).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href="/reminders" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                        View all reminders →
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/customers" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                        <div className="text-2xl mb-2">👥</div>
                        <div className="text-sm font-medium">Manage Customers</div>
                    </Link>
                    <Link href="/orders" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                        <div className="text-2xl mb-2">📦</div>
                        <div className="text-sm font-medium">View Orders</div>
                    </Link>
                    <Link href="/marketing" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                        <div className="text-2xl mb-2">📢</div>
                        <div className="text-sm font-medium">Campaigns</div>
                    </Link>
                    <Link href="/offerings" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                        <div className="text-2xl mb-2">🎁</div>
                        <div className="text-sm font-medium">Products</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
