import React, { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import useConfirm from "@/Components/ConfirmDialog";
import { FaEye, FaLock, FaPen, FaPlus, FaRedo, FaTrash } from "react-icons/fa";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";

import Modal from "@/Components/Modal/Modal";
import ModalBody from "@/Components/Modal/ModalBody";
import ModalTitle from "@/Components/Modal/ModalTitle";
import { Transition } from "@headlessui/react";
import ModalFooter from "@/Components/Modal/ModalFooter";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";
import { FaDollarSign } from "react-icons/fa";
import NewModel from "@/Components/Modal";
const Index = ({ auth }) => {
    const { transactions, users, user_id,categories } = usePage().props;

    const [filterValue, setFilterValue] = useState("");
    const [userId, setUserId] = useState(user_id);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [transactionFile, setTransactionFile] = useState("");
    const [transactionFileModel, setTransactionFileModel] = useState(false);
    const [userOptions, setUserOptions] = useState([]);
    const confirm = useConfirm();
    const { delete: destroy, get, post, reset, errors, data, setData, processing,recentlySuccessful } = useForm();

    // Prepare user options for select input


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

    // const handleDelete = async (id) => {
    //     const isConfirmed = await confirm(
    //         "Are you sure you want to delete this Transaction?"
    //     );
    //     if (isConfirmed) {
    //         destroy(route("transactions.destroy", id), {
    //             preserveScroll: true,
    //         });
    //     }
    // };


    const [statusModelData, setStatusModelData] = useState({
        status: "",
        remark: "",
    });
    const [showModal, setShowModal] = useState(false);

    const openStatusModal = (transaction) => {
        setStatusModelData(transaction);
        setData("status", transaction.status);
        setShowModal(true);
    };
    const statusModalClose = () => {
        setShowModal(false);
    };
    const handleSubmit = async (transaction) => {
        const isConfirmed = await confirm(
            `Are you sure you want to ${data.status} the transaction (Customer:- ${transaction.user.name})? This action
            is irreversible.`
        );
        if (isConfirmed) {
            post(route("transactions.updateStatus", { id:transaction.id, status:data.status }), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    Swal.fire("Error", "Error updating transaction", "error");

                    console.log("errors", errors);
                },
                onSuccess: (result) => {
                    setShowModal(false);
                    reset();
                    Swal.fire("Success", result.success, "success");
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
    const transactionFileModelToggle = (file)=>{
        console.log("ooo");
        setTransactionFileModel(!transactionFileModel);
        setTransactionFile(file)
    }

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'file',
            label: 'Image',
            render: (transaction) =>{
                return(
                transaction.file ?
                <span onClick={()=>transactionFileModelToggle(transaction.file.name)}>
                    <img
                        src={transaction.file ? transaction.file.name : "-"}
                        alt="Screenshot"
                    />
                </span>:'-'
            );}
        },
        { key: 'created_at', label: 'Date' },
        { key: 'name', label: 'Category Name'},
        { key: 'price', label: 'Price'},
        // {
        //     key: 'status',
        //     label: 'Status',
        //     render: (transaction) => (
        //         <Link
        //                 onClick={(e) => {
        //                     e.preventDefault();
        //                     transaction.status != "approved" &&
        //                         openStatusModal(transaction);
        //                 }}
        //                 className={`${
        //                     "bg-" + transaction.status
        //                 } badge  mt-1 block w-full width-100`}

        //                 data-toggle="tooltip" data-placement="top" title="Update Transaction Status"
        //             >
        //                 {transaction.status}
        //             </Link>
        //     ),
        // },
        { key: 'description', label: 'Description' },
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
                        href={route("categories.edit", item.id)}
                        className="text-indigo-600 hover:text-indigo-900 mt-2"
                        data-toggle="tooltip" data-placement="top" title="Edit Customer"
                    >
                        <FaPen />
                    </Link>
                    <Link
                        // href={route("customers.show", item.id)}
                        className="text-indigo-600 hover:text-indigo-900 mt-2 mr-4"
                        data-toggle="tooltip" data-placement="top" title="View Customer"
                    >
                        <FaEye />
                    </Link>
                    
                </div>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                        Categories
                    </h2>
    
                    
                </div>
            }
            headTitle="Categories"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex p-6 bg-white  border-b border-gray-200 ">
                            {/* <div>
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
                            </div> */}
                            <div className="ml-4">
                            {/* Create Button */}
                            <Link
                                href={route('categories.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition"
                            >
                                <FaPlus className="mr-2" /> Create Category
                            </Link>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900 ">

                            <Table columns={columns} data={categories.data} paginate={categories}/>

                        </div>
                    </div>
                </div>
            </div>

            <Modal
                maxWidth="sm"
                show={showModal}
                onClose={statusModalClose}
            >
                <ModalBody icon=''>
                    <ModalTitle title="Update Transaction Status" />
                    <div className="p-6 text-gray-900 ">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(statusModelData);
                            }}
                        >
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput
                                    id="status"
                                    value={data.status || ''}
                                    onChange={(e) => setData('status', e.target.value)}
                                    options={[
                                        { value: '', label: 'Select Status' },
                                        { value: 'cancelled', label: 'Cancelled' },
                                        { value: 'approved', label: 'Approved' },
                                        { value: 'pending', label: 'Pending' },
                                    ]}
                                    className={data.status+" mt-1 block w-full"}
                                />
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <ModalFooter>
                                <div className="flex items-center gap-4 mt-4">
                                    <SecondaryButton
                                        type="button"
                                        disabled={processing}
                                        onClick={statusModalClose}
                                    >
                                        Close
                                    </SecondaryButton>
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Save
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 ">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </ModalFooter>
                        </form>
                    </div>
                </ModalBody>
            </Modal>

            <NewModel
                maxWidth="xl"
                show={transactionFileModel}
                onClose={transactionFileModelToggle}
            >
                <img
                        src={transactionFile ?? "-"}
                        alt="Screenshot"
                    />
            </NewModel>
        </AuthenticatedLayout>
    );
};

export default Index;

