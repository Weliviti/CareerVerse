import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

/**
 * Profile Page Component
 * Step 1: Profile header card with avatar
 */
const Profile = () => {
    const { currentUser } = useAuth();

    // User icon for avatar
    const UserIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        {/* Left Side: Avatar and User Info */}
                        <div className="flex items-center space-x-4">
                            {/* Avatar Circle */}
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white">
                                    <UserIcon />
                                </div>
                            </div>

                            {/* User Name and Email */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {currentUser?.displayName || 'Sarah Johnson'}
                                </h2>
                                <div className="flex items-center mt-1 text-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm">{currentUser?.email || 'email@example.com'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Edit Profile Button */}
                        <div>
                            <button className="flex items-center px-4 py-2 border-2 border-primary-500 text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid Layout for Personal Info and Account Settings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

                        <div className="space-y-4">
                            {/* Name Field */}
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-primary-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-base font-medium text-gray-900">
                                        {currentUser?.displayName || 'Sarah Johnson'}
                                    </p>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-primary-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-base font-medium text-gray-900">
                                        {currentUser?.email || 'sarah.johnson@email.com'}
                                    </p>
                                </div>
                            </div>

                            {/* Joined Date Field */}
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-primary-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Joined Date</p>
                                    <p className="text-base font-medium text-gray-900">
                                        January 15, 2024
                                    </p>
                                </div>
                            </div>

                            {/* Preferred Career Track Field */}
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-primary-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Preferred Career Track</p>
                                    <p className="text-base font-medium text-gray-900">
                                        Software Engineering
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Settings Section - Placeholder for Part 4 */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                        <p className="text-gray-500 text-sm">Settings will be added in Part 4</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
