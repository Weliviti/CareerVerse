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
                console.log('Uploading photo from edit form...');
                
                const currentUser = auth.currentUser;
                const storageRef = ref(storage, `avatars/${currentUser.uid}/profile.jpg`);
                
                // Upload file to Firebase Storage
                await uploadBytes(storageRef, selectedPhoto);
                console.log('Photo uploaded to storage');
                
                // Get download URL
                profilePictureUrl = await getDownloadURL(storageRef);
                console.log('Got download URL:', profilePictureUrl);
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

            console.log('Sending update to backend:', updateData);

            // Send update to backend
            const response = await api.put('/api/auth/user/profile', updateData);
            console.log('Backend response:', response.data);

            // Call onSave with updated user data
            onSave(response.data.data);
        } catch (err) {
            console.error('Failed to update profile:', err);
            console.error('Error details:', err.response?.data);
            const errorMsg = err.response?.data?.message || err.message || 'Failed to update profile. Please try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
            setUploadingPhoto(false);
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Profile</h3>

                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Update your personal information and career preferences.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <ErrorAlert message={error} />

                    {/* Profile Picture Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Picture
                        </label>
                        <div className="flex items-center space-x-4">
                            {/* Preview */}
                            <div className="flex-shrink-0">
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Profile preview"
                                        className="h-20 w-20 rounded-full object-cover border-2 border-gray-300"
                                    />
                                ) : (
                                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-gray-400"
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
                                    className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
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
                                <p className="mt-1 text-xs text-gray-500">Max 5MB, JPG/PNG</p>
                            </div>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field (Read-only for now) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                                className="shadow-sm bg-gray-50 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>

                    {/* Preferred Career Dropdown */}
                    <div>
                        <label htmlFor="career_path" className="block text-sm font-medium text-gray-700">
                            Preferred Career Track
                        </label>
                        <div className="mt-1">
                            <select
                                id="career_path"
                                name="career_path"
                                value={formData.career_path}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            >
                                {careerOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                            type="submit"
                            disabled={loading || uploadingPhoto}
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm ${(loading || uploadingPhoto) ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {uploadingPhoto ? 'Uploading Photo...' : loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading || uploadingPhoto}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
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
