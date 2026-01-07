<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\AdminController::class, 'index'])->name('dashboard');
    
    // Settings routes
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings/frontend', [\App\Http\Controllers\Admin\SettingsController::class, 'updateFrontend'])->name('settings.frontend');
    Route::post('/settings/contact', [\App\Http\Controllers\Admin\SettingsController::class, 'updateContact'])->name('settings.contact');
    Route::post('/settings/social', [\App\Http\Controllers\Admin\SettingsController::class, 'updateSocial'])->name('settings.social');
    
    // Testimonials routes
    Route::get('/testimonials', [\App\Http\Controllers\Admin\TestimonialController::class, 'index'])->name('testimonials.index');
    Route::post('/testimonials', [\App\Http\Controllers\Admin\TestimonialController::class, 'store'])->name('testimonials.store');
    Route::put('/testimonials/{testimonial}', [\App\Http\Controllers\Admin\TestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('/testimonials/{testimonial}', [\App\Http\Controllers\Admin\TestimonialController::class, 'destroy'])->name('testimonials.destroy');
});

require __DIR__.'/auth.php';
