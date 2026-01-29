'use client';

import { useState } from 'react';
import { getCampaigns } from '@/lib/data/marketing';

export default function Marketing() {
    const [campaigns] = useState(getCampaigns());
    const [filter, setFilter] = useState('all');

    const filteredCampaigns = filter === 'all'
        ? campaigns
        : campaigns.filter(c => c.status === filter);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Create Campaign
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-2 px-4 ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    All ({campaigns.length})
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`pb-2 px-4 ${filter === 'active' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Active ({campaigns.filter(c => c.status === 'active').length})
                </button>
                <button
                    onClick={() => setFilter('draft')}
                    className={`pb-2 px-4 ${filter === 'draft' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Draft ({campaigns.filter(c => c.status === 'draft').length})
                </button>
                <button
                    onClick={() => setFilter('paused')}
                    className={`pb-2 px-4 ${filter === 'paused' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Paused ({campaigns.filter(c => c.status === 'paused').length})
                </button>
            </div>

            {/* Campaign Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCampaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{campaign.name}</h3>
                                <p className="text-sm text-gray-600">{campaign.description}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                                    campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                                        campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                }`}>
                                {campaign.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Type</div>
                                <div className="text-sm font-medium capitalize">{campaign.type}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Target</div>
                                <div className="text-sm font-medium">{campaign.targetAudience}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Reach</div>
                                <div className="text-lg font-bold">{campaign.reach.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Conversions</div>
                                <div className="text-lg font-bold">{campaign.conversions}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">CVR</div>
                                <div className="text-lg font-bold">
                                    {campaign.reach > 0 ? ((campaign.conversions / campaign.reach) * 100).toFixed(1) : 0}%
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Budget Progress</span>
                                <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <div className="text-gray-600">
                                {new Date(campaign.startDate).toLocaleDateString()} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Ongoing'}
                            </div>
                            <div className="flex gap-2">
                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                <button className="text-gray-600 hover:text-gray-800">View</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
