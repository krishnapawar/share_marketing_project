import React from 'react';

const Footer = ({ laravelVersion, phpVersion , auth=null }) => {
    return (
        <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-center">
            <div className="container mx-auto">
                <p className="text-sm text-black dark:text-white/70">
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
