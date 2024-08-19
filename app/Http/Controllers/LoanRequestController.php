<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{LoanRequest,Wallet};
use Inertia\Inertia;

class LoanRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $loanRequest = LoanRequest::when($request->search, function ($q) use ($request) {
            // Apply search filter on the LoanRequest status
            $q->where('status', 'like', '%' . $request->search . '%')
              ->orWhereHas('user', function ($q) use ($request) {
                  // Apply search filter on the related user's name
                  $q->where('name', 'like', '%' . $request->search . '%');
              });
        })
        ->latest('id')
        ->with('user')
        ->paginate(10);        
        return Inertia::render('LoanRequest/Index',[
            'loanRequests' => $loanRequest
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        $request->validate([
            'status' => 'required',
            'remark' => 'required_if:status,cancelled'
        ]);
        try {
            // Check if the ID is valid and status is provided
            
            
            if ($id > 0 && $request->has('status')) {
                $status = $request->input('status');
                $loanRequest = LoanRequest::find($id);

                if (!$loanRequest) {
                    return redirect()->back()->with(['error' => 'Loan Request not found']);
                }

                // Check if the status is already 'approved'
                if ($loanRequest->status === 'approved') {
                    return redirect()->back()->with('success', 'Loan Request status already updated successfully');
                }

                // Update the loan request
                $wallet = Wallet::where('user_id', $loanRequest->user_id)->first();

                if ($status === 'approved' && $loanRequest->status !== 'approved') {
                    if ($wallet) {
                        $wallet->balance += $loanRequest->amount;
                        $wallet->loan += $loanRequest->amount;
                        $wallet->save();
                        $loanRequest->wallet_id = $wallet->id;
                    }
                }

                $loanRequest->status = $status;

                if ($request->has('remark')) {
                    $loanRequest->remark = $request->input('remark');
                }

                $loanRequest->save();

                return redirect()->back()->with('success', 'Loan Request status updated successfully');
            }

            return redirect()->back()->with(['error' => 'Invalid request data']);

        } catch (\Throwable $th) {
            // Log the exception message for debugging
            \Log::error('Error updating loan request: ' . $th->getMessage());
            return redirect()->back()->with(['error' => 'Error while updating Loan Request status']);
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
