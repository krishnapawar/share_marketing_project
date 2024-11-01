<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LoanRequestSeeder extends Seeder
{
    public function run()
    {
        DB::table('loan_requests')->insert([
            [
                'user_id' => 1,
                'amount' => 5000.00,
                // 'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'amount' => 3000.00,
                // 'status' => 'approved',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

