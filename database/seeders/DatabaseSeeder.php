<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password'=> \Hash::make('password'),
            'remember_token' => \Str::random(10),
            'role'=>1
        ]);

        User::factory(10)->create();
        
        $this->call([
            BankDetailSeeder::class,
            HelpSupportSeeder::class,
            LoanRequestSeeder::class,
            OrderSeeder::class,
            TransactionSeeder::class,
            WalletSeeder::class,
            SettingsTableSeeder::class,
            GinniFireWorks::class
        ]);
    }
}
