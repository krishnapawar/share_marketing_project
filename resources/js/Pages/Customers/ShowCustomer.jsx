import React from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Transition } from '@headlessui/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SmallCard from "@/Components/SmallCard";
import { FaPen,FaDollarSign } from "react-icons/fa";

import { useState } from "react";
import useConfirm from "@/Components/ConfirmDialog";

import Modal from "@/Components/Modal/Modal";
import ModalBody from "@/Components/Modal/ModalBody";
import ModalTitle from "@/Components/Modal/ModalTitle";
import ModalFooter from "@/Components/Modal/ModalFooter";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";
import Button from "@/Components/Button/Button";

const ShowCustomer = ({ auth }) => {
    const { customer } = usePage().props;

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        balance: customer.wallet?.total_balance ?? 0,
        loan: customer.wallet?.loan ?? 0,
        id:customer.id ?? 0
    });

    const confirm = useConfirm();
   

    const [statusModelData, setStatusModelData] = useState({
        selling_amount: "",
        remark: "",
    });
    const [showModal, setShowModal] = useState(false);

    const openStatusModal = (customerSet) => {
        setStatusModelData(customerSet);
        setData('id',customer.id);
        setData('loan',customerSet.loan);
        setData('balance',customerSet.total_balance);
        if(data){
            setShowModal(true);
        }
        
    };
    const statusModalClose = () => {
        setShowModal(false);
    };
    const handleSubmit = async (customerSet) => {
       // Ensure 'id' is set right before submitting
        const isConfirmed = await confirm(
            `Are you sure you want to edit wallet of (Customer:- ${customerSet.name})? This action
            is irreversible.`
        );
        if (isConfirmed) {
            
            post(route("updateWallet"), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    Swal.fire("Error", "Error updating wallet", "error");

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

    const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Customer Details</h2>
            }
            headTitle="Customers"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Customer Information Section */}
                            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-36 h-36 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                                        src={customer?.file?.name || placeholderImage}
                                        alt={customer.name}
                                    />
                                </div>
                                <div>
                                <span className="flex flex-wrap gap-4">
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{customer.name}
                                        
                                    </h3>
                                    <Link 
                                        href={route("customers.edit", customer.id)}
                                    >
                                        <FaPen style={{color:"#3498db"}}/>
                                    </Link>
                                    </span>
                                    <p className="text-gray-600 dark:text-gray-400">{customer.email}</p>
                                    <p className="text-gray-600 dark:text-gray-400">{customer.mobile_number || 'N/A'}</p>
                                </div>
                                <div>
                                    
                                    
                                </div>
                                <div>
                                    <Button 
                                    className="bg-yellow-500"
                                        name="Edit Wallet" 
                                        onClick={()=>openStatusModal(customer.wallet)} 
                                    />
                                </div>
                            </div>

                            {/* Wallet Section */}
                            <div className="mt-8">
                                <div className="flex flex-wrap gap-4 p-4  p-6 text-gray-900 dark:text-gray-100">
                                    
                                <SmallCard
                                    title="Balance"
                                    value={`₹${customer.wallet?.total_balance ?? 0}`}
                                    icon="fa-wallet"
                                    bgColor="bg-yellow-500"
                                    textColor="text-black"
                                />
                                {/* <SmallCard
                                    title="Withdrawal"
                                    value={`₹${customer.wallet?.withdrawal ?? 0}`}
                                    icon="fa-rupee-sign"
                                    bgColor="bg-pink-500"
                                    textColor="text-white"
                                /> */}
                                <SmallCard
                                    title="Loan"
                                    value={`₹${customer.wallet?.loan ?? 0}`}
                                    icon="fa-credit-card"
                                    bgColor="bg-purple-500"
                                    textColor="text-white"
                                />
                                <SmallCard
                                    title="Total Profit"
                                    value={`₹${customer.wallet?.profit ?? 0}`}
                                    icon="fa-rupee-sign"
                                    bgColor="bg-green-500"
                                    textColor="text-white"
                                />
                                <SmallCard
                                    title="Loss"
                                    value={`₹${customer.wallet?.loss ?? 0}`}
                                    icon="fa-chart-line"
                                    bgColor="bg-red-500"
                                    textColor="text-white"
                                />
                                </div>
                            </div>

                            {/* Customer Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                                    <strong className="block text-sm font-medium text-gray-600 dark:text-gray-400">Date of Birth:</strong>
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{customer.dob || 'N/A'}</span>
                                </div>
                                <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                                    <strong className="block text-sm font-medium text-gray-600 dark:text-gray-400">Gender:</strong>
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        {customer.gender === 'M' ? 'Male' : customer.gender === 'F' ? 'Female' : 'Other'}
                                    </span>
                                </div>
                                <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                                    <strong className="block text-sm font-medium text-gray-600 dark:text-gray-400">Aadhar Number:</strong>
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{customer.aadhar_number || 'N/A'}</span>
                                </div>
                                <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                                    <strong className="block text-sm font-medium text-gray-600 dark:text-gray-400">Pancard Number:</strong>
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{customer.pancard_number || 'N/A'}</span>
                                </div>
                                <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                                    <strong className="block text-sm font-medium text-gray-600 dark:text-gray-400">Alternate Mobile Number:</strong>
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{customer.alternate_mobile_number || 'N/A'}</span>
                                </div>
                                <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                                    <strong className="block text-sm font-medium text-gray-600 dark:text-gray-400">Address:</strong>
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{customer.address || 'N/A'}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* mode for add amount */}

            <Modal
                maxWidth="sm"
                show={showModal}
                onClose={statusModalClose}
            >
                <ModalBody icon={<FaDollarSign />}>
                    <ModalTitle title="Edit Wallet" />
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(statusModelData);
                            }}
                        >
                            <div>
                                <InputLabel htmlFor="balance" className="mb-2" value="Balance Amount" />
                                <TextInput type="text" value={data.balance || '' } onChange={(e)=>setData('balance',e.target.value)} placeholer="Enter balance amount" min='0'/>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="loan" className="mb-2" value="Loan Amount" />
                                <TextInput type="text" value={data.loan || '' } onChange={(e)=>setData('loan',e.target.value)}  placeholer="Enter loan amount" min='0'/>
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
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </ModalFooter>
                        </form>
                    </div>
                </ModalBody>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default ShowCustomer;
