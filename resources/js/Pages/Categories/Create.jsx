import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

const Create = ({ auth }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        description: '',
        price: '',  // Initialize price
        media: null,  // Initialize media for image
    });

    const [imagePreview, setImagePreview] = useState(null);

    // Handle text input changes
    const handleChange = (e) => {
        setData(e.target.id, e.target.value);
    };

    // Handle file input changes and show image preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('media', file); // Store the file in form data
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file); // Convert the file to base64 string for preview
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/categories');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Create Category</h2>}
        >
            <Head title="Create Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextInput
                                        id="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Price Field */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        value={data.price}
                                        onChange={handleChange}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                {/* Image Upload Section */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="media" value="Category Image" />
                                    <input
                                        id="media"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full"
                                        onChange={handleFileChange}
                                    />
                                    <InputError message={errors.media} className="mt-2" />

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <p className="mb-2">Image Preview:</p>
                                            <img
                                                src={imagePreview}
                                                alt="Image Preview"
                                                className="h-32 w-32 object-cover rounded"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 mt-4">
                                    <PrimaryButton disabled={processing}>Create</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 ">Created successfully.</p>
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

export default Create;
