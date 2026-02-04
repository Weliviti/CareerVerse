import { useState } from 'react';
import clsx from 'clsx';

/**
 * Reusable Input Component
 *
 * @param {Object} props
 * @param {string} props.label - Label text for the input field
 * @param {string} props.error - Error message (shows red border if present)
 * @param {React.ReactNode} props.icon - Icon component to display on the left side
 * @param {string} props.type - Input type (text, password, email, etc.)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} rest - Additional HTML input attributes
 */
const Input = ({
  label,
  error,
  icon,
  type = 'text',
  className = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine the actual input type based on password toggle
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Base input styles
  const inputStyles = clsx(
    'w-full px-4 py-2 rounded-lg border transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    // Icon padding
    icon && 'pl-11',
    // Password toggle padding
    type === 'password' && 'pr-11',
    // Border colors
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    className
  );

  // Eye icon for password toggle
  const EyeIcon = ({ show }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {show ? (
        // Eye open icon
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      ) : (
        // Eye closed icon
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      )}
    </svg>
  );

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          type={inputType}
          className={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {/* Password Toggle Button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none hover:text-gray-700 transition-colors"
            tabIndex={-1}
          >
            <EyeIcon show={showPassword} />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
