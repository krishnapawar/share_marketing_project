<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LoanRequest;

class LoanRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $loanRequest = LoanRequest::latest('id')->get();
        return $this->sendResponse($loanRequest);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try{
            $request->validate([
                'amount' => 'required|numeric',
            ]);
            $loanRequest = LoanRequest::create([
                'amount'=>$request->amount,
                'user_id'=>auth()->id(),
                'status'=>'pending'
            ]);
            $loanRequest->message ="Your request has been submited.";
            return $this->sendResponse($loanRequest);
        }catch(\Exception $e){
            return $this->sendError([
                "message"=>$e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $loanRequest = LoanRequest::find($id);
        if (!$loanRequest) {
            return $this->sendError([
                "message" => "Loan Request not found"
                ]);
        }
        return $this->sendResponse($loanRequest);
    }
}
