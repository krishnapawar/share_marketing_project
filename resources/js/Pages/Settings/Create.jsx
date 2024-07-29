import React from 'react';
import { usePage,Head ,useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button/Button';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const Create = ({auth}) => {
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        key: '',
        value: '',
        description: ''
    });

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setData(values => ({
            ...values,
            [key]: value
        }));
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // post(route('settings.store'), values);

        post(route('settings.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };
    


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Setting</h2>}
        >
            <Head title="Create Setting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-4">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create Setting</h2>

                                {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Ensure your account is using a long, random password to stay secure.
                                </p> */}
                            </header>

                            <form onSubmit={handleSubmit}>
                                <div>
                                <InputLabel htmlFor="key" value="Key"/>
                                <TextInput
                                    id="key"
                                    value={data.key}
                                    onChange={(e) => setData('key', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.key} className="mt-2" />
                                </div>
                                <div>
                                <InputLabel htmlFor="value" value="Value"/>
                                <TextInput
                                    id="value"
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.value} className="mt-2" />
                                </div>
                                <div>
                                <InputLabel htmlFor="description" value="Description"/>
                                <TextInput
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.description} className="mt-2" />
                                </div>
                                <Button type="submit" className='grey mt-2' btn_bg={false}>Save</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
