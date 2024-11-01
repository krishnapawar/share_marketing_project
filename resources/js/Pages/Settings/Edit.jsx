import React, { useState } from 'react';
import { usePage,Head  } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button/Button';

const Edit = ({auth}) => {
    const { setting } = usePage().props;
    const [values, setValues] = useState({
        key: setting.key,
        value: setting.value,
        description: setting.description || ''
    });

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('settings.update', setting.id), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Edit Setting</h2>}
        >
            <Head title="Edit Setting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-4">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 ">Edit Setting</h2>

                            {/* <p className="mt-1 text-sm text-gray-600 ">
                                Ensure your account is using a long, random password to stay secure.
                            </p> */}
                        </header>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="key">Key</label>
                                <input type="text" id="key" value={values.key} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="value">Value</label>
                                <input type="text" id="value" value={values.value} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input type="text" id="description" value={values.description} onChange={handleChange} />
                            </div>
                            <Button type="submit" className='grey' btn_bg={false}>Save</Button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
