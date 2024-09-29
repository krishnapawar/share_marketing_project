<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\{Wallet,Setting};
use DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $transactions = DB::table('transactions')
        ->select('*', DB::raw('DATE(created_at) as date'))
        ->where('user_id', $request->user()->id);
 
        if($request->has('type') && $request->type == 'withdrawal'){
            $transactions = $transactions->where('type', 'withdrawal');
        }else{
            $transactions = $transactions->where('type', 'addFund');
        }
        $settings = Setting::whereIn('key',['qrCode','bankDatail'])->get();
        $trans = $transactions->latest('id')->get()
        ->groupBy('date')->map(function($item,$key){
            return [
                'date' => $key,
                'data' => $item
                ];
        })->values()->all();
        return $this->sendResponse([
            'transactions' => $trans,
            'settings' => $settings,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            $request->validate([
                'amount' => 'required|numeric',
                'screenshot' => 'required:type,withdrawal|mimes:jpg,jpeg,png,gif,svg|max:2048',
            ]);
            //code...
            $wallet = Wallet::where('user_id', $request->user()->id)->first();
            if($wallet){
                $balance =  $wallet->balance + $request->amount;
                $wallet->save();
            }else{
                $wallet = new Wallet();
                $wallet->user_id = $request->user()->id;
                $balance = $request->amount;
                $wallet->save();
            }
            $transaction = new Transaction();
            
            if($request->title){
                $transaction->title = $request->title;
            }
            if($request->description){
                $transaction->description = $request->description;
            }
            $transaction->user_id = $request->user()->id;
            $transaction->wallet_id = $wallet->id;
            $transaction->type = 'addFund';
            $transaction->amount = $request->amount;
            $transaction->remaininng_amount = $balance;
            $transaction->save();

            if($request->file('screenshot'))
            {
                // $file = $request->file('screenshot');
                // $filename = time().'.'.$file->getClientOriginalExtension();
                // $file->move(public_path('screenshot'), $filename);
                // $transaction->screenshot = 'screenshot/'.$filename;

                $transaction->file_id = $this->uploadFile($request->file('screenshot'),'screenshot',$transaction->file_id);
                $transaction->save();

            }

            $transaction->message ="Fund amount requested successfully";
            return $this->sendResponse($transaction->load('file'));
        } catch (\Throwable $th) {
            //throw $th;
            $this->sendError([
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function withdrawal(Request $request){
        $request->validate([
            'amount' => 'required|numeric'
        ]);
        try {
            //code...
            $wallet = Wallet::where('user_id', $request->user()->id)->first();
            if($wallet){
                if($wallet->balance >= $request->amount){
                    // $wallet->balance -= $request->amount;
                    // $wallet->withdrawal += $request->amount;
                    // $wallet->save();
                    $transaction = new Transaction();
                    $transaction->user_id = $request->user()->id;
                    $transaction->wallet_id = $wallet->id;
                    $transaction->type = 'withdrawal';
                    $transaction->amount = $request->amount;
                    $transaction->status = 'pending';
                    $transaction->remaininng_amount = $wallet->balance;
                    $transaction->save();
                    $transaction->message ="Amount withdrawn request successfully.";
                    return $this->sendResponse($transaction);
                }else{
                    return $this->sendError([
                        'message' => 'Insufficient balance',
                        ]);
                }
            }else{
                return $this->sendError([
                    'message' => 'Wallet not found',
                    ]);
            }
        } catch (\Throwable $th) {
            //throw $th;
            $this->sendError([
                'message' => $th->getMessage(),
                ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transactions = Transaction::where('user_id', auth()->user()->id)->where('id',$id);
        if($request->has('type') && $request->type == 'withdrawal'){
            $transactions = $transactions->where('type', 'withdrawal');
        }else{
            $transactions = $transactions->where('type', 'addFund');
        }
        return $this->sendResponse($transactions->first());
    }
}
