<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            [
                'key' => 'qrCode',
                'value' => 'qrCode',
                'description' => 'qrCode',
                'created_at' => Carbon::parse('2024-07-28T20:59:58.000000Z'),
                'updated_at' => Carbon::parse('2024-07-31T18:30:05.000000Z'),
            ],
            [
                'key' => 'bankDatail',
                'value' => '',
                'description' => 'bankDatail',
                'created_at' => Carbon::parse('2024-07-28T20:59:58.000000Z'),
                'updated_at' => Carbon::parse('2024-07-31T18:30:05.000000Z'),
            ],
            [
                'key' => 'upi_id',
                'value' => 'upi_id',
                'description' => 'this test email',
                'created_at' => Carbon::parse('2024-07-28T20:59:58.000000Z'),
                'updated_at' => Carbon::parse('2024-07-31T18:30:05.000000Z'),
            ]
        ]);
    }
}
