import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import ErrorAlert from './ui/ErrorAlert';

const ProfileEditForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        career_path: user?.career_path || 'Doctor',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const careerOptions = ['Doctor', 'Teacher', 'Lawyer'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.put('/api/user/profile', {
                name: formData.name,
                career_path: formData.career_path,
            });

            onSave(response.data.data); // Assuming response structure { success: true, data: user }
        } catch (err) {
            console.error('Failed to update profile:', err);
            setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
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
                            disabled={loading}
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm ${loading ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
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
        career_path: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ProfileEditForm;
