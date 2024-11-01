import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/react';

// Helper function to get the class names for the active link
const getLinkClassName = (routeUrl) => {
    const baseClass = "block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white";
    return route().current(routeUrl+'*') ? `${baseClass} active` : baseClass;
};

// Navigation links
const navLinksShareAdmin = [
    { name: 'Dashboard', routeName: 'dashboard', url:'dashboard'},
    { name: 'Profile', routeName: 'profile.edit', url:'profile' },
    { name: 'Customers', routeName: 'customers.index', url:'customers' },
    { name: 'Orders', routeName: 'orders.index', url:'orders' },
    { name: 'Categories', routeName: 'categories.index', url:'categories' },
    { name: 'Loan Request', routeName: 'loanRequest.index', url:'loanRequest' },
    { name: 'Transactions', routeName: 'transactions.index', url:'transactions' },
    { name: 'Settings', routeName: 'settings.index', url:'settings' },
    { name: 'Logout', routeName: 'logout', url:'logout',  method: 'post' }
];

// Navigation links
const navLinksRoleFireWork = [
    { name: 'Dashboard', routeName: 'dashboard', url:'dashboard'},
    { name: 'Profile', routeName: 'profile.edit', url:'profile' },
    // { name: 'Customers', routeName: 'customers.index', url:'customers' },
    { name: 'Orders', routeName: 'orderDetails.index', url:'orderDetails' },
    { name: 'Categories', routeName: 'categories.index', url:'categories' },
    // { name: 'Loan Request', routeName: 'loanRequest.index', url:'loanRequest' },
    // { name: 'Transactions', routeName: 'transactions.index', url:'transactions' },
    // { name: 'Settings', routeName: 'settings.index', url:'settings' },
    { name: 'Logout', routeName: 'logout', url:'logout',  method: 'post' }
];



const Sidebar = React.memo(({ isOpen, toggleSidebar }) => {
    const { appName,auth } = usePage().props;
    const navLinks = auth.user && auth.user.role == 2 ? navLinksRoleFireWork : navLinksShareAdmin;

    return (
        <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-200 shadow-md transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30`}>
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <div className="text-2xl font-bold">{appName}</div>
                <button className="text-2xl lg:hidden" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
            </div>
            <nav className="mt-5">
                {navLinks.map(({ name, routeName, url, method }) => (
                    <Link
                        key={routeName}
                        href={route(routeName)}
                        method={method}
                        className={getLinkClassName(url)}
                    >
                        {name}
                    </Link>
                ))}
            </nav>
        </div>
    );
});

export default Sidebar;
