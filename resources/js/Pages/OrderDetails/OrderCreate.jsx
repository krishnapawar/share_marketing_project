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
import FrontEndOrder from "../frontEnd/order";

const OrderEdit = ({ auth }) => {
    // const { orderDetail } = usePage().props;
    // const [totalAmount, SetTotalAmount] = useState(0);

    // const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    //     name: orderDetail.items.name,
    //     phone: orderDetail.items.phone,
    //     address: orderDetail.items.address,
    //     grandTotal: orderDetail.items.grandTotal,
    //     quantity: orderDetail.items.totalQuantity,
    //     status: orderDetail.status || "", // Status for order
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     patch(route("orderDetails.update", orderDetail.id), {
    //         preserveScroll: true,
    //     });
    // };

    // useEffect(() => {
    //     // Calculate total amount whenever quantity or price changes
    //     SetTotalAmount(data.quantity * data.grandTotal);
    // }, [data.quantity, data.grandTotal]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Edit Order</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <FrontEndOrder/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderEdit;
