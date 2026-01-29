// CRM Data Types

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'active' | 'inactive' | 'lead';
    createdAt: Date;
    lastContact: Date;
    totalOrders: number;
    totalSpent: number;
}

export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: Date;
    deliveryDate?: Date;
    paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface OrderItem {
    offeringId: string;
    offeringName: string;
    quantity: number;
    price: number;
}

export interface Offering {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'out-of-stock';
    createdAt: Date;
    imageUrl?: string;
}

export interface MarketingCampaign {
    id: string;
    name: string;
    description: string;
    type: 'email' | 'whatsapp' | 'social' | 'multi-channel';
    status: 'draft' | 'active' | 'paused' | 'completed';
    startDate: Date;
    endDate?: Date;
    targetAudience: string;
    budget: number;
    spent: number;
    reach: number;
    conversions: number;
}

export interface AccountRole {
    id: string;
    userId: string;
    userName: string;
    email: string;
    role: 'admin' | 'manager' | 'sales' | 'support' | 'viewer';
    permissions: string[];
    createdAt: Date;
    lastLogin?: Date;
    status: 'active' | 'inactive';
}

export interface EmailReminder {
    id: string;
    subject: string;
    recipientId: string;
    recipientName: string;
    recipientEmail: string;
    message: string;
    scheduledDate: Date;
    status: 'scheduled' | 'sent' | 'failed' | 'cancelled';
    sentDate?: Date;
    type: 'follow-up' | 'meeting' | 'payment' | 'general';
}

export interface WhatsAppNotification {
    id: string;
    recipientId: string;
    recipientName: string;
    recipientPhone: string;
    message: string;
    scheduledDate: Date;
    status: 'scheduled' | 'sent' | 'failed' | 'cancelled';
    sentDate?: Date;
    type: 'order-update' | 'promotion' | 'reminder' | 'support';
}

export interface DashboardStats {
    totalCustomers: number;
    activeCustomers: number;
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    monthlyRevenue: number;
    activeCampaigns: number;
    pendingReminders: number;
}
