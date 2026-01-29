'use client';

import { useState } from 'react';
import { getOrders } from '@/lib/data/orders';

export default function Orders() {
    const [orders] = useState(getOrders());
    const [filter, setFilter] = useState('all');

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(o => o.status === filter);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Order Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Create Order
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-2 px-4 ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    All ({orders.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`pb-2 px-4 ${filter === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Pending ({orders.filter(o => o.status === 'pending').length})
                </button>
                <button
                    onClick={() => setFilter('processing')}
                    className={`pb-2 px-4 ${filter === 'processing' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Processing ({orders.filter(o => o.status === 'processing').length})
                </button>
                <button
                    onClick={() => setFilter('shipped')}
                    className={`pb-2 px-4 ${filter === 'shipped' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Shipped ({orders.filter(o => o.status === 'shipped').length})
                </button>
                <button
                    onClick={() => setFilter('delivered')}
                    className={`pb-2 px-4 ${filter === 'delivered' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Delivered ({orders.filter(o => o.status === 'delivered').length})
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Order {order.id}</h3>
                                <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                                <p className="text-xs text-gray-500">Ordered: {new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-gray-100 text-gray-800'
                                    }`}>
                                    {order.status}
                                </span>
                                <div className="mt-2">
                                    <span className={`text-xs px-2 py-1 rounded ${order.paymentStatus === 'paid' ? 'bg-green-50 text-green-700' :
                                            order.paymentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                                'bg-red-50 text-red-700'
                                        }`}>
                                        Payment: {order.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-4">
                            <h4 className="text-sm font-semibold mb-2">Order Items:</h4>
                            <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <div>
                                            <span className="font-medium">{item.offeringName}</span>
                                            <span className="text-gray-600"> x {item.quantity}</span>
                                        </div>
                                        <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                            <div className="text-sm text-gray-600">
                                {order.deliveryDate && `Delivery: ${new Date(order.deliveryDate).toLocaleDateString()}`}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-xl font-bold">
                                    Total: ${order.totalAmount.toLocaleString()}
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    <button className="text-green-600 hover:text-green-800 text-sm">Update Status</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
