'use client';

import { useState } from 'react';
import { getOfferings } from '@/lib/data/offerings';

export default function Offerings() {
    const [offerings] = useState(getOfferings());
    const [filter, setFilter] = useState('all');

    const filteredOfferings = filter === 'all'
        ? offerings
        : offerings.filter(o => o.status === filter);

    const categories = Array.from(new Set(offerings.map(o => o.category)));

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Product Offerings</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Add Product
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-2 px-4 ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    All ({offerings.length})
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`pb-2 px-4 ${filter === 'active' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Active ({offerings.filter(o => o.status === 'active').length})
                </button>
                <button
                    onClick={() => setFilter('out-of-stock')}
                    className={`pb-2 px-4 ${filter === 'out-of-stock' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                >
                    Out of Stock ({offerings.filter(o => o.status === 'out-of-stock').length})
                </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Filter by Category:</div>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOfferings.map((offering) => (
                    <div key={offering.id} className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <div className="text-white text-4xl">📦</div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold">{offering.name}</h3>
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${offering.status === 'active' ? 'bg-green-100 text-green-800' :
                                        offering.status === 'out-of-stock' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {offering.status}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">{offering.description}</p>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {offering.category}
                                </span>
                                <span className={`text-sm ${offering.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                                    Stock: {offering.stock}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="text-2xl font-bold text-blue-600">
                                    ${offering.price.toLocaleString()}
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
