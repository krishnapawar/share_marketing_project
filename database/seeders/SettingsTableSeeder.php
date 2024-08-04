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
                'value' => 'bankDatail',
                'description' => 'bankDatail',
                'created_at' => Carbon::parse('2024-07-28T20:59:58.000000Z'),
                'updated_at' => Carbon::parse('2024-07-31T18:30:05.000000Z'),
            ],
            [
                'key' => 'Email Address',
                'value' => 'organization@gmail.com',
                'description' => 'this test email',
                'created_at' => Carbon::parse('2024-07-28T20:59:58.000000Z'),
                'updated_at' => Carbon::parse('2024-07-31T18:30:05.000000Z'),
            ],
            [
                'key' => 'Mobile Number',
                'value' => '565554564546',
                'description' => 'this test no.',
                'created_at' => Carbon::parse('2024-07-31T16:43:51.000000Z'),
                'updated_at' => Carbon::parse('2024-07-31T18:24:40.000000Z'),
            ],
            [
                'key' => 'Company Address',
                'value' => '29 Conpany test address',
                'description' => 'this test address',
                'created_at' => Carbon::parse('2024-07-31T16:46:50.000000Z'),
                'updated_at' => Carbon::parse('2024-07-31T18:01:38.000000Z'),
            ],
        ]);
    }
}
