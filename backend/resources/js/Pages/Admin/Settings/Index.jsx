import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function SettingsIndex({ settings, flash }) {
    const [activeTab, setActiveTab] = useState('frontend');

    const frontendForm = useForm({
        website_title: settings.website_title || '',
        website_description: settings.website_description || '',
        website_logo: null,
        website_favicon: null,
    });

    const contactForm = useForm({
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
    });

    const socialForm = useForm({
        social_facebook: settings.social_facebook || '',
        social_twitter: settings.social_twitter || '',
        social_instagram: settings.social_instagram || '',
        social_linkedin: settings.social_linkedin || '',
    });

    const submitFrontend = (e) => {
        e.preventDefault();
        frontendForm.post(route('admin.settings.frontend'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const submitContact = (e) => {
        e.preventDefault();
        contactForm.post(route('admin.settings.contact'), {
            preserveScroll: true,
        });
    };

    const submitSocial = (e) => {
        e.preventDefault();
        socialForm.post(route('admin.settings.social'), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-800 dark:text-green-200">{flash.success}</p>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('frontend')}
                                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'frontend'
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Frontend
                            </button>
                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'contact'
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Contact
                            </button>
                            <button
                                onClick={() => setActiveTab('social')}
                                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'social'
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Social Media
                            </button>
                        </nav>
                    </div>

                    {/* Frontend Settings */}
                    {activeTab === 'frontend' && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                            <form onSubmit={submitFrontend} className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        Frontend Settings
                                    </h3>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="website_title" value="Website Title" />
                                        <TextInput
                                            id="website_title"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={frontendForm.data.website_title}
                                            onChange={(e) => frontendForm.setData('website_title', e.target.value)}
                                            required
                                        />
                                        <InputError message={frontendForm.errors.website_title} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="website_description" value="Website Description" />
                                        <textarea
                                            id="website_description"
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            rows="3"
                                            value={frontendForm.data.website_description}
                                            onChange={(e) => frontendForm.setData('website_description', e.target.value)}
                                        />
                                        <InputError message={frontendForm.errors.website_description} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="website_logo" value="Website Logo" />
                                        {settings.website_logo && (
                                            <div className="mb-2">
                                                <img
                                                    src={`/storage/${settings.website_logo}`}
                                                    alt="Current logo"
                                                    className="h-20 w-auto"
                                                />
                                            </div>
                                        )}
                                        <input
                                            id="website_logo"
                                            type="file"
                                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                                            accept="image/*"
                                            onChange={(e) => frontendForm.setData('website_logo', e.target.files[0])}
                                        />
                                        <InputError message={frontendForm.errors.website_logo} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="website_favicon" value="Website Favicon" />
                                        {settings.website_favicon && (
                                            <div className="mb-2">
                                                <img
                                                    src={`/storage/${settings.website_favicon}`}
                                                    alt="Current favicon"
                                                    className="h-16 w-auto"
                                                />
                                            </div>
                                        )}
                                        <input
                                            id="website_favicon"
                                            type="file"
                                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                                            accept="image/*"
                                            onChange={(e) => frontendForm.setData('website_favicon', e.target.files[0])}
                                        />
                                        <InputError message={frontendForm.errors.website_favicon} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={frontendForm.processing}>
                                        Save Frontend Settings
                                    </PrimaryButton>
                                    {frontendForm.processing && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Saving...</span>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Contact Settings */}
                    {activeTab === 'contact' && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                            <form onSubmit={submitContact} className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        Contact Settings
                                    </h3>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="contact_email" value="Contact Email" />
                                        <TextInput
                                            id="contact_email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={contactForm.data.contact_email}
                                            onChange={(e) => contactForm.setData('contact_email', e.target.value)}
                                        />
                                        <InputError message={contactForm.errors.contact_email} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="contact_phone" value="Contact Phone" />
                                        <TextInput
                                            id="contact_phone"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={contactForm.data.contact_phone}
                                            onChange={(e) => contactForm.setData('contact_phone', e.target.value)}
                                        />
                                        <InputError message={contactForm.errors.contact_phone} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={contactForm.processing}>
                                        Save Contact Settings
                                    </PrimaryButton>
                                    {contactForm.processing && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Saving...</span>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Social Media Settings */}
                    {activeTab === 'social' && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                            <form onSubmit={submitSocial} className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        Social Media Settings
                                    </h3>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="social_facebook" value="Facebook URL" />
                                        <TextInput
                                            id="social_facebook"
                                            type="url"
                                            className="mt-1 block w-full"
                                            value={socialForm.data.social_facebook}
                                            onChange={(e) => socialForm.setData('social_facebook', e.target.value)}
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                        <InputError message={socialForm.errors.social_facebook} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="social_twitter" value="Twitter URL" />
                                        <TextInput
                                            id="social_twitter"
                                            type="url"
                                            className="mt-1 block w-full"
                                            value={socialForm.data.social_twitter}
                                            onChange={(e) => socialForm.setData('social_twitter', e.target.value)}
                                            placeholder="https://twitter.com/yourhandle"
                                        />
                                        <InputError message={socialForm.errors.social_twitter} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="social_instagram" value="Instagram URL" />
                                        <TextInput
                                            id="social_instagram"
                                            type="url"
                                            className="mt-1 block w-full"
                                            value={socialForm.data.social_instagram}
                                            onChange={(e) => socialForm.setData('social_instagram', e.target.value)}
                                            placeholder="https://instagram.com/yourhandle"
                                        />
                                        <InputError message={socialForm.errors.social_instagram} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="social_linkedin" value="LinkedIn URL" />
                                        <TextInput
                                            id="social_linkedin"
                                            type="url"
                                            className="mt-1 block w-full"
                                            value={socialForm.data.social_linkedin}
                                            onChange={(e) => socialForm.setData('social_linkedin', e.target.value)}
                                            placeholder="https://linkedin.com/company/yourcompany"
                                        />
                                        <InputError message={socialForm.errors.social_linkedin} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={socialForm.processing}>
                                        Save Social Media Settings
                                    </PrimaryButton>
                                    {socialForm.processing && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Saving...</span>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

