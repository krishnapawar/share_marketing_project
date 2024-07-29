import { FaTimes } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { appName } = usePage().props;
    return (
        <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-200 shadow-md transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30`}>
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <div className="text-2xl font-bold">{ appName }</div>
                <button className="text-2xl lg:hidden" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
            </div>
            <nav className="mt-5">
                <Link href={route('dashboard')}   className={route().current('dashboard') ? "block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white active" 
                    :"block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
                }>Dashboard</Link>
                <Link href={route('profile.edit')}  className={route().current('profile.edit') ? "block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white active" 
                    :"block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
                }>Profile</Link>
                <Link href={route('settings.index')}  className={route().current('settings.index') ? "block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white active" 
                    :"block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
                }>Settings</Link>
                <Link href={route('logout')} method="post" className={route().current('logout') ? "block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white active" 
                    :"block py-2.5 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
                }>Logout</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
