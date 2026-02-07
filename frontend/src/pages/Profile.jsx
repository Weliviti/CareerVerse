import { useAuth } from '../context/AuthContext';

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
            {/* Main Container */}
            <div className="max-w-6xl mx-auto px-4 py-8">
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
            </div>
        </div>
    );
};

export default Profile;
