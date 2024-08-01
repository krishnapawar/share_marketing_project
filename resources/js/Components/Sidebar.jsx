import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/react';

// Helper function to get the class names for the active link
const getLinkClassName = (routeName) => {
    const baseClass = "block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white";
    return route().current(routeName) ? `${baseClass} active` : baseClass;
};

// Navigation links
const navLinks = [
    { name: 'Dashboard', routeName: 'dashboard' },
    { name: 'Profile', routeName: 'profile.edit' },
    { name: 'Customers', routeName: 'customers.index' },
    { name: 'Orders', routeName: 'orders.index' },
    { name: 'Transactions', routeName: 'transactions.index' },
    { name: 'Settings', routeName: 'settings.index' },
    { name: 'Logout', routeName: 'logout', method: 'post' }
];

const Sidebar = React.memo(({ isOpen, toggleSidebar }) => {
    const { appName } = usePage().props;

    return (
        <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-200 shadow-md transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30`}>
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <div className="text-2xl font-bold">{appName}</div>
                <button className="text-2xl lg:hidden" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
            </div>
            <nav className="mt-5">
                {navLinks.map(({ name, routeName, method }) => (
                    <Link
                        key={routeName}
                        href={route(routeName)}
                        method={method}
                        className={getLinkClassName(routeName)}
                    >
                        {name}
                    </Link>
                ))}
            </nav>
        </div>
    );
});

export default Sidebar;
