<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\{
    User,
    Order
};
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        if($request->has('id') && $request->has('status')){
            $orders = Order::where('id', $request->id)
            ->update([
                'status' => $request->status
            ]);
        }
        $orders = Order::with('user')->latest('id')->paginate();
        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Orders/CreateOrder',[
            'users' => User::whereIn('role',[0,2])->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            // 'status' => 'required',
            'date' => 'required|date_format:Y-m-d',
            'currency' => 'required',
            'price' => 'required|numeric|min:1',
            'type' => 'required|in:sell,buy',
            'qty' => 'required|numeric|min:1',
        ]);
        try {
            //code...
            $order = new Order;
            $amount = $request->qty * $request->price;
            $order->user_id = $request->user_id;
            $order->status = "running";
            $order->date = $request->date;
            $order->currency = strtoupper($request->currency);
            $order->price = $request->price;
            $order->amount = round($amount,2,0);
            $order->type = $request->type;
            $order->qty = $request->qty;
            $order->save();
            return redirect()->route('orders.index')->with('success', 'Order created successfully');
        } catch (\Throwable $th) {
            //throw $th;
            // dd($th);
            return redirect()->back()->with('error', 'Error creating order');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        return Inertia::render('Orders/EditOrder',[
            'users' => User::whereIn('role',[0,2])->get(),
            'order' => Order::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $request->validate([
            'user_id' => 'required|integer|min:1',
            // 'status' => 'required|string',
            'date' => 'required|date|date_format:Y-m-d',
            'currency' => 'required|string',
            'price' => 'required|numeric|min:1',
            // 'amount' => 'required|numeric',
            'type' => 'required|string',
            'qty' => 'required|numeric|min:1',
            ]);
            try {
                $order = Order::find($id);
                $amount = $request->qty * $request->price;
                $order->user_id = $request->user_id;
                // $order->status = $request->status;
                $order->date = $request->date;
                $order->currency = strtoupper($request->currency);
                $order->price = $request->price;
                $order->amount = round($amount,2,0);
                $order->type = $request->type;
                $order->qty = $request->qty;
                $order->save();
                return redirect()->route('orders.index')->with('success', 'Order updated successfully');
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Error updating order');
            }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
