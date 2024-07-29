<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    public function run()
    {
        DB::table('orders')->insert([
            [
                'user_id' => 1,
                'status' => 'completed',
                'date' => Carbon::now()->subDays(10),
                'currency' => 'INR',
                'price' => 1500.00,
                'amount' => 1.5,
                'type' => 'buy',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'status' => 'pending',
                'date' => Carbon::now()->subDays(5),
                'currency' => 'INR',
                'price' => 2500.00,
                'amount' => 2.0,
                'type' => 'sell',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'status' => 'completed',
                'date' => Carbon::now()->subDays(15),
                'currency' => 'INR',
                'price' => 1000.00,
                'amount' => 1.0,
                'type' => 'buy',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 3,
                'status' => 'cancelled',
                'date' => Carbon::now()->subDays(2),
                'currency' => 'INR',
                'price' => 3000.00,
                'amount' => 3.0,
                'type' => 'sell',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
