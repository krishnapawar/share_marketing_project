<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionSeeder extends Seeder
{
    public function run()
    {
        // Sample data for user ID 1
        // Transaction::create([
        //     'title' => 'Initial Deposit',
        //     'description' => 'First deposit for user 1',
        //     'user_id' => 1,
        //     'wallet_id' => 1,
        //     'amount' => 1000.00,
        //     'remaininng_amount' => 1000.00,
        //     'type' => 'addfund',
        // ]);

        // Transaction::create([
        //     'title' => 'Withdrawal',
        //     'description' => 'First withdrawal for user 1',
        //     'user_id' => 1,
        //     'wallet_id' => 1,
        //     'amount' => 200.00,
        //     'remaininng_amount' => 800.00,
        //     'type' => 'withdrawal',
        // ]);

        // // Sample data for user ID 2
        // Transaction::create([
        //     'title' => 'Initial Deposit',
        //     'description' => 'First deposit for user 2',
        //     'user_id' => 2,
        //     'wallet_id' => 2,
        //     'amount' => 1500.00,
        //     'remaininng_amount' => 1500.00,
        //     'type' => 'addFund',
        // ]);

        // Transaction::create([
        //     'title' => 'Withdrawal',
        //     'description' => 'First withdrawal for user 2',
        //     'user_id' => 2,
        //     'wallet_id' => 2,
        //     'amount' => 500.00,
        //     'remaininng_amount' => 1000.00,
        //     'type' => 'withdrawal',
        // ]);
    }
}
