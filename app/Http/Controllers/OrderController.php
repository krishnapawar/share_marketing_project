<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\{
    User,
    Order,
    Wallet
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
        $orders = Order::when($request->search,function($q) use($request){
            $q->where('status','like','%'.$request->search.'%')
            ->Orwhere('profit_loss_status','like','%'.$request->search.'%')
            ->Orwhere('type','like','%'.$request->search.'%')
            ->orWhereHas('user', function ($q) use ($request) {
                // Apply search filter on the related user's name
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        })->with('user')->latest('id')->paginate();
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
            'price' => 'required',
            'type' => 'required|in:sell,buy',
            'qty' => 'required|numeric|min:1',
        ]);
        try {
            //code...
            $amount = $request->qty * $request->price;
            $wallet = Wallet::where('user_id',$request->user_id)->first();
            $balance = $wallet->balance ?? 0;
            if($balance < $request->amount){
                return redirect()->back()->with('error', 'Insufficient balance');
            }
                

            $order = new Order;
            
            $order->user_id = $request->user_id;
            $order->status = "running";
            $order->date = $request->date;
            $order->currency = strtoupper($request->currency);
            $order->price = $request->price;
            $order->amount = round($request->amount,2,0);
            $order->type = $request->type;
            $order->qty = $request->qty;
            $order->save();

            $wallet->balance -= $request->amount;
            $wallet->save();
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
            'user_id' => 'required|min:1',
            // 'status' => 'required|string',
            'date' => 'required|date|date_format:Y-m-d',
            'currency' => 'required|string',
            'price' => 'required',
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

    public function orderSell(Request $request)
    {
        //
        if($request->has('id') && $request->input('id') > 0 && $request->has('selling_amount')){
            $id = $request->input('id');
            $selling_amount = $request->input('selling_amount');
            $order = Order::find($id);
            $wallet = Wallet::where('user_id',$order->user_id)->first();
            if($order->status == 'completed' || $order->type == 'sell'){
                return redirect()->route('orders.index')->with(
                    'error',
                    'Order is already completed'
                );
            }
            $order->status = 'completed';
            $order->selling_amount = $selling_amount;
            $order->profit_loss_status = $order->amount > $selling_amount ? 'loss':'profit';
            $order->type = 'sell';
            $order->selling_at = now();
            if($order->profit_loss_status == 'loss'){
                $order->profit_loss_amount = $order->amount - $selling_amount;
            }else{
                $order->profit_loss_amount = $selling_amount - $order->amount;
            }
            $order->save();
            
            if(!empty($wallet)){
                $wallet->balance += $selling_amount;
            }else {
                $wallet = new Wallet;
                $wallet->user_id = $order->user_id;
                $wallet->balance = $selling_amount;
            }
            $wallet->save();

            

        }else{
            return redirect()->back()->with('error', 'Invalid request');
        }
        return redirect()->route('orders.index')->with('success', 'Order Sold successfully');
    }
}
