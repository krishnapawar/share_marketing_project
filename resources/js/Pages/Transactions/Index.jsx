import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import useConfirm from "@/Components/ConfirmDialog";
import { FaPen, FaTrash } from "react-icons/fa";

const Order = ({ auth }) => {
    const { transactions } = usePage().props;
    const [filterData, setFilterData] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const confirm = useConfirm();
    let i = 0;
    const { delete: destroy, get, reset, errors } = useForm();

    useEffect(() => {
        // Extract filter value from URL
        const queryParams = new URLSearchParams(window.location.search);
        const filterValue = queryParams.get("filter");
        if (filterValue) {
            setFilterData(filterValue);
        }
    }, [window.location.search]);

    useEffect(() => {
        if (filterValue) {
            get(route("transactions.index", { filter: filterValue }), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    console.log("errors", errors);
                },
            });
        }
    }, [filterValue]);

    const handleDelete = async (id) => {
        const isConfirmed = await confirm(
            "Are you sure you want to delete this Transaction?"
        );
        if (isConfirmed) {
            destroy(route("transactions.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = async (e, id, status = null) => {
        console.log("ok handle");
        let dt = {
            id: id,
            status: e.target.value,
        };
        e.preventDefault();
        const isConfirmed = await confirm(
            "Are you sure you want to change Transaction Status?"
        );
        if (isConfirmed) {
            get(route("transactions.index", dt), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    console.log("errors", errors);
                },
            });
        }
    };

    const handleFilter = (e) => {
        setFilterData(e.target.value);
        setFilterValue(e.target.value);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Transactions
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                            <InputLabel htmlFor="filter" value="Filter" />
                            <SelectInput
                                id="filter"
                                value={filterData}
                                selected={filterData}
                                onChange={(e) => handleFilter(e)}
                                options={[
                                    { value: "", label: "Select Filter" },
                                    { value: "all", label: "All" },
                                    { value: "addFund", label: "Add Fund" },
                                    { value: "withdrawal", label: "Withdraw" },
                                ]}
                                className="mt-1 block w-full"
                            />
                            <InputError
                                message={errors.gender}
                                className="mt-2"
                            />
                        </div>
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
                                            ScreenShot
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Remarks
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Balance
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                                    {transactions.data.map((transaction) => {
                                        const { data, setData, reset, errors } =
                                            useForm({
                                                id: transaction.id,
                                                status: transaction.status,
                                            });
                                        return (
                                            <tr key={transaction.id}>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 dark:text-gray-100">
                                                    {(i += 1)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    {transaction.created_at}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    {transaction.screenshot ??
                                                        "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    <div
                                                        style={{
                                                            width: "127px",
                                                        }}
                                                    >
                                                        <InputLabel
                                                            htmlFor="status"
                                                            value="Status"
                                                        />
                                                        <SelectInput
                                                            id="status"
                                                            value={data.status}
                                                            selected={
                                                                data.status
                                                            }
                                                            onChange={(e) =>
                                                                handleSubmit(
                                                                    e,
                                                                    transaction.id,
                                                                    setData(
                                                                        "status",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            options={[
                                                                {
                                                                    value: "",
                                                                    label: "Select Status",
                                                                },
                                                                {
                                                                    value: "cancelled",
                                                                    label: "Cancelled",
                                                                },
                                                                {
                                                                    value: "approve",
                                                                    label: "Approve",
                                                                },
                                                                {
                                                                    value: "disapprove",
                                                                    label: "Disapprove",
                                                                },
                                                                {
                                                                    value: "pending",
                                                                    label: "Pending",
                                                                },
                                                            ]}
                                                            className={data.status+" mt-1 block w-full"}
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.status
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    {transaction.type}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    {transaction.description ??
                                                        "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    {transaction.amount ?? "0"}{" "}
                                                    INR
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    {transaction.remaining_amount ??
                                                        "0"}{" "}
                                                    INR
                                                </td>
                                                <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                    <Link
                                                        href={route(
                                                            "transactions.edit",
                                                            transaction.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <FaPen />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                transaction.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                {transactions.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        className={`mr-2 px-4 py-2 border rounded-lg ${
                                            link.active
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-gray-700"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
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
