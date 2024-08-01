import React from 'react';

const Banner = () => {
    return (
        <div className="flex items-center  flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 mb-4
         shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
            <div className="text-center p-8" >
                <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                <p className="text-lg mb-8">Download our app now and enjoy the best experience.</p>
                <div className="flex justify-center space-x-4">
                    <a href="https://play.google.com/store/apps/details?id=your.android.app" target="_blank" rel="noopener noreferrer">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                            Download for Android
                        </button>
                    </a>
                    <a href="https://apps.apple.com/us/app/your-ios-app/id123456789" target="_blank" rel="noopener noreferrer">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                            Download for iOS
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner;
