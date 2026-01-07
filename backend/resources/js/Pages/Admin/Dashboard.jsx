import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function AdminDashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Card */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage your application from this centralized admin panel.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-6">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{stats.total_users}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Administrators</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{stats.total_admins}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                                        <svg
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Regular Users</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{stats.total_users_role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settings</h3>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Manage Settings
                                            <svg
                                                className="-me-1 ms-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('admin.settings.index')}>
                                            <div className="flex items-center">
                                                <svg
                                                    className="mr-2 h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                                    />
                                                </svg>
                                                Frontend Settings
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('admin.settings.index')}>
                                            <div className="flex items-center">
                                                <svg
                                                    className="mr-2 h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                Contact Settings
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('admin.settings.index')}>
                                            <div className="flex items-center">
                                                <svg
                                                    className="mr-2 h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                                Social Media
                                            </div>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Manage your website settings including logo, title, contact information, and social media links.
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Link
                                    href={route('profile.edit')}
                                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <div className="font-medium text-gray-900 dark:text-gray-100">Edit Profile</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your profile information</div>
                                </Link>
                                <Link
                                    href="/"
                                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <div className="font-medium text-gray-900 dark:text-gray-100">Home</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Go to homepage</div>
                                </Link>
                                <div className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <div className="font-medium text-gray-900 dark:text-gray-100">Manage Users</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Coming soon...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

