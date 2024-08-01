<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    User,
    Transaction
};
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $transactions = Transaction::with('user')->latest('id')->when($request->filter,function($query) use($request){
            if(!empty($request->filter) && $request->filter !='all'){
                return $query->where('type',$request->filter);
            }
        })->paginate(10);

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions
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
            Transaction::where('id', $request->id)
           ->update([
               'status' => $request->status
           ]);
       }

    }
}
