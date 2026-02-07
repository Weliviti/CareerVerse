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
                    <div className="flex items-center">
                        {/* Avatar Circle */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white">
                                <UserIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
