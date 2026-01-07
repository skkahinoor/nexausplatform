import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { Pencil, Trash2, Plus, Star } from 'lucide-react';

export default function TestimonialsIndex({ testimonials: initialTestimonials, flash }) {
    const [testimonials, setTestimonials] = useState(initialTestimonials || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const form = useForm({
        name: '',
        role: '',
        company: '',
        text: '',
        highlight: '',
        rating: 5,
        image: null,
        order: testimonials.length,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingTestimonial(null);
        form.reset();
        form.setData({
            name: '',
            role: '',
            company: '',
            text: '',
            highlight: '',
            rating: 5,
            image: null,
            order: testimonials.length,
            is_active: true,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (testimonial) => {
        setEditingTestimonial(testimonial);
        form.setData({
            name: testimonial.name,
            role: testimonial.role,
            company: testimonial.company || '',
            text: testimonial.text,
            highlight: testimonial.highlight || '',
            rating: testimonial.rating,
            image: null,
            order: testimonial.order,
            is_active: testimonial.is_active,
        });
        setIsModalOpen(true);
    };

    const submitForm = (e) => {
        e.preventDefault();
        const routeName = editingTestimonial
            ? 'admin.testimonials.update'
            : 'admin.testimonials.store';
        const routeParams = editingTestimonial
            ? { testimonial: editingTestimonial.id }
            : {};

        form.post(route(routeName, routeParams), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                setEditingTestimonial(null);
            },
        });
    };

    const deleteTestimonial = (testimonial) => {
        router.delete(route('admin.testimonials.destroy', testimonial.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteConfirm(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manage Testimonials
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Testimonial
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Manage Testimonials" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-800 dark:text-green-200">{flash.success}</p>
                        </div>
                    )}

                    {testimonials.length === 0 ? (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                            <div className="p-12 text-center">
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    No testimonials yet. Add your first testimonial to get started.
                                </p>
                                <PrimaryButton onClick={openCreateModal}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add First Testimonial
                                </PrimaryButton>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className={`overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700 ${
                                        !testimonial.is_active ? 'opacity-50' : ''
                                    }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {testimonial.image ? (
                                                    <img
                                                        src={`/storage/${testimonial.image}`}
                                                        alt={testimonial.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(testimonial)}
                                                    className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setShowDeleteConfirm(testimonial.id)}
                                                    className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i < testimonial.rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                                            "{testimonial.text}"
                                        </p>

                                        {testimonial.highlight && (
                                            <span className="inline-block px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded">
                                                {testimonial.highlight}
                                            </span>
                                        )}

                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                <span>Order: {testimonial.order}</span>
                                                <span
                                                    className={`px-2 py-1 rounded ${
                                                        testimonial.is_active
                                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                                    }`}
                                                >
                                                    {testimonial.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                        {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h2>

                    <form onSubmit={submitForm}>
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Name *" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={form.errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="role" value="Role/Title *" />
                                <TextInput
                                    id="role"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={form.data.role}
                                    onChange={(e) => form.setData('role', e.target.value)}
                                    required
                                />
                                <InputError message={form.errors.role} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="company" value="Company" />
                                <TextInput
                                    id="company"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={form.data.company}
                                    onChange={(e) => form.setData('company', e.target.value)}
                                />
                                <InputError message={form.errors.company} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="text" value="Testimonial Text *" />
                                <textarea
                                    id="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    rows="4"
                                    value={form.data.text}
                                    onChange={(e) => form.setData('text', e.target.value)}
                                    required
                                />
                                <InputError message={form.errors.text} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="highlight" value="Highlight Text" />
                                <TextInput
                                    id="highlight"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={form.data.highlight}
                                    onChange={(e) => form.setData('highlight', e.target.value)}
                                    placeholder="e.g., 300% increase in conversions"
                                />
                                <InputError message={form.errors.highlight} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="rating" value="Rating (1-5) *" />
                                <select
                                    id="rating"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={form.data.rating}
                                    onChange={(e) => form.setData('rating', parseInt(e.target.value))}
                                    required
                                >
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <option key={rating} value={rating}>
                                            {rating} Star{rating > 1 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={form.errors.rating} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Profile Image" />
                                {editingTestimonial && editingTestimonial.image && !form.data.remove_image && (
                                    <div className="mb-2">
                                        <img
                                            src={`/storage/${editingTestimonial.image}`}
                                            alt={editingTestimonial.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => form.setData('remove_image', true)}
                                            className="mt-2 text-sm text-red-600 dark:text-red-400"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                )}
                                <input
                                    id="image"
                                    type="file"
                                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                                    accept="image/*"
                                    onChange={(e) => form.setData('image', e.target.files[0])}
                                />
                                <InputError message={form.errors.image} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="order" value="Display Order" />
                                <TextInput
                                    id="order"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={form.data.order}
                                    onChange={(e) => form.setData('order', parseInt(e.target.value) || 0)}
                                />
                                <InputError message={form.errors.order} className="mt-2" />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    className="rounded border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    checked={form.data.is_active}
                                    onChange={(e) => form.setData('is_active', e.target.checked)}
                                />
                                <InputLabel htmlFor="is_active" value="Active" className="ml-2" />
                                <InputError message={form.errors.is_active} className="mt-2" />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                                Cancel
                            </button>
                            <PrimaryButton disabled={form.processing}>
                                {editingTestimonial ? 'Update' : 'Create'} Testimonial
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteConfirm !== null} onClose={() => setShowDeleteConfirm(null)}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Delete Testimonial
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Are you sure you want to delete this testimonial? This action cannot be undone.
                    </p>
                    <div className="flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(null)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                            Cancel
                        </button>
                        <DangerButton
                            onClick={() => {
                                const testimonial = testimonials.find((t) => t.id === showDeleteConfirm);
                                if (testimonial) {
                                    deleteTestimonial(testimonial);
                                }
                            }}
                        >
                            Delete
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

