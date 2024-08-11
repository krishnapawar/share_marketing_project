import React from 'react';
import ReactDOM from 'react-dom/client';
import { FaQuestionCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const ConfirmDialog = ({ message, resolve, icon: Icon }) => {
    const handleConfirm = () => {
        resolve(true);
    };

    const handleCancel = () => {
        resolve(false);
    };

    // Use a default icon if none is provided
    const iconsObje ={
        "question": FaQuestionCircle,
        "exclamation": FaExclamationTriangle,
        "info": FaInfoCircle
    }
    const DefaultIcon = iconsObje[Icon ?? 'question']

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
                <div className="flex flex-col items-center">
                    <DefaultIcon className="text-5xl text-blue-500 dark:text-blue-400 mb-4" />
                    <p className="text-lg text-gray-900 dark:text-gray-100 text-center mb-6">{message}</p>
                    <div className="flex space-x-4">
                        <button
                            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors"
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
    const confirm = (message, icon) => {
        return new Promise((resolve) => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            const root = ReactDOM.createRoot(container);

            const handleClose = () => {
                root.unmount();
                document.body.removeChild(container);
            };

            root.render(<ConfirmDialog message={message} resolve={(result) => { resolve(result); handleClose(); }} icon={icon} />);
        });
    };

    return confirm;
};

export default useConfirm;
