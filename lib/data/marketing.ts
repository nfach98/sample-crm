import { MarketingCampaign } from '../types';

export let campaigns: MarketingCampaign[] = [
    {
        id: 'CAM001',
        name: 'Spring Product Launch',
        description: 'Email campaign to announce new product features',
        type: 'email',
        status: 'active',
        startDate: new Date('2026-01-20'),
        endDate: new Date('2026-02-20'),
        targetAudience: 'All Active Customers',
        budget: 5000,
        spent: 2300,
        reach: 1250,
        conversions: 87,
    },
    {
        id: 'CAM002',
        name: 'WhatsApp Promotion',
        description: 'Limited-time discount offer via WhatsApp',
        type: 'whatsapp',
        status: 'active',
        startDate: new Date('2026-01-25'),
        endDate: new Date('2026-02-05'),
        targetAudience: 'High-Value Customers',
        budget: 3000,
        spent: 1500,
        reach: 450,
        conversions: 62,
    },
    {
        id: 'CAM003',
        name: 'Social Media Awareness',
        description: 'Brand awareness campaign across social media platforms',
        type: 'social',
        status: 'active',
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-03-15'),
        targetAudience: 'General Audience',
        budget: 10000,
        spent: 4200,
        reach: 5800,
        conversions: 145,
    },
    {
        id: 'CAM004',
        name: 'Q1 Multi-Channel Campaign',
        description: 'Comprehensive campaign across all channels',
        type: 'multi-channel',
        status: 'paused',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-03-31'),
        targetAudience: 'All Customers & Leads',
        budget: 15000,
        spent: 8500,
        reach: 3200,
        conversions: 198,
    },
    {
        id: 'CAM005',
        name: 'Customer Reactivation',
        description: 'Email campaign to re-engage inactive customers',
        type: 'email',
        status: 'draft',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-02-28'),
        targetAudience: 'Inactive Customers',
        budget: 4000,
        spent: 0,
        reach: 0,
        conversions: 0,
    },
];

export const getCampaigns = () => campaigns;

export const getCampaignById = (id: string) => {
    return campaigns.find(c => c.id === id);
};

export const addCampaign = (campaign: Omit<MarketingCampaign, 'id'>) => {
    const newCampaign: MarketingCampaign = {
        ...campaign,
        id: `CAM${String(campaigns.length + 1).padStart(3, '0')}`,
    };
    campaigns.push(newCampaign);
    return newCampaign;
};

export const updateCampaign = (id: string, updates: Partial<MarketingCampaign>) => {
    const index = campaigns.findIndex(c => c.id === id);
    if (index !== -1) {
        campaigns[index] = { ...campaigns[index], ...updates };
        return campaigns[index];
    }
    return null;
};

export const deleteCampaign = (id: string) => {
    const index = campaigns.findIndex(c => c.id === id);
    if (index !== -1) {
        campaigns.splice(index, 1);
        return true;
    }
    return false;
};
