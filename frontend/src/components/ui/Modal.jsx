import { useEffect } from 'react';
import clsx from 'clsx';

/**
 * Reusable Modal Component
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Callback function when modal closes
 * @param {string} props.title - Modal title text
 * @param {React.ReactNode} props.children - Modal body content
 * @param {'sm' | 'md' | 'lg'} props.size - Modal size
 */
const Modal = ({ isOpen = false, onClose, title, children, size = 'md' }) => {
  // Handle Escape key press
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click (click outside modal)
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Size styles for modal container
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Dark overlay background with backdrop blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal container */}
      <div
        className={clsx(
          'relative w-full bg-white rounded-lg shadow-xl',
          'transform transition-all duration-200',
          'animate-slideIn',
          sizeStyles[size]
        )}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          {/* Close button (X) */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-1"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
