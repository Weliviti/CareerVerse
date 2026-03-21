import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import ErrorAlert from './ui/ErrorAlert';
import { storage, auth } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileEditForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        career_path: user?.career_path || 'Doctor',
    });
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(user?.profile_picture_url || null);
    const [loading, setLoading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [error, setError] = useState(null);

    const careerOptions = ['Doctor', 'Teacher', 'Lawyer'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setSelectedPhoto(file);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let profilePictureUrl = user?.profile_picture_url || null;

            // If user selected a new photo, upload it first
            if (selectedPhoto) {
                setUploadingPhoto(true);
                console.log('=== EDIT FORM PHOTO UPLOAD ===');
                console.log('Uploading photo from edit form...');

                const currentUser = auth.currentUser;
                console.log('User UID:', currentUser?.uid);

                const storageRef = ref(storage, `avatars/${currentUser.uid}/profile.jpg`);

                // Upload file to Firebase Storage
                await uploadBytes(storageRef, selectedPhoto);
                console.log('✅ Photo uploaded to storage');

                // Get download URL
                profilePictureUrl = await getDownloadURL(storageRef);
                console.log('✅ Got download URL:', profilePictureUrl);
                setUploadingPhoto(false);
            }

            // Prepare update data
            const updateData = {
                name: formData.name,
                career_path: formData.career_path,
            };

            // Only include profile_picture_url if we have one
            if (profilePictureUrl) {
                updateData.profile_picture_url = profilePictureUrl;
            }

            console.log('=== SENDING TO BACKEND ===');
            console.log('API URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000');
            console.log('Update data:', updateData);

            // Send update to backend
            const response = await api.put('/api/auth/user/profile', updateData);

            console.log('✅ Backend response:', response);
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            // Check response — accept success even if data payload is sparse
            if (response.data?.success) {
                console.log('✅ Profile updated successfully');
                // Use response data if available, fall back to what we sent
                const updatedUser = response.data.data || { ...updateData };
                onSave(updatedUser);
            } else {
                throw new Error(response.data?.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error('❌ PROFILE UPDATE ERROR');
            console.error('Error object:', err);
            console.error('Error message:', err.message);
            console.error('Error response:', err.response);
            console.error('Error response data:', err.response?.data);

            let errorMsg = 'Failed to update profile';

            if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err.response?.data?.error) {
                errorMsg = err.response.data.error;
            } else if (err.message) {
                errorMsg = err.message;
            }

            if (err.response?.data?.error_details) {
                errorMsg += ': ' + err.response.data.error_details;
            }

            setError(errorMsg);
        } finally {
            setLoading(false);
            setUploadingPhoto(false);
        }
    };

    return (
        <div className="home-dark-card border-none bg-transparent">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-bold text-white">Edit Profile</h3>

                <div className="mt-2 max-w-xl text-sm text-slate-400">
                    <p>Update your personal information and career preferences.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <ErrorAlert message={error} />

                    {/* Profile Picture Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Profile Picture
                        </label>
                        <div className="flex items-center space-x-4">
                            {/* Preview */}
                            <div className="flex-shrink-0">
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Profile preview"
                                        className="h-20 w-20 rounded-full object-cover border-2 border-emerald-500/30"
                                    />
                                ) : (
                                    <div className="h-20 w-20 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-emerald-400"
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
                                )}
                            </div>
                            {/* Upload Button */}
                            <div>
                                <input
                                    type="file"
                                    id="photo-upload"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-white/10 shadow-sm text-sm font-medium rounded-xl text-white bg-white/[0.04] hover:bg-white/5 focus:outline-none transition-colors"
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
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Choose Photo
                                </label>
                                <p className="mt-2 text-xs text-slate-500">Max 5MB, JPG/PNG</p>
                            </div>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm text-white placeholder-slate-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field (Read-only for now) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled
                                className="w-full px-4 py-2.5 bg-white/[0.01] border border-white/5 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">Email cannot be changed</p>
                    </div>

                    {/* Preferred Career Dropdown */}
                    <div>
                        <label htmlFor="career_path" className="block text-sm font-medium text-slate-300">
                            Preferred Career Track
                        </label>
                        <div className="mt-1">
                            <select
                                id="career_path"
                                name="career_path"
                                value={formData.career_path}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-[#0f241a] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm text-white appearance-none cursor-pointer"
                            >
                                {careerOptions.map((option) => (
                                    <option key={option} value={option} className="bg-[#0f241a] text-white">
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading || uploadingPhoto}
                            className="flex-1 px-4 py-2.5 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors font-medium text-sm disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || uploadingPhoto}
                            className={`flex-1 px-4 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 rounded-xl transition-colors font-medium text-sm flex items-center justify-center gap-2 ${(loading || uploadingPhoto) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {uploadingPhoto ? 'Uploading Photo...' : loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ProfileEditForm.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        career_path: PropTypes.string,
        profile_picture_url: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ProfileEditForm;
