
import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import api from '../services/api';
import Button from './ui/Button';
import Input from './ui/Input';

const ProfileEditForm = ({ user, onSave, onCancel }) => {
    const [name, setName] = useState(user?.name || '');
    const [preferredCareer, setPreferredCareer] = useState(user?.preferredCareer || 'Doctor');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.put('/api/user/profile', {
                name,
                preferredCareer,
            });

            if (response.data && response.data.user) {
                toast.success('Profile updated successfully');
                onSave(response.data.user);
            } else {
                // Fallback if API doesn't return user object but succeeds
                toast.success('Profile updated');
                onSave({ ...user, name, preferredCareer });
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
            />

            <div className="flex flex-col gap-1">
                <label htmlFor="preferredCareer" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Preferred Career Track
                </label>
                <select
                    id="preferredCareer"
                    value={preferredCareer}
                    onChange={(e) => setPreferredCareer(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-teal-400 dark:focus:ring-teal-400"
                >
                    <option value="Doctor">Doctor</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Lawyer">Lawyer</option>
                </select>
                <p className="text-xs text-slate-500">
                    Select the career path you are most interested in.
                </p>
            </div>

            <div className="flex gap-4 pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    isLoading={loading}
                    disabled={loading}
                    className="flex-1"
                >
                    Save Changes
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

ProfileEditForm.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        preferredCareer: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ProfileEditForm;
