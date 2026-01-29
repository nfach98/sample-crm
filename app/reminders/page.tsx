'use client';

import { useState } from 'react';
import { getEmailReminders } from '@/lib/data/reminders';

export default function Reminders() {
    const [reminders] = useState(getEmailReminders());
    const [filter, setFilter] = useState('all');

    const filteredReminders = filter === 'all'
        ? reminders
        : reminders.filter(r => r.status === filter);

    const typeColors: Record<string, string> = {
        'follow-up': 'bg-blue-100 text-blue-800',
        'meeting': 'bg-purple-100 text-purple-800',
        'payment': 'bg-red-100 text-red-800',
        'general': 'bg-gray-100 text-gray-800',
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Email Reminders</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Schedule Reminder
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Total Reminders</div>
                    <div className="text-2xl font-bold">{reminders.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Scheduled</div>
                    <div className="text-2xl font-bold text-orange-600">
                        {reminders.filter(r => r.status === 'scheduled').length}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Sent</div>
                    <div className="text-2xl font-bold text-green-600">
                        {reminders.filter(r => r.status === 'sent').length}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Failed</div>
                    <div className="text-2xl font-bold text-red-600">
                        {reminders.filter(r => r.status === 'failed').length}
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-2 px-4 ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    All ({reminders.length})
                </button>
                <button
                    onClick={() => setFilter('scheduled')}
                    className={`pb-2 px-4 ${filter === 'scheduled' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Scheduled ({reminders.filter(r => r.status === 'scheduled').length})
                </button>
                <button
                    onClick={() => setFilter('sent')}
                    className={`pb-2 px-4 ${filter === 'sent' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Sent ({reminders.filter(r => r.status === 'sent').length})
                </button>
            </div>

            {/* Reminders List */}
            <div className="space-y-4">
                {filteredReminders.map((reminder) => (
                    <div key={reminder.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-semibold">{reminder.subject}</h3>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${typeColors[reminder.type]}`}>
                                        {reminder.type}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    To: <span className="font-medium">{reminder.recipientName}</span> ({reminder.recipientEmail})
                                </div>
                                <p className="text-sm text-gray-700 mb-3">{reminder.message}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${reminder.status === 'scheduled' ? 'bg-orange-100 text-orange-800' :
                                    reminder.status === 'sent' ? 'bg-green-100 text-green-800' :
                                        reminder.status === 'failed' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                {reminder.status}
                            </span>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t">
                            <div className="text-sm text-gray-600">
                                {reminder.status === 'scheduled' && (
                                    <span>📅 Scheduled: {new Date(reminder.scheduledDate).toLocaleString()}</span>
                                )}
                                {reminder.status === 'sent' && reminder.sentDate && (
                                    <span>✅ Sent: {new Date(reminder.sentDate).toLocaleString()}</span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {reminder.status === 'scheduled' && (
                                    <>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                                        <button className="text-red-600 hover:text-red-800 text-sm">Cancel</button>
                                    </>
                                )}
                                {reminder.status === 'sent' && (
                                    <button className="text-gray-600 hover:text-gray-800 text-sm">View Details</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
