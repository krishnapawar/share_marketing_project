import React, { useState } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import useConfirm from "@/Components/ConfirmDialog";
import { FaLock, FaPen, FaTrash, FaQuestionCircle } from "react-icons/fa";
import Modal from "@/Components/Modal/Modal";
import ModalBody from "@/Components/Modal/ModalBody";
import ModalTitle from "@/Components/Modal/ModalTitle";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import ModalFooter from "@/Components/Modal/ModalFooter";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";
import UseSearch from "@/CustomHook/UseSearch";


const CustomerList = ({ auth }) => {
    const { customers } = usePage().props;
    const { delete: destroy, get, post, put, data, setData, reset, errors, recentlySuccessful, processing } = useForm({
        password: '',
        password_confirmation: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [activeCustomer, setActiveCustomer] = useState(null); // Add state for the active customer
    const confirm = useConfirm();

    const handleDelete = async (id) => {
        const isConfirmed = await confirm(`Are you sure you want to delete this customer?`);
        if (isConfirmed) {
            destroy(route("customers.destroy", id), { preserveScroll: true });
        }
    };

    const submitPassword = async () => {
        if (!activeCustomer) return;

        const isConfirmed = await confirm(`Are you sure you want to reset the password for ${activeCustomer.name}?`);
        if (isConfirmed) {
            post(route("changePassword", activeCustomer.id), {
                preserveScroll: true,
                onSuccess: (success) => {
                    Swal.fire({
                        title: 'Success!',
                        text: success.message || 'Password updated successfully.',
                        icon: 'success'
                    });
                    setShowModal(false); // Close the modal on success
                },
                onFinish: () => reset('password', 'password_confirmation'),
            });
        }
    };

    const openChangePasswordModal = (customer) => {
        setActiveCustomer(customer);
        setShowModal(true);
    };

    const closeChangePasswordModal = () => {
        setShowModal(false);
        setActiveCustomer(null); // Reset active customer when closing modal
        reset('password', 'password_confirmation');
    };

    // account status functoinality

    const [statusModelData, setStatusModelData] = useState({
        status: "",
        remark: "",
    });
    const [StatusShowModal, setStatusShowModal] = useState(false);

    const openStatusModal = (userData) => {
        setStatusModelData(userData);
        setData("status", userData.status);
        setStatusShowModal(true);
    };
    const statusModalClose = () => {
        setStatusShowModal(false);
    };
    const handleSubmit = async (userData) => {
        const isConfirmed = await confirm(
            `Are you sure you want to ${data.status} ${userData.name}'s Account ?`
        );
        if (isConfirmed) {
            const payload= { id:userData.id, status:data.status };
            put(route("customers.update",userData.id,payload), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    Swal.fire("Error", "Error updating transaction", "error");

                    console.log("errors", errors);
                },
                onSuccess: (result) => {
                    setStatusShowModal(false);
                    reset();
                    Swal.fire("Success", result.success, "success");
                },
            });
        }
    };

    const columns = [
        { key: 'id', label: 'ID', render: (item, index) => index + 1 },
        { key: 'customer_id', label: 'Customer Id' },
        { key: 'profile', label: 'Profile Img', render: (item) => (
            <img src={item.file?.name ?? 'https://placehold.co/600x400.png'} alt="profile" style={{ width: '50px',
                height: '50px',
                borderRadius: '50%' }} />

        )},
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'show_pass', label: 'Password' },
        { key: 'mobile_number', label: 'Mobile Number' },
        { key: 'pancard_number', label: 'Pancard Number' },
        { key: 'aadhar_number', label: 'Aadhar Number' },
        { key: 'status', label: 'Account Status', render: (item) => (
            <Link
                onClick={(e) => {
                    e.preventDefault(); openStatusModal(item);
                }}
                className={`${
                    "bg-" + item.status
                } badge  mt-1 block w-full width-100`}

                data-toggle="tooltip" data-placement="top" title="Update Account Request"
            >
                {item.status}
            </Link>
        ) },
        {
            key: 'actions',
            label: 'Actions',
            render: (item) => (
                <div className="flex">
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                        data-toggle="tooltip" data-placement="top" title="Delete Customer"
                    >
                        <FaTrash />
                    </button>
                    <Link
                        href={route("customers.edit", item.id)}
                        className="text-indigo-600 hover:text-indigo-900 mt-2"
                        data-toggle="tooltip" data-placement="top" title="Edit Customer"
                    >
                        <FaPen />
                    </Link>
                    <button
                        onClick={() => openChangePasswordModal(item)}
                        className="text-indigo-600 hover:text-indigo-900 text-yellow-300 ml-2"
                        data-toggle="tooltip" data-placement="top" title="Change Password"
                    >
                        <FaLock />
                    </button>
                </div>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Customers
                </h2>
            }
            headTitle="Customers"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                        
                        <UseSearch action={route("customers.index")} />
                        
                        <div className="mt-4 text-gray-900 dark:text-gray-100">
                            <PrimaryButton>
                                <Link href={route("customers.create")}>
                                    Add Customer
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <Table
                                    columns={columns}
                                    data={customers.data}
                                    actions={false} // Set to true if you want to use default actions
                                    paginate={customers}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for changing password */}
            <Modal
                maxWidth='sm'
                show={showModal}
                onClose={closeChangePasswordModal}
            >
                <ModalBody
                    icon={<FaLock />}
                >
                    <ModalTitle title="Change Password" />
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form onSubmit={(e) => { e.preventDefault(); submitPassword(); }}>
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    type="password"
                                    placeholder="password"
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirmed Password" />
                                <TextInput
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    type="password"
                                    placeholder="password confirmation"
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <ModalFooter>
                                <div className="flex items-center gap-4 mt-4">
                                    <SecondaryButton type="button" disabled={processing} onClick={closeChangePasswordModal}>Close</SecondaryButton>
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <PrimaryButton type="submit" disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                                    </Transition>
                                </div>
                            </ModalFooter>
                        </form>
                    </div>
                </ModalBody>
            </Modal>

            {/* approved and canncelled account */}
            <Modal
                maxWidth="sm"
                show={StatusShowModal}
                onClose={statusModalClose}
            >
                <ModalBody icon={<FaQuestionCircle />}>
                    <ModalTitle title="Update Account Status" />
                    <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                        { value: 'actived', label: 'Actived' },
                                        { value: 'deactived', label: 'Deactived' },
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

export default CustomerList;
