import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const ConfirmDialog = ({ message, resolve }) => {
    const handleConfirm = () => {
        resolve(true);
    };

    const handleCancel = () => {
        resolve(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-1/3">
                <div className="text-center">
                    <p className="text-lg text-gray-900 dark:text-gray-100">{message}</p>
                    <div className="mt-6 flex justify-center">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const useConfirm = () => {
    const confirm = (message) => {
        return new Promise((resolve) => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            const root = ReactDOM.createRoot(container);

            const handleClose = () => {
                root.unmount();
                document.body.removeChild(container);
            };

            root.render(<ConfirmDialog message={message} resolve={(result) => { resolve(result); handleClose(); }} />);
        });
    };

    return confirm;
};

export default useConfirm;
