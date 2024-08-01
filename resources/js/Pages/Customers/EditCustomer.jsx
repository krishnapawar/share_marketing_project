import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Transition } from '@headlessui/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from "@/Components/SelectInput";

const EditCustomer = ({ auth }) => {
    const { customer } = usePage().props;

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: customer.name,
        email: customer.email,
        mobile_number: customer.mobile_number || '',
        dob: customer.dob || '',
        gender: customer.gender || '',
        aadhar_number: customer.aadhar_number || '',
        pancard_number: customer.pancard_number || '',
        alternate_mobile_number: customer.alternate_mobile_number || '',
        address: customer.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("customers.update", customer.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Customer</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        type="email"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="mobile_number" value="Mobile Number" />
                                    <TextInput
                                        id="mobile_number"
                                        value={data.mobile_number}
                                        onChange={(e) => setData("mobile_number", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.mobile_number} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="dob" value="Date of Birth" />
                                    <TextInput
                                        id="dob"
                                        value={data.dob}
                                        onChange={(e) => setData("dob", e.target.value)}
                                        type="date"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.dob} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="gender" value="Gender" />
                                    <SelectInput
                                        id="gender"
                                        value={data.gender}
                                        onChange={(e) => setData("gender", e.target.value)}
                                        options={[
                                            { value: '', label: 'Select Gender' },
                                            { value: 'M', label: 'Male' },
                                            { value: 'F', label: 'Female' },
                                            { value: 'O', label: 'Other' },
                                        ]}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.gender} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="aadhar_number" value="Aadhar Number" />
                                    <TextInput
                                        id="aadhar_number"
                                        value={data.aadhar_number}
                                        onChange={(e) => setData("aadhar_number", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.aadhar_number} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="pancard_number" value="Pancard Number" />
                                    <TextInput
                                        id="pancard_number"
                                        value={data.pancard_number}
                                        onChange={(e) => setData("pancard_number", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.pancard_number} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="alternate_mobile_number" value="Alternate Mobile Number" />
                                    <TextInput
                                        id="alternate_mobile_number"
                                        value={data.alternate_mobile_number}
                                        onChange={(e) => setData("alternate_mobile_number", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.alternate_mobile_number} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="address" value="Address" />
                                    <TextInput
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.address} className="mt-2" />
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditCustomer;
