import React from 'react';
import PropTypes from 'prop-types';

/**
 * PasswordStrength component displays a visual indicator of password strength
 * 
 * @param {Object} props - Component props
 * @param {string} props.password - The password string to evaluate
 * @returns {JSX.Element|null} Password strength indicator or null if no password
 */
const PasswordStrength = ({ password }) => {
    // Don't show anything if there's no password
    if (!password) {
        return null;
    }

    /**
     * Calculate password strength based on length and character types
     * @returns {Object} Strength details including label, color, and width
     */
    const getStrength = () => {
        const length = password.length;
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~]/.test(password);

        // Strong: Length >= 8 AND contains special characters
        if (length >= 8 && hasSpecialChar) {
            return {
                label: 'Strong',
                color: 'bg-green-500',
                textColor: 'text-green-700',
                bgColor: 'bg-green-50',
                width: '100%',
            };
        }

        // Medium: Length >= 6 AND contains numbers
        if (length >= 6 && hasNumbers) {
            return {
                label: 'Medium',
                color: 'bg-yellow-500',
                textColor: 'text-yellow-700',
                bgColor: 'bg-yellow-50',
                width: '66%',
            };
        }

        // Weak: Length < 6 or doesn't meet other criteria
        return {
            label: 'Weak',
            color: 'bg-red-500',
            textColor: 'text-red-700',
            bgColor: 'bg-red-50',
            width: '33%',
        };
    };

    const strength = getStrength();

    return (
        <div className="mt-2">
            {/* Progress bar container */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full ${strength.color} transition-all duration-300 ease-in-out`}
                    style={{ width: strength.width }}
                />
            </div>

            {/* Strength label */}
            <div className="mt-1 flex items-center justify-between">
                <span className={`text-xs font-medium ${strength.textColor}`}>
                    Password strength: {strength.label}
                </span>
                {strength.label !== 'Strong' && (
                    <span className="text-xs text-gray-500">
                        {strength.label === 'Weak'
                            ? 'At least 6 characters needed'
                            : 'Add special characters for strong'}
                    </span>
                )}
            </div>
        </div>
    );
};

PasswordStrength.propTypes = {
    password: PropTypes.string.isRequired,
};

export default PasswordStrength;
