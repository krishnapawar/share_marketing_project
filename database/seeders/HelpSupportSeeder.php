<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class HelpSupportSeeder extends Seeder
{
    public function run()
    {
        DB::table('help_supports')->insert([
            [
                'user_id' => 1,
                'issue' => 'Login Issue',
                'description' => 'Cannot log in to my account.',
                'status' => 'open',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'issue' => 'Payment Issue',
                'description' => 'Payment not going through.',
                'status' => 'resolved',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

