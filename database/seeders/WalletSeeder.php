<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Wallet;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ensure there are users to assign wallets to
        User::factory()->count(10)->create()->each(function ($user) {
            Wallet::create([
                'user_id' => $user->id,
                'balance' => rand(1000, 10000) / 100,
                'profit' => rand(100, 1000) / 100,
                'loss' => rand(50, 500) / 100,
                'withdrawal' => rand(100, 1000) / 100,
                'loan' => rand(500, 5000) / 100,
            ]);
        });
    }
}
