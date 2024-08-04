import React from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import useConfirm from "@/Components/ConfirmDialog";
import PrimaryButton from "@/Components/PrimaryButton";


const Order = ({ auth }) => {
    const { orders } = usePage().props;
    const confirm = useConfirm(); 
    let i = 0;
    const { delete: destroy,get } = useForm();

    const handleDelete = async(id) => {
        const isConfirmed = await confirm("Are you sure you want to delete this Order?");
        if (isConfirmed) {
            destroy(route("orders.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = async(e,id,status=null)=>{
        console.log('ok handle');
        let dt = {
            id:id,
            status: e.target.value
        }
        e.preventDefault();
        const isConfirmed = await confirm("Are you sure you want to change Order Status?");
        if (isConfirmed) {
            get(route("orders.index",dt),{
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    console.log('errors', errors);
                },
            });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Orders</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flax p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                        <div className="mt-4 text-gray-900 dark:text-gray-100">
                            <PrimaryButton>
                                <Link href={route("orders.create")}>
                                    Create Order
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Customer name
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Currency
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Qty
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Total Amount
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                                    {orders.data.map((order) => {
                                        const { data, setData, reset, errors } = useForm({
                                            id:order.id,
                                            status:order.status,
                                        });
                                        return (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 dark:text-gray-100">
                                                {i += 1 }
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                {order.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                {order.user.name ?? ''}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                
                                                <InputLabel htmlFor="status" value="Status" />
                                                <SelectInput
                                                    id="status"
                                                    value={data.status}
                                                    selected={data.status}
                                                    onChange={(e) => handleSubmit(e, order.id, setData("status", e.target.value))}
                                                    options={[
                                                        { value: '', label: 'Select Status' },
                                                        { value: 'running', label: 'Running' },
                                                        { value: 'cancelled', label: 'Cancelled' },
                                                        { value: 'completed', label: 'Completed' },
                                                        { value: 'pending', label: 'Pending' },
                                                    ]}
                                                    className={data.status+" mt-1 block w-full"}
                                                />
                                                <InputError message={errors.gender} className="mt-2" />
                                                
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                {order.currency}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                {order.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                {order.qty}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                {order.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                <Link
                                                    href={route("orders.edit", order.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Edit
                                                </Link>
                                                {/* <button
                                                    onClick={() => handleDelete(order.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button> */}
                                            </td>
                                        </tr>)
})}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                {orders.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        className={`mr-2 px-4 py-2 border rounded-lg ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    ></Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Order;
