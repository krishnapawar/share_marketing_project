<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class GinniFireWorks extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'GinniFireWorks',
            'email' => 'ginnifireworks@kPAdmin.com',
            'password'=> \Hash::make('GinniFireWorks'),
            'remember_token' => \Str::random(10),
            'role'=>2
        ]);
    }
}
