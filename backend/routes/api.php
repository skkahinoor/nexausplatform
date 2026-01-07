<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SettingsController;

// Public API endpoint for frontend settings
Route::get('/settings', [SettingsController::class, 'index']);

