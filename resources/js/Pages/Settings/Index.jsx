import React, { useState } from "react";
import { usePage, Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Transition } from '@headlessui/react';
import PrimaryButton from '@/Components/PrimaryButton';

const Settings = ({ auth }) => {
    const { settings = [], flash = {} } = usePage().props;
    const [localSettings, setLocalSettings] = useState(settings);

    const handleImageChange = (id, setData,setPreview) => (e) => {
        const file = e.target.files[0];
        setData("value", file);
        setPreview((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
    };

    const handleSubmit = (id, data, post, reset) => (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'value' && data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key]);
            }
        });

        post(route("updateSetting", id), {
            data: formData,
            preserveScroll: true,
            onSuccess: () => {
                const updatedSettings = localSettings.map((setting) =>
                    setting.id === id
                        ? { ...setting, ...data }
                        : setting
                );
                setLocalSettings(updatedSettings);
            },
            onError: (errors) => {
                console.log('errors', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                {localSettings.map((setting) => {
                    const {
                        data,
                        setData,
                        errors,
                        post,
                        reset,
                        processing,
                        recentlySuccessful,
                    } = useForm({
                        key: setting.key,
                        value: setting.key === "qrCode" && setting.file!=null && setting.file.name ? setting.file.name : setting.value,
                        description: setting.description,
                    });
                    let previewd = setting.key === "qrCode" && setting.file!=null ? setting.file.name : null;
                    const [preview, setPreview] = useState({[setting.id]:previewd});
                    
                    return (
                        <div key={setting.id} className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-4">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="container mx-auto p-4">
                                    <form onSubmit={handleSubmit(setting.id, data, post, reset)} method="post" encType="multipart/form-data">
                                        <input type="hidden" value={setting.id} />
                                        <div>
                                            <InputLabel htmlFor={`key-${setting.id}`} value="Key" />
                                            <TextInput
                                                id={`key-${setting.id}`}
                                                value={data.key}
                                                onChange={(e) => setData("key", e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full"
                                                readOnly
                                            />
                                            <InputError message={errors.key} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor={`value-${setting.id}`} value="Value" />
                                            {data.key === "qrCode" ? (
                                                <>
                                                    <TextInput
                                                        id={`value-${setting.id}`}
                                                        type="file"
                                                        onChange={handleImageChange(setting.id, setData,setPreview)}
                                                        className="mt-1 block w-full"
                                                        
                                                    />
                                                    {preview[setting.id] && (
                                                        <img
                                                            src={preview[setting.id] ?? previewd}
                                                            alt="QR Code Preview"
                                                            className="mt-2 h-32"
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <TextInput
                                                    id={`value-${setting.id}`}
                                                    value={data.value}
                                                    onChange={(e) => setData("value", e.target.value)}
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                />
                                            )}
                                            <InputError message={errors.value} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor={`description-${setting.id}`} value="Description" />
                                            <TextInput
                                                id={`description-${setting.id}`}
                                                value={data.description}
                                                onChange={(e) => setData("description", e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.description} className="mt-2" />
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
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
};

export default Settings;
