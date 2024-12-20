import React, { useState } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import useConfirm from "@/Components/ConfirmDialog";
import PrimaryButton from "@/Components/PrimaryButton";
import { FaPen } from "react-icons/fa";
import Table from "@/Components/Table";


import Modal from "@/Components/Modal/Modal";
import ModalBody from "@/Components/Modal/ModalBody";
import ModalTitle from "@/Components/Modal/ModalTitle";
import { Transition } from "@headlessui/react";
import ModalFooter from "@/Components/Modal/ModalFooter";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";
import { FaDollarSign } from "react-icons/fa";
import TextInput from "@/Components/TextInput";
import UseSearch from "@/CustomHook/UseSearch";
import { useEffect } from "react";

const Order = ({ auth }) => {
    const { orders } = usePage().props;
    const confirm = useConfirm();
    let i = 0;
    const { post,errors,data, setData, processing, recentlySuccessful,reset } = useForm({
        selling_amount:0,
        sell_price:'',
        id:''
    });

    const [statusModelData, setStatusModelData] = useState({
        selling_amount: "",
        remark: "",
    });
    const [profitLossData, setprofitLossData] = useState({
        status: "",
        amount: "",
    });
 
    useEffect(() => {
        if (statusModelData && data && statusModelData.amount && data.selling_amount) {
            setprofitLossData((prevData) => {
                const amount1 = Number(statusModelData.amount);
                const amount2 = Number(data.selling_amount);
                
                console.log(amount1, amount2, amount1 < amount2);
                
                let plStatus = amount1 < amount2 ? "profit" : "loss";
                let plAmount = Math.abs(amount2 - amount1);
                
                return {
                    ...prevData,
                    amount: plAmount,
                    status: plStatus,
                };
            });
        }
    }, [data, statusModelData]);
    
    
    const [showModal, setShowModal] = useState(false);

    const openStatusModal = (orders) => {
        setStatusModelData(orders);
        setData((prevData) => {
            return { ...prevData, id: orders.id, sell_price: orders.sell_price, selling_amount: orders.selling_amount };
        });
        
        setShowModal(true);
    };
    const statusModalClose = () => {
        setShowModal(false);
        console.log(data);
    };
    const handleSubmit = async (order) => {
        const isConfirmed = await confirm(
            `Are you sure you want to sell the order of (Customer:- ${order.user.name})? This action
            is irreversible.`
        );
        if (isConfirmed) {
            
            post(route("orderSell", { id:order.id, selling_amount:data.selling_amount }), {
                preserveScroll: true,
                onError: (errors) => {
                    reset();
                    Swal.fire("Error", "Error updating order", "error");

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

    const columns =[
        { key:'id', label:'Id'},
        { key:'date', label:'Date'},
        { key:'customer_name', label:'Customer Name', render:(item)=>{
            return item.user.name ?? "-";
        }},
        { key:'status', label:'Status', render:(item)=>{
            return(
                <span
                        className={`${
                            "bg-" + item.status
                        } badge  mt-1 block w-full `}

                        data-toggle="tooltip" data-placement="top" title="Update Order Status"
                    >
                        {item.status}
                </span>
            );
        }},
        { key:'currency', label:'Currency'},
        { key:'price', label:'Buy Price'},
        { key:'qty', label:'Qty'},
        { key:'amount', label:'Total Amount'},
        { key:'sell_price', label:'Sell Price'},
        { key:'selling_amount', label:'Selling Amount'},
        { key:'profit_loss_status', label:'Profit/loss Status', render:(item)=>{
            return(
                <span
                        className={`${
                            "bg-" + item.profit_loss_status
                        } badge  mt-1 block w-full `}

                        data-toggle="tooltip" data-placement="top" title="Update Order type sell/buy"
                    >
                        {item.profit_loss_status}
                    </span>
            );
        }},
        { key:'profit_loss_amount', label:'Profit/loss Amount'},
        { key:'type', label:'Type', render:(item)=>{
            return(
                <Link
                        onClick={(e) => {
                            e.preventDefault();
                            // !['profit','loss','completed','sell'].includes(item.type) &&
                            //     openStatusModal(item);
                            openStatusModal(item);
                        }}
                        className={`${
                            "bg-" + item.type
                        } badge  mt-1 block w-full `}

                        data-toggle="tooltip" data-placement="top" title="Update Order type sell/buy"
                    >
                        {item.type}
                    </Link>
            );
        }},
        { key:'actions', label:'Actions', render:(order)=>{
            return(
                <div>
                    <Link
                        href={order.type == 'buy' && route("orders.edit", order.id)}
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
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Orders</h2>}
            headTitle="Orders"
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex p-6 bg-white  border-b border-gray-200 ">
                        
                        <UseSearch action={route("orders.index")} />
                        <div className="mt-4 text-gray-900 ">
                            <PrimaryButton>
                                <Link href={route("orders.create")}>
                                    Add Order
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <Table columns={columns} data={orders.data} paginate={orders} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                maxWidth="sm"
                show={showModal}
                onClose={statusModalClose}
            >
                <ModalBody icon={<FaDollarSign />}>
                    <ModalTitle title="Sell Ordered" />
                    <div className="p-6 text-gray-900 ">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(statusModelData);
                            }}
                        >
                            <div>
                                <InputLabel htmlFor="buy_amount" className="mb-2" value="Buying Amount" />
                                <TextInput type="text" value={statusModelData.amount || ''}  placeholer="Enter selling amount" min='0' readOnly/>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="sell_price" className="mb-2" value="Selling Price" />
                                <TextInput type="text" value={data.sell_price || ''} onChange={(e)=>setData('sell_price',e.target.value)}  placeholer="Enter selling Price" min='0'/>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="selling_amount" className="mb-2" value="Selling Amount" />
                                <TextInput type="text" value={data.selling_amount || ''} onChange={(e)=>setData('selling_amount',e.target.value)}  placeholer="Enter selling amount" min='0'/>
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div>
                                <div className={`${"bg-" + profitLossData.status } badge  mt-2 block`} style={{marginRight: "44px",padding: "11px"}}>
                                    <p>
                                        <span className="text-white">{profitLossData.status}: </span>
                                        <span className="text-white">{profitLossData.amount}</span>
                                    </p>
                                </div>
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
        </AuthenticatedLayout>
    );
};

export default Order;
