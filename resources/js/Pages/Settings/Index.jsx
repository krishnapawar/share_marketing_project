import React from 'react';
import { usePage,Head  } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button/Button';

const Settings = ({ auth }) => {
    const { settings = [], flash = {} } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this setting?')) {
            route('settings.destroy', id);
        }
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-4">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Settings</h2>

                            {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Ensure your account is using a long, random password to stay secure.
                            </p> */}
                             <a href={route('settings.create')} className="mb-4 button grey">Add Setting</a>
                        </header>
                            
                            {flash.success && <div className="alert alert-success">{flash.success}</div>}
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Key</th>
                                        <th className="px-4 py-2">Value</th>
                                        <th className="px-4 py-2">Description</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {settings.map((setting) => (
                                        <tr key={setting.id}>
                                            <td className="border px-4 py-2">{setting.key}</td>
                                            <td className="border px-4 py-2">{setting.value}</td>
                                            <td className="border px-4 py-2">{setting.description}</td>
                                            <td className="border px-4 py-2">
                                                <a href={route('settings.edit', setting.id)} className="btn btn-warning mr-2">Edit</a>
                                                <button onClick={() => handleDelete(setting.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Settings;
