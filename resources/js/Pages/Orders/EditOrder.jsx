import React,{useState,useEffect} from "react";
import { usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Transition } from '@headlessui/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from "@/Components/SelectInput";
import Select from 'react-select';

const EditCustomer = ({ auth }) => {
    const { users, order } = usePage().props;
    const [totalAmount,SetTotalAmount] = useState(0);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        user_id: order.user_id || '',
        status: order.status || '',
        date: order.date || '',
        currency: order.currency || '',
        price: order.price || 0,
        type: order.type || '',
        qty: order.qty || 1,
        amount: order.qty || 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("orders.update",order.id), {
            preserveScroll: true,
        });
    };

    const handleSelectChange = (selectedOption) => {
        setData("user_id", selectedOption ? selectedOption.value : null);
    };

    const userOptions=users.map((item)=>{
        return {value:item.id,label:item.customer_id+" - "+item.name}
    })

    useEffect(()=>{
        data.amount = data.qty * data.price;
        SetTotalAmount(data.amount);
    },[data]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Create Order</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <InputLabel htmlFor="date" value="Date" />
                                    <TextInput
                                        id="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        type="date"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="user_id" value="User" />
                                    <Select
                                        id="user_id"
                                        value={userOptions.find(option => option.value === data.user_id)}
                                        onChange={handleSelectChange}
                                        options={userOptions}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.user_id} className="mt-2" />
                                </div>
                                {/* <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                        <SelectInput
                                            id="status"
                                            value={data.status}
                                            selected={data.status}
                                            onChange={(e) => setData("status", e.target.value)}
                                            options={[
                                                { value: '', label: 'Select Status' },
                                                { value: 'running', label: 'Running' },
                                                { value: 'cancelled', label: 'Cancelled' },
                                                { value: 'completed', label: 'Completed' },
                                                { value: 'pending', label: 'Pending' },
                                            ]}
                                            className={data.status+" mt-1 block w-full"}
                                        />
                                    <InputError message={errors.status} className="mt-2" />
                                </div> */}
                                <div>
                                    <InputLabel htmlFor="type" value="Type" />
                                        <SelectInput
                                            id="type"
                                            value={data.type}
                                            selected={data.type}
                                            onChange={(e) => setData("type", e.target.value)}
                                            options={[
                                                // { value: '', label: 'Select type' },
                                                { value: 'buy', label: 'Buy' },
                                                // { value: 'sell', label: 'Sell' },
                                            ]}
                                            className={data.type+" mt-1 block w-full"}
                                        />
                                    <InputError message={errors.type} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="currency" value="Currency" />
                                    <TextInput
                                        id="currency"
                                        value={data.currency}
                                        onChange={(e) => setData("currency", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.currency} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        value={data.price}
                                        onChange={(e) => setData("price", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                        min="0"
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="qty" value="QTY" />
                                    <TextInput
                                        id="qty"
                                        value={data.qty}
                                        onChange={(e) => setData("qty", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                        min="0"
                                    />
                                    <InputError message={errors.qty} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="amount" value="Amount" />
                                    <TextInput
                                        id="amount"
                                        value={data.amount}
                                        onChange={(e) => setData("amount", e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.amount} className="mt-2" />
                                </div>
                                {
                                    data.type === 'sell' && (
                                        <>
                                        <div>
                                            <InputLabel htmlFor="price" value="Price" />
                                            <TextInput
                                                id="price"
                                                value={data.price}
                                                onChange={(e) => setData("price", e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full"
                                                min="0"
                                            />
                                            <InputError message={errors.price} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="qty" value="QTY" />
                                            <TextInput
                                                id="qty"
                                                value={data.qty}
                                                onChange={(e) => setData("qty", e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full"
                                                min="0"
                                            />
                                            <InputError message={errors.qty} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="amount" value="Amount" />
                                            <TextInput
                                                id="amount"
                                                value={data.amount}
                                                onChange={(e) => setData("amount", e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.amount} className="mt-2" />
                                        </div>
                                        </>
                                    )
                                }                 

                                <div className="flex items-center gap-4 mt-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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

export default EditCustomer;
