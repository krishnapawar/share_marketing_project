<?php

namespace App\Http\Controllers;

use App\Models\{OrderDetail,Category};
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // Get all categories and pass to the view
        $orderDetail = OrderDetail::latest('id')->paginate(10);
       
        // Return Inertia view with data
        return Inertia::render('OrderDetails/Index', [
            'orderDetail' => $orderDetail
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        // Return Inertia view with data
        return Inertia::render('OrderDetails/OrderCreate',[
            'categories' => Category::with(['file'])->latest('id')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderDetail $orderDetail)
    {
        //
       
        // Return Inertia view with data
        return Inertia::render('OrderDetails/OrderDetail', [
            'orderDetail' => $orderDetail
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderDetail $orderDetail)
    {
        //
        // Return Inertia view with data
        return Inertia::render('OrderDetails/OrderEdit', [
            'orderDetail' => $orderDetail
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:1',
            'grandTotal' => 'required|numeric|min:0',
            'status' => 'nullable|string',
        ]);

        $orderDetail = OrderDetail::findOrFail($id);

        // Update fields with request data
        $orderDetail->items = collect([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'totalQuantity' => $request->input('quantity'),
            'grandTotal' => $request->input('grandTotal'),
        ]);
        $orderDetail->status = $request->input('status');

        // Save the updated order
        $orderDetail->save();

        return redirect()->route('orderDetails.index')->with('success', 'Order updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderDetail $orderDetail)
    {
        //
    }
}
