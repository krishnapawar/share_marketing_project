<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    User,
    Transaction,
    Wallet
};
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $transactions = Transaction::with(['user','file'])->latest('id')->when($request->filter,function($query) use($request){
            if(!empty($request->filter) && $request->filter !='all'){
                return $query->where('type',$request->filter);
            }
        })->when($request->userId,function($query) use($request){
            if($request->has('userId') && !empty($request->userId)){
                $query->where('user_id', $request->userId);
            }
        })
        
        ->paginate(10);

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'users'=>User::where('role','<>',1)->get(),
            'user_id'=>$request->userId ?? null,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Transactions/Create');
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updateStatus(Request $request){

        if($request->has('id') && $request->has('status')){
            $id = $request->input('id');
            $status = $request->input('status');
            $transaction=Transaction::where('id', $request->id)->first();
            if($transaction->status =="approve"){
                return redirect()->route('transactions.index')->with(['success' => 'Transaction status already updated successfully']);
            }
            if($transaction){
                $wallet = Wallet::where('user_id',$transaction->user_id)->first();
                if($status == "approve" && $transaction->status !="approve" && $transaction->type =="addFund"){
                    $wallet->balance += $transaction->amount;
                    $wallet->save();
                }
                $transaction->status=$status;
                $transaction->save();
            }
       }
       return redirect()->route('transactions.index')->with(['success' => 'Transaction status updated successfully']);

    }
}
