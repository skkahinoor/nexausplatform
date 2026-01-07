<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials.
     */
    public function index(Request $request): Response
    {
        $testimonials = Testimonial::ordered()->get();

        // If request expects JSON (AJAX), return JSON
        if ($request->expectsJson()) {
            return response()->json([
                'testimonials' => $testimonials,
            ]);
        }

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'text' => 'required|string',
            'highlight' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        }

        $validated['is_active'] = $request->has('is_active') ? $validated['is_active'] : true;
        $validated['order'] = $validated['order'] ?? Testimonial::max('order') + 1;

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

    /**
     * Update the specified testimonial.
     */
    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'text' => 'required|string',
            'highlight' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($testimonial->image) {
                Storage::disk('public')->delete($testimonial->image);
            }
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        } elseif ($request->has('remove_image') && $request->remove_image) {
            // Remove image if requested
            if ($testimonial->image) {
                Storage::disk('public')->delete($testimonial->image);
            }
            $validated['image'] = null;
        } else {
            // Keep existing image
            $validated['image'] = $testimonial->image;
        }

        $validated['is_active'] = $request->has('is_active') ? (bool)$validated['is_active'] : $testimonial->is_active;

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    /**
     * Remove the specified testimonial.
     */
    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        // Delete image if exists
        if ($testimonial->image) {
            Storage::disk('public')->delete($testimonial->image);
        }

        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial deleted successfully.');
    }
}
