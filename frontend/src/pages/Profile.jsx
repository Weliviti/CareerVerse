import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProfileEditForm from '../components/ProfileEditForm';
import { storage, auth, db } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

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

/**
 * Profile Page Component
 * Step 1: Profile header card with avatar
 */
const Profile = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [_loadingUserData, setLoadingUserData] = useState(true);

    // Edit Profile state
    const [editModal, setEditModal] = useState(false);

    // Change Password state
    const [passwordModal, setPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passwordError, setPasswordError] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    // Delete Account state
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);

    // Load user data from Firestore
    useEffect(() => {
        const loadUserData = async () => {
            if (!currentUser) return;

            try {
                setLoadingUserData(true);
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data);
                    // Set avatar if exists
                    if (data.profile_picture_url) {
                        setAvatarUrl(data.profile_picture_url);
                    }
                } else {
                    console.warn('User document does not exist in Firestore');
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                toast.error('Failed to load user profile');
            } finally {
                setLoadingUserData(false);
            }
        };

        loadUserData();
    }, [currentUser]);

    // Function to reload user data from Firestore
    const reloadUserData = async () => {
        if (!currentUser) return;

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                setUserData(data);
                if (data.profile_picture_url) {
                    setAvatarUrl(data.profile_picture_url);
                }
                console.log('User data reloaded:', data);
            }
        } catch (error) {
            console.error('Error reloading user data:', error);
        }
    };

    const confirmDeleteAccount = async () => {
        try {
            setDeletingAccount(true);
            await api.delete('/api/auth/account');
            // Sign out locally (may fail if auth already invalidated, that's ok)
            try { await signOut(auth); } catch { /* expected */ }
            toast.success('Your account has been deleted');
            navigate('/');
        } catch (error) {
            console.error('Delete account error:', error?.response?.data || error);
            const msg = error?.response?.data?.message || 'Failed to delete account. Please try again.';
            toast.error(msg);
            setDeletingAccount(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setPasswordError('');
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');

        // Validations
        if (!passwords.current) {
            setPasswordError('Current password is required');
            return;
        }
        if (passwords.new.length < 6) {
            setPasswordError('New password must be at least 6 characters');
            return;
        }
        if (passwords.new !== passwords.confirm) {
            setPasswordError('New passwords do not match');
            return;
        }
        if (passwords.current === passwords.new) {
            setPasswordError('New password must be different from current password');
            return;
        }

        try {
            setChangingPassword(true);
            // Re-authenticate
            const credential = EmailAuthProvider.credential(currentUser.email, passwords.current);
            await reauthenticateWithCredential(currentUser, credential);
            // Update password
            await updatePassword(currentUser, passwords.new);
            toast.success('Password changed successfully!');
            setPasswordModal(false);
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (error) {
            console.error('Password change error:', error);
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                setPasswordError('Current password is incorrect');
            } else if (error.code === 'auth/weak-password') {
                setPasswordError('New password is too weak');
            } else {
                setPasswordError('Failed to change password. Please try again.');
            }
        } finally {
            setChangingPassword(false);
        }
    };

    const handleAvatarUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please select an image file');
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('File size must be less than 5MB');
            toast.error('File size must be less than 5MB');
            return;
        }

        try {
            setUploadingAvatar(true);
            setUploadError(null);

            console.log('=== AVATAR UPLOAD START ===');
            console.log('User UID:', currentUser?.uid);
            console.log('File:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');

            // Create reference to Firebase Storage
            const storageRef = ref(storage, `avatars/${currentUser.uid}/profile.jpg`);

            // Upload file
            console.log('Uploading to storage...');
            await uploadBytes(storageRef, file);
            console.log('✅ File uploaded to storage');

            // Get download URL
            const url = await getDownloadURL(storageRef);
            console.log('✅ Got download URL:', url);

            // Update user profile in backend
            console.log('Calling backend API...');
            console.log('API URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000');
            console.log('Request data:', { profile_picture_url: url });

            const response = await api.put('/api/auth/user/profile', {
                profile_picture_url: url
            });

            console.log('✅ Backend response:', response);
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            // If we got here without an exception and status is 2xx, it's a success
            if (response.status >= 200 && response.status < 300) {
                console.log('✅ Backend confirmed success (status 2xx)');

                // Update local state with new avatar URL
                setAvatarUrl(url);

                // Update userData state so it persists
                setUserData(prev => ({
                    ...prev,
                    profile_picture_url: url
                }));

                // Optionally reload from backend to ensure sync
                setTimeout(() => reloadUserData(), 500);

                toast.success('Profile picture updated successfully!');
            } else {
                throw new Error(response.data?.message || 'Backend returned failure');
            }

        } catch (error) {
            console.error('❌ AVATAR UPLOAD ERROR');
            console.error('Error object:', error);
            console.error('Error message:', error.message);
            console.error('Error response:', error.response);
            console.error('Error response data:', error.response?.data);
            console.error('Error response status:', error.response?.status);

            let errorMsg = 'Failed to upload avatar';

            if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMsg = error.response.data.error;
            } else if (error.message) {
                errorMsg = error.message;
            }

            if (error.response?.data?.error_details) {
                errorMsg += ': ' + error.response.data.error_details;
            }

            setUploadError(errorMsg);
            toast.error('Failed to upload: ' + errorMsg);
        } finally {
            setUploadingAvatar(false);
            console.log('=== AVATAR UPLOAD END ===');
        }
    };

    const handleProfileSave = (updatedUser) => {
        console.log('Profile saved, updating local state:', updatedUser);

        // Update local state with all user data
        setUserData(prevData => ({
            ...prevData,
            ...updatedUser
        }));

        // Update avatar if changed
        if (updatedUser.profile_picture_url) {
            setAvatarUrl(updatedUser.profile_picture_url);
        }

        setEditModal(false);
        toast.success('Profile updated successfully!');
    };

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
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="avatar-upload"
                                    className="cursor-pointer block relative"
                                >
                                    <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white overflow-hidden hover:opacity-90 transition-opacity">
                                        {uploadingAvatar ? (
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                        ) : avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt="User avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <UserIcon />
                                        )}
                                    </div>
                                    {!uploadingAvatar && (
                                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-primary-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </label>
                            </div>

                            {/* User Name and Email */}
                            <div className="flex-1">
                                {uploadError && (
                                    <div className="mb-2 text-sm text-red-600">
                                        {uploadError}
                                    </div>
                                )}
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {userData?.name || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
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
                                    <span className="text-sm">{userData?.email || currentUser?.email || 'email@example.com'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Edit Profile Button */}
                        <div>
                            <button
                                onClick={() => setEditModal(true)}
                                className="flex items-center px-4 py-2 border-2 border-primary-500 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
                            >
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
                                        {userData?.name || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
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
                                        {userData?.email || currentUser?.email || 'sarah.johnson@email.com'}
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
                                        {currentUser?.metadata?.creationTime
                                            ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Account Settings Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>

                        <div className="space-y-4">
                            {/* Change Password */}
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Change Password</p>
                                        <p className="text-xs text-gray-500">Update your password regularly</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPasswordModal(true)}
                                    className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                                >
                                    Change
                                </button>
                            </div>

                            {/* Two-Step Login */}
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
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
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Enable Two-Step Login</p>
                                        <p className="text-xs text-gray-500">Make your account more secure</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                                </label>
                            </div>

                            {/* Delete Account */}
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-red-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Delete Account</p>
                                        <p className="text-xs text-red-500">This action cannot be undone</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDeleteModal(true)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => !deletingAccount && setDeleteModal(false)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 text-center">Delete Account</h3>
                        <p className="text-gray-500 text-center text-sm mt-2">
                            Are you sure you want to delete your account? This will permanently remove your data from both Authentication and Database.
                        </p>
                        <p className="text-red-500 text-center text-xs mt-2 font-medium">
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setDeleteModal(false)}
                                disabled={deletingAccount}
                                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteAccount}
                                disabled={deletingAccount}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {deletingAccount ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete My Account'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditModal(false)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <ProfileEditForm
                            user={{
                                name: userData?.name || currentUser?.displayName || '',
                                email: userData?.email || currentUser?.email || '',
                                career_path: userData?.career_path || 'Doctor',
                                profile_picture_url: userData?.profile_picture_url || avatarUrl || ''
                            }}
                            onSave={handleProfileSave}
                            onCancel={() => setEditModal(false)}
                        />
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {passwordModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => !changingPassword && setPasswordModal(false)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        {/* Lock Icon */}
                        <div className="mx-auto w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 text-center">Change Password</h3>
                        <p className="text-gray-500 text-center text-sm mt-1 mb-6">Enter your current password and choose a new one</p>

                        {passwordError && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                                {passwordError}
                            </div>
                        )}

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="current"
                                    value={passwords.current}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="new"
                                    value={passwords.new}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password (min 6 characters)"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirm"
                                    value={passwords.confirm}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-900"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setPasswordModal(false); setPasswords({ current: '', new: '', confirm: '' }); setPasswordError(''); }}
                                    disabled={changingPassword}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {changingPassword ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Changing...
                                        </>
                                    ) : (
                                        'Change Password'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
