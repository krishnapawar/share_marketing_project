<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BankDetailSeeder extends Seeder
{
    public function run()
    {
        DB::table('bank_details')->insert([
            [
                'user_id' => 1,
                'bank_name' => 'Bank A',
                'account_number' => '123456789',
                'ifsc_code' => 'IFSC001',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'bank_name' => 'Bank B',
                'account_number' => '987654321',
                'ifsc_code' => 'IFSC002',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

