<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{
    Wallet,
    Setting
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
            $settings = Setting::whereIn('key',['qrCode','bankDatail'])->get();
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
                'profit' => $profit,
                'loss' => $loss,
                'withdrawal' => $withdra,
                'loan' => $loan,
                'settings' => $settings,
                ]);
        } catch (\Throwable $th) {
            $this->sendError([
                "message"=>$th->getMessage()
            ]);
        }
    }
}
