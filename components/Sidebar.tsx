'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Gift,
    Megaphone,
    Mail,
    MessageCircle,
    UserCog
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Offerings', href: '/offerings', icon: Gift },
    { name: 'Marketing', href: '/marketing', icon: Megaphone },
    // { name: 'Email Reminders', href: '/reminders', icon: Mail },
    // { name: 'WhatsApp', href: '/whatsapp', icon: MessageCircle },
    { name: 'Accounts & Roles', href: '/accounts', icon: UserCog },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold">CRM System</h1>
                <p className="text-sm text-gray-400 mt-1">Business Management</p>
            </div>

            <nav className="mt-6">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-6 py-3 transition-colors ${isActive
                                ? 'bg-blue-600 text-white border-l-4 border-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <IconComponent className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="font-semibold">A</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium">Admin User</div>
                        <div className="text-xs text-gray-400">admin@company.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
