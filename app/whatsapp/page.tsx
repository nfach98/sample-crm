'use client';

import { useState } from 'react';
import { getWhatsAppNotifications } from '@/lib/data/whatsapp';

export default function WhatsApp() {
    const [notifications] = useState(getWhatsAppNotifications());
    const [filter, setFilter] = useState('all');

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => n.status === filter);

    const typeColors: Record<string, string> = {
        'order-update': 'bg-blue-100 text-blue-800',
        'promotion': 'bg-green-100 text-green-800',
        'reminder': 'bg-purple-100 text-purple-800',
        'support': 'bg-orange-100 text-orange-800',
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">WhatsApp Notifications</h1>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    + Send Notification
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Total Messages</div>
                    <div className="text-2xl font-bold">{notifications.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Scheduled</div>
                    <div className="text-2xl font-bold text-orange-600">
                        {notifications.filter(n => n.status === 'scheduled').length}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Sent</div>
                    <div className="text-2xl font-bold text-green-600">
                        {notifications.filter(n => n.status === 'sent').length}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Failed</div>
                    <div className="text-2xl font-bold text-red-600">
                        {notifications.filter(n => n.status === 'failed').length}
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-2 px-4 ${filter === 'all' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                >
                    All ({notifications.length})
                </button>
                <button
                    onClick={() => setFilter('scheduled')}
                    className={`pb-2 px-4 ${filter === 'scheduled' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                >
                    Scheduled ({notifications.filter(n => n.status === 'scheduled').length})
                </button>
                <button
                    onClick={() => setFilter('sent')}
                    className={`pb-2 px-4 ${filter === 'sent' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                >
                    Sent ({notifications.filter(n => n.status === 'sent').length})
                </button>
            </div>

            {/* Message Type Filters */}
            <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Filter by Type:</div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200">
                        Order Updates
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm cursor-pointer hover:bg-green-200">
                        Promotions
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm cursor-pointer hover:bg-purple-200">
                        Reminders
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm cursor-pointer hover:bg-orange-200">
                        Support
                    </span>
                </div>
            </div>

            {/* Notifications List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredNotifications.map((notification) => (
                    <div key={notification.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className="text-2xl">💬</div>
                                <div>
                                    <h3 className="font-semibold">{notification.recipientName}</h3>
                                    <div className="text-sm text-gray-600">{notification.recipientPhone}</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${notification.status === 'scheduled' ? 'bg-orange-100 text-orange-800' :
                                        notification.status === 'sent' ? 'bg-green-100 text-green-800' :
                                            notification.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                    }`}>
                                    {notification.status}
                                </span>
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${typeColors[notification.type]}`}>
                                    {notification.type}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t text-sm">
                            <div className="text-gray-600">
                                {notification.status === 'scheduled' && (
                                    <span>📅 {new Date(notification.scheduledDate).toLocaleString()}</span>
                                )}
                                {notification.status === 'sent' && notification.sentDate && (
                                    <span>✅ {new Date(notification.sentDate).toLocaleString()}</span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {notification.status === 'scheduled' && (
                                    <>
                                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                        <button className="text-red-600 hover:text-red-800">Cancel</button>
                                    </>
                                )}
                                {notification.status === 'sent' && (
                                    <button className="text-gray-600 hover:text-gray-800">Details</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* WhatsApp Integration Info */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">📱 WhatsApp Business Integration</h3>
                <p className="text-sm text-green-700 mb-4">
                    Connect your WhatsApp Business API to send automated notifications to your customers.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                    Configure Integration
                </button>
            </div>
        </div>
    );
}
