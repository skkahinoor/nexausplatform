<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
		// User::factory(10)->create();

		// Default admin user
		User::firstOrCreate(
			['email' => 'admin@example.com'],
			[
				'name' => 'Administrator',
				'password' => Hash::make('password'),
				'role' => 'admin',
			]
		);

		// Example regular user
		User::firstOrCreate(
			['email' => 'test@example.com'],
			[
				'name' => 'Test User',
				'password' => Hash::make('password'),
				'role' => 'user',
			]
		);
    }
}
