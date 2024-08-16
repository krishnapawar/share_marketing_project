import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import useConfirm from "@/Components/ConfirmDialog";
import { FaRedo } from "react-icons/fa";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";

const Transaction = ({ auth }) => {
    const { transactions, users, user_id } = usePage().props;
    const [filterValue, setFilterValue] = useState("");
    const [userId, setUserId] = useState(user_id);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [userOptions, setUserOptions] = useState([]);
    const confirm = useConfirm();
    const { delete: destroy, get, post, reset, errors, setData } = useForm();

    // Prepare user options for select input
    useEffect(() => {
        const usersData = users.map((item) => ({
            value: item.id,
            label: item.name,
        }));
        setUserOptions(usersData);
    }, [users]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filter = queryParams.get("filter");
        if (filter) {
            setFilterValue(filter);
        }
        if (userId) {
            setUserId(userId);
        }
    }, []);

    useEffect(() => {
        if (shouldFetch) {
            const fetchTransactions = async () => {
                try {
                    await get(
                        route("transactions.index", {
                            filter: filterValue,
                            userId: userId,
                        }),
                        {
                            preserveScroll: true,
                            onError: (errors) => {
                                reset();
                                console.log("errors", errors);
                            },
                        }
                    );
                } catch (error) {
                    console.error(error);
                } finally {
                    setShouldFetch(false);
                }
            };

            fetchTransactions();
        }
    }, [shouldFetch, filterValue, userId, get, reset]);

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

    const handleSubmit = async (e, id, setData) => {
        e.preventDefault();
        let status = e.target.value;
        setData("status", status);
        const isConfirmed = await confirm(
            `Are you sure you want to change the transaction status to "${status}"? This action is irreversible.`
        );
        if (isConfirmed) {
            post(route("transactions.updateStatus", { id, status: status }), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    console.log("errors", errors);
                },
                onSuccess: (result) => {
                    console.log("result", result);
                    // toast.success('Transaction status updated successfully.');
                },
            });
        }
    };

    const handleFilter = (filter) => {
        setFilterValue(filter);
        setShouldFetch(true);
    };

    const handleUserChange = (selectedOption) => {
        setUserId(selectedOption ? selectedOption.value : null);
        setShouldFetch(true);
    };

    const handleReset = () => {
        setFilterValue("");
        setUserId("");
        setShouldFetch(true);
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'created_at', label: 'Date' },
        { key: 'user.name', label: 'Customer Name', render:(data)=>{
            return data.user.name ?? '-';
        } },
        {
            key: 'file',
            label: 'ScreenShot',
            render: (transaction) =>
                transaction.type === "addFund" ? (
                    <img
                        src={transaction.file ? transaction.file.name : "-"}
                        alt="Screenshot"
                    />
                ) : (
                    "-"
                ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (transaction) => (
                <div style={{ width: "127px" }}>
                    <InputLabel htmlFor="status" value="Status" />
                    <SelectInput
                        id="status"
                        value={transaction.status}
                        onChange={(e) => handleSubmit(e, transaction.id, setData)}
                        options={[
                            { value: "", label: "Select Status" },
                            { value: "cancelled", label: "Cancelled" },
                            { value: "approve", label: "Approved" },
                            { value: "pending", label: "Pending" },
                        ]}
                        className={`${transaction.status}  mt-1 block w-full `}
                        readOnly={transaction.status=='approve' ? true:false}
                    />
                    <InputError message={errors.status} className="mt-2" />
                </div>
            ),
        },
        { key: 'type', label: 'Type', render: (transaction) => <span  className={transaction.type}>{transaction.type}</span> },
        { key: 'description', label: 'Remarks' },
        { key: 'amount', label: 'Amount', render: (transaction) => `${transaction.amount ?? "0"} INR` },
        { key: 'remaining_amount', label: 'Balance', render: (transaction) => `${transaction.remaining_amount ?? "0"} INR` },
    ];

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
                        <div className="flex p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                            <div>
                                <InputLabel htmlFor="filter" value="Filter" />
                                <SelectInput
                                    id="filter"
                                    value={filterValue}
                                    onChange={(e) => handleFilter(e.target.value)}
                                    options={[
                                        { value: "", label: "Select Filter" },
                                        { value: "all", label: "All" },
                                        { value: "addFund", label: "Add Fund" },
                                        { value: "withdrawal", label: "Withdraw" },
                                    ]}
                                    className="mt-1 block w-full"
                                    style={{    height: "38px"}}
                                />
                                <InputError message={errors.filter} className="mt-2" />
                            </div>
                            <div className="ml-4">
                                <InputLabel htmlFor="user_id" value="User" />
                                <Select
                                    id="user_id"
                                    value={userOptions.find((option) => option.value == userId)}
                                    onChange={handleUserChange}
                                    options={userOptions}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.user_id} className="mt-2" />
                            </div>
                            <div className="ml-4">
                                <PrimaryButton onClick={handleReset} className="mt-6">
                                    <FaRedo className="mr-2" />
                                </PrimaryButton>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <Table columns={columns} data={transactions.data} paginate={transactions}/>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Transaction;
