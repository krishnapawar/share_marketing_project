import React, { useState } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import useConfirm from "@/Components/ConfirmDialog";
import { FaKey, FaLock, FaPen, FaTrash } from "react-icons/fa";
import Modal from "@/Components/Modal/Modal";
import ModalBody from "@/Components/Modal/ModalBody";
import ModalTitle from "@/Components/Modal/ModalTitle";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import ModalFooter from "@/Components/Modal/ModalFooter";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";

const CustomerList = ({ auth }) => {
    const { customers } = usePage().props;
    const { delete: destroy, post, data, setData, reset, errors, recentlySuccessful, processing } = useForm({
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

    const columns = [
        { key: 'id', label: 'ID', render: (item, index) => index + 1 },
        { key: 'customer_id', label: 'Customer Id' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'show_pass', label: 'Password' },
        { key: 'mobile_number', label: 'Mobile Number' },
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
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
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
                                />
                            </div>
                            <div className="mt-4">
                                {customers.links.map((link) => (
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
        </AuthenticatedLayout>
    );
};

export default CustomerList;
