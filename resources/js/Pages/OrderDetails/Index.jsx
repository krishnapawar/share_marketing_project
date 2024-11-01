import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const OrderDetail = ({ auth }) => {
    const { orderDetail } = usePage().props; // Fetching orderDetail data from backend
    console.log("order", orderDetail);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', render: (item) => item.items.name },
        { key: 'phone', label: 'Phone', render: (item) => item.items.phone },
        { key: 'address', label: 'Address', render: (item) => item.items.address },
        {
            key: 'created_at', label: 'Order Date', render: (item) => {
                const date = new Date(item.created_at);
                return date.toLocaleDateString('en-CA'); // 'en-CA' gives you YYYY-MM-DD format
            }
        },
        { key: 'quantity', label: 'Quantity', render: (item) => item.items.totalQuantity ?? '' },
        { key: 'grandTotal', label: 'Total Price (Rs)', render: (item) => item.items.grandTotal + " Rs" },
        {
            key: 'actions',
            label: 'Actions',
            render: (item) => (
                <div className="flex">
                    <button
                        // onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                        data-toggle="tooltip" data-placement="top" title="Delete Customer"
                    >
                        <FaTrash />
                    </button>
                    <Link
                        href={route("orderDetails.edit", item.id)}
                        className="text-indigo-600 hover:text-indigo-900 mt-2 mr-4"
                        data-toggle="tooltip" data-placement="top" title="Edit Customer"
                    >
                        <FaPen />
                    </Link>
                    <Link
                        href={route("orderDetails.show", item.id)}
                        className="text-indigo-600 hover:text-indigo-900 mt-2 mr-4"
                        data-toggle="tooltip" data-placement="top" title="View Customer"
                    >
                        <FaEye />
                    </Link>
                </div>
            )
        }
    ];

    const handleDelete = async (id) => {
        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (isConfirmed.value) {
            // Delete action
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                        Order Details
                    </h2>
                    {/* Create Order Button */}
                    <Link
                        href={route("orderDetails.create")} // Replace with the route to create a new order
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create Order
                    </Link>
                </div>
            }
            headTitle="Order Details"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* <Table columns={columns} data={orderDetail.items} /> */}
                            <Table columns={columns} data={orderDetail.data} paginate={orderDetail} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderDetail;
