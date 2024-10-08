<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{
    Wallet,
    Setting,
    Order,
    Transaction

};

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            //code...
            $user = auth()->user();
	        $wallets = Wallet::where(['user_id' =>$user->id])->first();
            $settings = Setting::with('file')->whereIn('key',['qrCode','bankDatail','upi_id'])->get();
            
            if(empty($wallets)){
                Wallet::create(['user_id' =>$user->id]);
            }
           $user->load([
                'wallet',
                'loanRequests',
           ]);


            $total_balance = $user->wallet->balance;
            $profit = $user->wallet->profit;
            $loss = $user->wallet->loss;
            $withdra = $user->wallet->withdrawal;
            $loan = $user->wallet->loan;
            return $this->sendResponse([
                'total_balance' => $total_balance,
                'profit' => Order::where(['profit_loss_status'=>'profit','user_id'=>auth()->id()])->sum('profit_loss_amount'),
                'loss' => Order::where(['profit_loss_status'=>'loss','user_id'=>auth()->id()])->sum('profit_loss_amount'),
                'withdrawal' => Transaction::where(['type'=>'withdrawa','status'=>'approved','user_id'=>auth()->id()])->sum('amount'),
                'loan' => $loan,
                'settings' => $settings,
                ]);
        } catch (\Throwable $th) {
            $this->sendError([
                "message"=>$th->getMessage()
            ]);
        }
    }
    public function helpAndSuport()
    {
        $settings = collect();
        $settings->push([
            'key' => 'Contact_No',
            "description"=>"Contact No",
            'value' => '71111111111',
        ]);
        $settings->push([
            'key' => 'Email',
            "description"=>"Email",
            'value' => 'test@test.com',
        ]);
        return $this->sendResponse([
            'helpAndSuports' => $settings,
        ]);
    }
}
