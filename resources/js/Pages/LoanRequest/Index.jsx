import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link, useForm } from "@inertiajs/react";
import Table from "@/Components/Table";
import useConfirm from "@/Components/ConfirmDialog";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";

import Modal from "@/Components/Modal/Modal";
import ModalBody from "@/Components/Modal/ModalBody";
import ModalTitle from "@/Components/Modal/ModalTitle";
import { Transition } from "@headlessui/react";
import ModalFooter from "@/Components/Modal/ModalFooter";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";
import { FaDollarSign } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import UseSearch from "@/CustomHook/UseSearch";

const Index = ({ auth }) => {
    const { loanRequests } = usePage().props;

    const confirm = useConfirm();
    const {
        delete: destroy,
        get,
        post,
        put,
        reset,
        errors,
        data,
        setData,
        processing,
        recentlySuccessful,
    } = useForm({
        status: "",
        remark: "",
    });
    const [approvedLoanModelData, setApprovedLoanModelData] = useState({
        status: "",
        remark: "",
    });
    const [showModal, setShowModal] = useState(false);

    const approvedLoanStatusModal = (loanRequest) => {
        setApprovedLoanModelData(loanRequest);
        setData("remark", loanRequest.remark);
        setData("status", loanRequest.status);
        setShowModal(true);
    };
    const approvedLoanStatusModalClose = () => {
        setShowModal(false);
    };
    const approvedLoanStatusSubmit = async (loanRequest) => {
        const isConfirmed = await confirm(
            `Are you sure you want to ${data.status} the Loan Request (Customer:- ${loanRequest.user.name ?? '-'})? This action
            is irreversible.`
        );
        if (isConfirmed) {
            put(route("loanRequest.update", loanRequest.id), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    Swal.fire("Error", "Error updating loan request", "error");

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
    const columns = [
        { label: "ID", key: "id" },
        {
            label: "CreatedAt",
            key: "created_at",
            render: (loanRequest) => {
                return new Date(loanRequest.created_at).toLocaleString();
            },
        },
        {
            label: "Customer Name",
            render: (data) => {
                return data.user.name ?? "-";
            },
        },
        {
            label: "Remark",
            render: (data) => {
                return data.remark ?? "-";
            },
        },
        {
            label: "Status",
            key: "status",
            render: (loanRequest) => {
                return (
                    <Link
                        onClick={(e) => {
                            e.preventDefault();
                            loanRequest.status != "approved" &&
                                approvedLoanStatusModal(loanRequest);
                        }}
                        className={`${
                            "bg-" + loanRequest.status
                        } badge  mt-1 block w-full `}
                        data-toggle="tooltip" data-placement="top" title="Update Loan Request Status"
                    >
                        {loanRequest.status}
                    </Link>
                );
            },
        },
        { label: "Amount", key: "amount" },
        // { label: 'Interest Rate', key: 'interest_rate' },
    ];
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Loan Request
                </h2>
            }
            headTitle="Loan Request"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                            <UseSearch action={route("loanRequest.index")} />
                        </div>
                        
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Table
                                columns={columns}
                                data={loanRequests.data}
                                paginate={loanRequests}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                maxWidth="sm"
                show={showModal}
                onClose={approvedLoanStatusModalClose}
            >
                <ModalBody icon={<FaDollarSign />}>
                    <ModalTitle title="Update Load Request" />
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                approvedLoanStatusSubmit(approvedLoanModelData);
                            }}
                        >
                            <div style={{ width: "250px" }}>
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput
                                    id="status"
                                    value={data.status || ""}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    options={[
                                        { value: "", label: "Select Status" },
                                        {
                                            value: "cancelled",
                                            label: "Cancelled",
                                        },
                                        {
                                            value: "approved",
                                            label: "Approved",
                                        },
                                        { value: "pending", label: "Pending" },
                                    ]}
                                    className={`${data.status}  mt-1 block w-full `}
                                />
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="remark" value="Remark" />
                                <textarea
                                    id="remark"
                                    value={data.remark || ""} // Ensure value is not null
                                    onChange={(e) =>
                                        setData("remark", e.target.value)
                                    }
                                    className="mt-1 block w-full form-control"
                                    placeholder="Remark"
                                >
                                    {data.remark || ""}
                                </textarea>
                                <InputError
                                    message={errors.remark}
                                    className="mt-2"
                                />
                            </div>
                            <ModalFooter>
                                <div className="flex items-center gap-4 mt-4">
                                    <SecondaryButton
                                        type="button"
                                        disabled={processing}
                                        onClick={approvedLoanStatusModalClose}
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

export default Index;
