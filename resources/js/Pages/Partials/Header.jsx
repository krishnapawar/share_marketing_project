import React from 'react';
import { Link} from '@inertiajs/react';
import { FaLaravel } from 'react-icons/fa';


const Header = ({  auth }) => {
    return (
    
    <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
    <div className="flex lg:justify-center lg:col-start-2">
        <FaLaravel className="h-12 w-auto text-white lg:h-16 lg:text-[#61DAFB]" />
    </div>
    <nav className="-mx-3 flex flex-1 justify-end">
        {auth.user ? (
            <Link
                href={route("dashboard")}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
                Dashboard
            </Link>
        ) : (
            <>
                {/* <Link
                    href={route("login")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Log in
                </Link>
                <Link
                    href={route("register")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Register
                </Link> */}
            </>
        )}
    </nav>
</header>
)}

export default Header;