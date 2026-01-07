<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
	/**
	 * Display the admin dashboard.
	 */
	public function index(Request $request): Response
	{
		return Inertia::render('Admin/Dashboard', [
			'stats' => [
				'total_users' => \App\Models\User::count(),
				'total_admins' => \App\Models\User::where('role', 'admin')->count(),
				'total_users_role' => \App\Models\User::where('role', 'user')->count(),
			],
		]);
	}
}


