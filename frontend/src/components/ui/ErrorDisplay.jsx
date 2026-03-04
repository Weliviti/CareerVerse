import PropTypes from 'prop-types';

/**
 * ErrorContent — extracted outside ErrorDisplay to avoid
 * "Cannot create components during render" lint error.
 */
const ErrorContent = ({ variant, message, details, onRetry }) => (
    <div className={variant === 'fullPage' ? 'max-w-md w-full bg-white rounded-lg shadow-lg p-6' : ''}>
        {/* Error Icon */}
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${variant === 'inline' ? 'h-5 w-5' : 'h-6 w-6'} text-red-600`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            {/* Error Content */}
            <div className="ml-3 flex-1">
                <h3 className={`${variant === 'inline' ? 'text-sm' : 'text-base'} font-semibold text-red-800`}>
                    {message}
                </h3>

                {details && (
                    <p className={`${variant === 'inline' ? 'text-xs' : 'text-sm'} text-red-700 mt-1`}>
                        {details}
                    </p>
                )}

                {/* Retry Button */}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                    >
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
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Try Again
                    </button>
                )}
            </div>
        </div>
    </div>
);

ErrorContent.propTypes = {
    variant: PropTypes.oneOf(['inline', 'card', 'fullPage']),
    message: PropTypes.string,
    details: PropTypes.string,
    onRetry: PropTypes.func,
};

/**
 * ErrorDisplay Component
 * Reusable component for displaying error messages
 */
const ErrorDisplay = ({
    message = 'An error occurred',
    details = null,
    onRetry = null,
    variant = 'card' // 'inline', 'card', 'fullPage'
}) => {
    const variantClasses = {
        inline: 'p-3 bg-red-50 border border-red-200 rounded-md',
        card: 'p-6 bg-white border border-red-200 rounded-lg shadow-sm',
        fullPage: 'min-h-screen flex items-center justify-center p-4'
    };

    return (
        <div className={variantClasses[variant]} role="alert">
            <ErrorContent variant={variant} message={message} details={details} onRetry={onRetry} />
        </div>
    );
};

ErrorDisplay.propTypes = {
    message: PropTypes.string,
    details: PropTypes.string,
    onRetry: PropTypes.func,
    variant: PropTypes.oneOf(['inline', 'card', 'fullPage'])
};

export default ErrorDisplay;
