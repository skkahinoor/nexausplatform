<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display the settings index page.
     */
    public function index(): Response
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        
        return Inertia::render('Admin/Settings/Index', [
            'settings' => [
                'website_title' => $settings['website_title'] ?? config('app.name'),
                'website_description' => $settings['website_description'] ?? '',
                'website_logo' => $settings['website_logo'] ?? null,
                'website_favicon' => $settings['website_favicon'] ?? null,
                'contact_email' => $settings['contact_email'] ?? '',
                'contact_phone' => $settings['contact_phone'] ?? '',
                'social_facebook' => $settings['social_facebook'] ?? '',
                'social_twitter' => $settings['social_twitter'] ?? '',
                'social_instagram' => $settings['social_instagram'] ?? '',
                'social_linkedin' => $settings['social_linkedin'] ?? '',
            ],
        ]);
    }

    /**
     * Update frontend settings.
     */
    public function updateFrontend(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'website_title' => 'required|string|max:255',
            'website_description' => 'nullable|string|max:500',
            'website_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'website_favicon' => 'nullable|image|mimes:ico,png,jpg|max:512',
        ]);

        // Handle logo upload
        if ($request->hasFile('website_logo')) {
            $logoPath = $request->file('website_logo')->store('settings', 'public');
            // Delete old logo if exists
            $oldLogo = Setting::where('key', 'website_logo')->first();
            if ($oldLogo && $oldLogo->value) {
                Storage::disk('public')->delete($oldLogo->value);
            }
            Setting::set('website_logo', $logoPath, 'image', 'frontend');
        } elseif ($request->filled('website_logo')) {
            Setting::set('website_logo', $request->website_logo, 'image', 'frontend');
        }

        // Handle favicon upload
        if ($request->hasFile('website_favicon')) {
            $faviconPath = $request->file('website_favicon')->store('settings', 'public');
            // Delete old favicon if exists
            $oldFavicon = Setting::where('key', 'website_favicon')->first();
            if ($oldFavicon && $oldFavicon->value) {
                Storage::disk('public')->delete($oldFavicon->value);
            }
            Setting::set('website_favicon', $faviconPath, 'image', 'frontend');
        } elseif ($request->filled('website_favicon')) {
            Setting::set('website_favicon', $request->website_favicon, 'image', 'frontend');
        }

        Setting::set('website_title', $validated['website_title'], 'text', 'frontend');
        Setting::set('website_description', $validated['website_description'] ?? '', 'text', 'frontend');

        return redirect()->route('admin.settings.index')
            ->with('success', 'Frontend settings updated successfully.');
    }

    /**
     * Update contact settings.
     */
    public function updateContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
        ]);

        Setting::set('contact_email', $validated['contact_email'] ?? '', 'text', 'contact');
        Setting::set('contact_phone', $validated['contact_phone'] ?? '', 'text', 'contact');

        return redirect()->route('admin.settings.index')
            ->with('success', 'Contact settings updated successfully.');
    }

    /**
     * Update social media settings.
     */
    public function updateSocial(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'social_facebook' => 'nullable|url|max:255',
            'social_twitter' => 'nullable|url|max:255',
            'social_instagram' => 'nullable|url|max:255',
            'social_linkedin' => 'nullable|url|max:255',
        ]);

        Setting::set('social_facebook', $validated['social_facebook'] ?? '', 'text', 'social');
        Setting::set('social_twitter', $validated['social_twitter'] ?? '', 'text', 'social');
        Setting::set('social_instagram', $validated['social_instagram'] ?? '', 'text', 'social');
        Setting::set('social_linkedin', $validated['social_linkedin'] ?? '', 'text', 'social');

        return redirect()->route('admin.settings.index')
            ->with('success', 'Social media settings updated successfully.');
    }
}
