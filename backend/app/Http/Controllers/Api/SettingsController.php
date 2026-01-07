<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    /**
     * Get all frontend settings as JSON for React frontend.
     */
    public function index(): JsonResponse
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        
        // Build full URLs for images
        $logoUrl = null;
        $faviconUrl = null;
        
        if (!empty($settings['website_logo'])) {
            $logoUrl = Storage::disk('public')->exists($settings['website_logo'])
                ? asset('storage/' . $settings['website_logo'])
                : null;
        }
        
        if (!empty($settings['website_favicon'])) {
            $faviconUrl = Storage::disk('public')->exists($settings['website_favicon'])
                ? asset('storage/' . $settings['website_favicon'])
                : null;
        }

        // Get testimonials
        $testimonials = \App\Models\Testimonial::active()
            ->ordered()
            ->get()
            ->map(function ($testimonial) {
                $imageUrl = null;
                if ($testimonial->image) {
                    $imageUrl = Storage::disk('public')->exists($testimonial->image)
                        ? asset('storage/' . $testimonial->image)
                        : null;
                }
                
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->name,
                    'role' => $testimonial->role,
                    'company' => $testimonial->company,
                    'text' => $testimonial->text,
                    'highlight' => $testimonial->highlight,
                    'rating' => $testimonial->rating,
                    'image' => $imageUrl,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'website_title' => $settings['website_title'] ?? config('app.name'),
                'website_description' => $settings['website_description'] ?? '',
                'website_logo' => $logoUrl,
                'website_favicon' => $faviconUrl,
                'contact_email' => $settings['contact_email'] ?? '',
                'contact_phone' => $settings['contact_phone'] ?? '',
                'social_facebook' => $settings['social_facebook'] ?? '',
                'social_twitter' => $settings['social_twitter'] ?? '',
                'social_instagram' => $settings['social_instagram'] ?? '',
                'social_linkedin' => $settings['social_linkedin'] ?? '',
                'testimonials' => $testimonials,
            ],
        ]);
    }
}
