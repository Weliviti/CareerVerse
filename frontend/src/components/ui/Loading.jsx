import React from 'react';

/**
 * Spinner Component
 * A circular spinning SVG icon in Teal color.
 *
 * @param {Object} props
 * @param {string} [props.size] - Size of the spinner (sm, md, lg) or a specific Tailwind size class. Defaults to 'md'.
 * @param {string} [props.className] - Additional classes.
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const activeSize = sizeClasses[size] || size; // Allow passing 'h-6 w-6' directly if needed, or fallback to preset

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg
        className={`animate-spin text-teal-600 ${activeSize}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label="loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * Skeleton Component
 * A gray, pulsing rectangle div to mimic loading content.
 *
 * @param {Object} props
 * @param {string} [props.className] - CSS classes for width, height, and rounding.
 */
export const Skeleton = ({ className = 'h-4 w-full rounded' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`}
    ></div>
  );
};
