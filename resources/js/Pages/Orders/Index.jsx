import React from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import useConfirm from "@/Components/ConfirmDialog";
import PrimaryButton from "@/Components/PrimaryButton";
import { FaPen } from "react-icons/fa";
import Table from "@/Components/Table";

const Order = ({ auth }) => {
    const { orders } = usePage().props;
    const confirm = useConfirm();
    let i = 0;
    const { delete: destroy, get,errors } = useForm();

    const handleDelete = async (id) => {
        const isConfirmed = await confirm("Are you sure you want to delete this Order?");
        if (isConfirmed) {
            destroy(route("orders.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const status = e.target.value;
        const isConfirmed = await confirm("Are you sure you want to change Order Status?");
        if (isConfirmed) {
            get(route("orders.index", { id, status }), {
                preserveScroll: true,
                onError: (errors) => {
                    console.log('errors', errors);
                },
            });
        }
    };

    const columns =[
        { key:'id', label:'Id'},
        { key:'date', label:'Date'},
        { key:'customer_name', label:'Customer Name', render:(item)=>{
            return item.user.name ?? "-";
        }},
        { key:'status', label:'Status', render:(item)=>{
            return(
                <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <SelectInput
                        id="status"
                        value={item.status}
                        onChange={(e) => handleSubmit(e, order.id)}
                        options={[
                            { value: '', label: 'Select Status' },
                            { value: 'running', label: 'Running' },
                            { value: 'cancelled', label: 'Cancelled' },
                            { value: 'completed', label: 'Completed' },
                            { value: 'pending', label: 'Pending' },
                        ]}
                        className={item.status+" mt-1 block w-full"}
                    />
                    <InputError message={errors.status} className="mt-2" />
                </div>
            );
        }},
        { key:'currency', label:'Currency'},
        { key:'Price', label:'price'},
        { key:'qty', label:'Qty'},
        { key:'amount', label:'Total Amount'},
        { key:'actions', label:'Actions', render:(order)=>{
            return(
                <div>
                    <Link
                        href={route("orders.edit", order.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                        <FaPen/>
                    </Link>
                    {/* <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:text-red-900"
                    >
                        Delete
                    </button> */}
                </div>
            )
        }},
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Orders</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                        <div className="mt-4 text-gray-900 dark:text-gray-100">
                            <PrimaryButton>
                                <Link href={route("orders.create")}>
                                    Add Order
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Table columns={columns} data={orders.data} paginate={orders} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Order;
