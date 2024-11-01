import React from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import autoTable for table formatting in the PDF

const OrderDetail = ({ auth }) => {
    const { orderDetail } = usePage().props; // Fetching orderDetail data from backend
    let orderDetails = [];
    orderDetails.push(orderDetail);

    const columnsDetail = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Item Name', render: (item) => item.data.name },
        { key: 'description', label: 'Description', render: (item) => item.data.description },
        {
            key: 'created_at', label: 'Order Date', render: (item) => {
                const date = new Date(item.created_at);
                return date.toLocaleDateString('en-CA'); // 'en-CA' gives you YYYY-MM-DD format
            }
        },
        { key: 'price', label: 'Price', render: (item) => item.data.price ?? ""},
        { key: 'quantity', label: 'Quantity', render: (item) => item.quantity },
        { key: 'totalPrice', label: 'Total Price (Rs)', render: (item) => item.totalPrice + " Rs" },
    ];

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', render: (item) => item.items.name },
        { key: 'phone', label: 'Phone', render: (item) => item.items.phone },
        { key: 'address', label: 'Address', render: (item) => item.items.address },
        { key: 'price', label: 'Price', render: (item) => item.items.data.price ?? '' },
        { key: 'quantity', label: 'Quantity', render: (item) => item.items.totalQuantity },
        { key: 'grandTotal', label: 'Total Price (Rs)', render: (item) => item.items.grandTotal + " Rs" },
    ];

    // PDF Download function
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica");
        doc.setFontSize(12);

        // Invoice Title
        doc.text("INVOICE", 20, 20);

        // Customer Details
        doc.text(`Customer Name: ${orderDetail.items.name}`, 20, 40);
        doc.text(`Phone: ${orderDetail.items.phone}`, 20, 50);
        doc.text(`Address: ${orderDetail.items.address}`, 20, 60);

        // Order Info
        doc.text(`Invoice No: #${orderDetail.id}`, 20, 80);
        doc.text(`Order Time: ${orderDetail.items.time}`, 20, 90);
        doc.text(`Order Status: ${orderDetail.status ?? "Pending"}`, 20, 100);
        doc.text(`Order Date: ${new Date(orderDetail.created_at).toLocaleDateString('en-CA')}`, 20, 110);

        // Table
        const headers = [["ID", "Item Name", "Description", "Quantity", "Total Price"]];
        const tableData = orderDetail.items.items.map((item) => [
            item.id, 
            item.data.name, 
            item.data.description, 
            item.quantity, 
            item.totalPrice + " Rs"
        ]);

        doc.autoTable({
            head: headers,
            body: tableData,
            startY: 120,
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

        // Summary
        doc.text(`Total Amount: Rs. ${orderDetail.items.grandTotal}`, 150, doc.lastAutoTable.finalY + 20);

        // Save PDF
        doc.save("invoice.pdf");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                        Invoice
                    </h2>
                </div>
            }
            headTitle="Order Details"
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg p-8 border">
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-4">INVOICE</h1>
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Customer Details:</h3>
                                    <p>Name: {orderDetail.items.name}</p>
                                    <p>Phone: {orderDetail.items.phone}</p>
                                    <p>Address: {orderDetail.items.address}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Order Information:</h3>
                                    <p>Invoice No: #{orderDetail.id}</p>
                                    <p>Order Time: {orderDetail.items.time}</p>
                                    <p>Order Status: {orderDetail.status ?? "Pending"}</p>
                                    <p>Order Date: {new Date(orderDetail.created_at).toLocaleDateString('en-CA')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-8">
                            <Table columns={columnsDetail} data={orderDetail.items.items} />
                        </div>

                        {/* Summary Section */}
                        <div className="border-t pt-6 text-right">
                            <h4 className="text-lg font-semibold">Total Amount:</h4>
                            <p className="text-2xl font-bold">Rs. {orderDetail.items.grandTotal}</p>
                        </div>

                        {/* PDF Download Button */}
                        <div className="mt-6 text-right">
                            <button
                                onClick={exportToPDF}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Download INVOICE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderDetail;
