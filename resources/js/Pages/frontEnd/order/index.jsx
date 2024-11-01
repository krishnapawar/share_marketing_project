import { Head } from "@inertiajs/react";
import Footer from "../partials/Footer";

import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import styles from "./Order.module.css";
import OrderComponent from "./OrderComponent";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import { io } from 'socket.io-client';
// import PrimaryButton from '@/Components/PrimaryButton';
// import { Transition } from '@headlessui/react';
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
// import SelectInput from '@/Components/SelectInput';
import ImageCarousel from "@/Components/ImageCarousel";
import { useEffect } from "react";
import Swal from 'sweetalert2';

export default function FrontEndOrder({ auth, laravelVersion, phpVersion }) {
    const [orderList, setOrderList] = useState([]);
    const [order, setOrder] = useState({});
    const [tableNo, setTableNo] = useState(0);
    const [hiddeShow, setHiddeShow] = useState(false);

    // New user input states
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const { categories } = usePage().props;
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name:"",
            phone:"",
            address:"",
            area_code:"",
            table:"",
            items:"",
            grandTotal:"",
            time:"",
        });

    const { flash } = usePage().props;
    useEffect(()=>{
        if(flash.success){
            Swal.fire("Success", flash.success, "success");
        }
        if(flash.error){
            Swal.fire("Success", flash.error, "error");
        }        
    },[flash]);
    // const socket = io('http://localhost:8080'); // Connect to the Socket.IO server

    const addItem = (id, qty,itm) => {
        const newList = [...orderList];
        const existingItem = newList.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity += qty;
            existingItem.totalPrice += qty * itm?.price;
        } else {
            newList.push({ id, quantity: qty, totalPrice: qty * itm?.price, data: itm});
        }
        setOrderList(newList);
    };
    const removeItem = (id, qty=1,itm) => {
        const newList = [...orderList];
        const existingItem = newList.find((item) => item.id === id);
        if (existingItem && existingItem.quantity >0) {
            existingItem.quantity -= qty;
            existingItem.totalPrice -= qty * itm?.price;
        } else {
            newList.push({ id, quantity: 0, totalPrice: 0, data: null});
        }
        setOrderList(newList);
    };

    const deleteItem = (index) => {
        const newList = orderList.filter((_, i) => i !== index);
        setOrderList(newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate user inputs
        if (!name || !phone || !address) {
            alert("Please fill in all the User Information fields");
            return;
        }

        
        // socket.emit('newOrder', orderData); // Send the order to the server
        // alert('Order sent to the kitchen!');

        // Inertia POST request to the server
        // Inertia.post('/orders', orderData, {
        //   onSuccess: () => {
        //     setOrderList([]);
        //     setName('');
        //     setPhone('');
        //     setAddress('');
        //     setAreaCode('');
        //   },
        // });

        

        post(route("ginninFilerWorkStore"), {
            preserveScroll: true,
            onSuccess: () => {
                
            },
            onError: (errors) => {
                console.log("errors", errors);
            },
        });
    };

    useEffect(()=>{
        const orderData = {
            name,
            phone,
            address,
            area_code: areaCode,
            table: tableNo,
            items: orderList,
            totalQuantity: orderList.reduce((acc, item) => acc + Number(item.quantity), 0),
            grandTotal: orderList.reduce((acc, item) => acc + Number(item.totalPrice), 0),
            time: new Date().toLocaleTimeString(),
        };
        
        // Correctly update state using spread operator
        setData((prevData) => ({ ...prevData, ...orderData }));
    },[hiddeShow]);

    const exportPDF = () => {
        if (orderList.length === 0) {
            alert("No orders to export!");
            return;
        }

        const doc = new jsPDF();
        doc.setFont("helvetica");
        doc.setFontSize(12);

        doc.text("Order List", 20, 20);

        const headers = [["#", "Name", "Quantity"]];
        const tableRows = orderList.map((item, index) => [
            index + 1,
            categories[item.id].name,
            item.quantity,
        ]);

        doc.autoTable({
            head: headers,
            body: tableRows,
            startY: 30,
            theme: "grid",
            headStyles: {
                fillColor: [255, 190, 118],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            bodyStyles: {
                fontSize: 10,
            },
        });

        doc.save("order-list.pdf");
    };
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 ">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="app-container container mx-auto p-4">
                        <header>
                            <h1>
                                <i
                                    className="fa-solid fa-fire"
                                    aria-hidden="true"
                                ></i>{" "}
                                GINNI Fire Works
                            </h1>
                        </header>
                        <div className="relative text-white py-6 px-4 rounded-lg shadow-lg mb-6">
                            <ImageCarousel
                                images={[
                                    "./banner.jpg",
                                    "./banner1.png",
                                    "./banner2.png",
                                ]}
                            />
                        </div>

                        <main className="row">
                            {hiddeShow ? (
                                <div className="col-md-6">
                                    <OrderComponent
                                        orderList={orderList}
                                        categories={categories}
                                        deleteItem={deleteItem}
                                        exportPDF={exportPDF}
                                        tableNo={tableNo}
                                        handleSubmit={handleSubmit}
                                        setHiddeShow={setHiddeShow}
                                        dataInfo={{
                                            name,
                                            phone,
                                            address,
                                            areaCode,
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="col-md-6">
                                    <section id="categories">
                                        <div id="userInFo">
                                            <h2>User Information</h2>

                                            <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6 text-gray-900 ">
                                                    <div>
                                                        <InputLabel
                                                            htmlFor="name"
                                                            value="Name"
                                                        />
                                                        <TextInput
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) =>
                                                                setName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                            id="name"
                                                            className="mt-1 block w-full"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.date
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div>
                                                        <InputLabel
                                                            htmlFor="phone"
                                                            value="Phone"
                                                        />
                                                        <TextInput
                                                            id="phone"
                                                            value={phone}
                                                            onChange={(e) =>
                                                                setPhone(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.currency
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <InputLabel
                                                            htmlFor="address"
                                                            value="Address"
                                                        />
                                                        <TextInput
                                                            id="address"
                                                            value={address}
                                                            onChange={(e) =>
                                                                setAddress(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                            min="0"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.address
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    {/* <div>
                                                        <InputLabel
                                                            htmlFor="areaCode"
                                                            value="Area Code"
                                                        />
                                                        <TextInput
                                                            id="areaCode"
                                                            value={areaCode}
                                                            onChange={(e) =>
                                                                setAreaCode(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                            min="0"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.areaCode
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2>Menu</h2>
                                        </div>
                                        <div
                                            className={
                                                styles.menuItem +
                                                " p-4 mb-4 bg-white rounded shadow-lg"
                                            }
                                            style={{ color: "black" }}
                                        >
                                            <ul
                                                className="flex items-center justify-between space-x-4"
                                                style={{
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                }}
                                            >
                                                {/* Item Name Name */}
                                                <li className="flex-1">
                                                    <p
                                                        className={
                                                            styles.foodName
                                                        }
                                                    >
                                                        Item Name
                                                    </p>
                                                </li>

                                                {/* Price */}
                                                <li className="flex-1">
                                                    <p className={styles.price}>
                                                        Price
                                                    </p>
                                                </li>

                                                {/* Quantity */}
                                                <li className="flex-1">
                                                    <p className={styles.price}>
                                                        Quantity
                                                    </p>
                                                </li>

                                                {/* Input and Add Button */}
                                                <li className="flex-1 flex items-center">
                                                    <p className={styles.price}>
                                                        Action
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        {categories.map((item, index) => (
                                            <div
                                                className={
                                                    styles.menuItem +
                                                    " p-4 mb-4 bg-white rounded shadow-lg"
                                                }
                                                key={index}
                                            >
                                                <ul
                                                    className="flex items-center justify-between space-x-4"
                                                    style={{
                                                        maxWidth: "100%",
                                                        width: "100%",
                                                        color:"black"
                                                    }}
                                                >
                                                    {/* Food Name */}
                                                    <li className="flex-1">
                                                        <p
                                                            className={
                                                                styles.foodName
                                                            }
                                                        >
                                                            {item.name}
                                                        </p>
                                                    </li>

                                                    {/* Price */}
                                                    <li className="flex-1">
                                                        <p
                                                            className={
                                                                styles.price
                                                            }
                                                        >
                                                            {item.price === 0
                                                                ? "Free"
                                                                : "Rs:- " +
                                                                  item.price}
                                                        </p>
                                                    </li>

                                                    {/* Quantity */}
                                                    <li className="flex-1">
                                                        <p
                                                            className={
                                                                styles.price
                                                            }
                                                        >
                                                            {orderList.find((it) => it.id === item.id)?.quantity ?? 0}
                                                        </p>
                                                    </li>

                                                    {/* Input and Add Button */}
                                                    <li className="flex-1 flex items-center justify-end">
                                                        <input
                                                            className="qty hidden"
                                                            type="number"
                                                            defaultValue={1}
                                                            min="1"
                                                            max="100"
                                                        />
                                                        <button
                                                            className={
                                                                styles.addBtn +
                                                                " ml-4"
                                                            } // Adjust spacing here
                                                            onClick={(e) =>
                                                                addItem(
                                                                    item.id,
                                                                    Number(
                                                                        e.target
                                                                            .previousSibling
                                                                            .value
                                                                    )
                                                                    ,item
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            className={
                                                                styles.addBtn +
                                                                " ml-4"
                                                            } // Adjust spacing here
                                                            onClick={(e) =>
                                                                removeItem(
                                                                    item.id,
                                                                    Number(1)
                                                                    ,item
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                        <div
                                            className={
                                                styles.menuItem +
                                                " p-4 mb-4 bg-white rounded shadow-lg"
                                            }
                                            style={{ color: "black" }}
                                        >
                                            <ul
                                                className="flex items-center justify-between space-x-4"
                                                style={{
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                }}
                                            >
                                                {/* Item Name Name */}
                                                <li className="flex-1"></li>
                                                <li className="flex-1"></li>
                                                <li className="flex-1">
                                                    Total Price:- {orderList.reduce((acc, item) => acc + Number(item.totalPrice), 0)}
                                                </li>

                                                <li>
                                                    <button
                                                        className={
                                                            styles.addBtn +
                                                            " ml-4"
                                                        } // Adjust spacing here
                                                        onClick={(e) => {
                                                            if (
                                                                orderList.length >
                                                                    0 &&
                                                                name &&
                                                                phone &&
                                                                address
                                                            ) {
                                                                setHiddeShow(
                                                                    true
                                                                ); // Show next section if conditions are met
                                                            } else {
                                                                handleSubmit(e); // Submit form if conditions are not met
                                                            }
                                                        }}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
