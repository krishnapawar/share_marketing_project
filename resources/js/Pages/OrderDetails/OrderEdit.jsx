import React, { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from '@/Components/PrimaryButton';
import Select from 'react-select';
import SelectInput from "@/Components/SelectInput";
import { Transition } from "@headlessui/react";

const OrderEdit = ({ auth }) => {
    const { orderDetail } = usePage().props;
    const [totalAmount, SetTotalAmount] = useState(0);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: orderDetail.items.name,
        phone: orderDetail.items.phone,
        address: orderDetail.items.address,
        grandTotal: orderDetail.items.grandTotal,
        quantity: orderDetail.items.totalQuantity,
        status: orderDetail.status || "", // Status for order
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("orderDetails.update", orderDetail.id), {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        // Calculate total amount whenever quantity or price changes
        SetTotalAmount(data.quantity * data.grandTotal);
    }, [data.quantity, data.grandTotal]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Edit Order</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <form onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Phone Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Phone" />
                                    <TextInput
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData("phone", e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                {/* Address Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="address" value="Address" />
                                    <TextInput
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                {/* Quantity Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="quantity" value="Quantity" />
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        value={data.quantity}
                                        onChange={(e) => setData("quantity", e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>

                                {/* Total Price (Grand Total) Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="grandTotal" value="Total Price (Rs)" />
                                    <TextInput
                                        id="grandTotal"
                                        type="number"
                                        value={data.grandTotal}
                                        onChange={(e) => setData("grandTotal", e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.grandTotal} className="mt-2" />
                                </div>

                                {/* Status Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Order Status" />
                                    <SelectInput
                                        id="status"
                                        value={data.status}
                                        selected={data.status}
                                        onChange={(e) => setData("status", e.target.value)}
                                        options={[
                                            { value: '', label: 'Select Status' },
                                            { value: 'pending', label: 'Pending' },
                                            { value: 'completed', label: 'Completed' },
                                            { value: 'cancelled', label: 'Cancelled' },
                                            { value: 'shipped', label: 'Shipped' },
                                        ]}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                {/* Amount (Calculated) */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="amount" value="Amount" />
                                    <TextInput
                                        id="amount"
                                        value={totalAmount}
                                        disabled
                                        className="mt-1 block w-full"
                                    />
                                </div>

                                <div className="flex items-center gap-4 mt-4">
                                    <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 ">Saved.</p>
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

export default OrderEdit;
