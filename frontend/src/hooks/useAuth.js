import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication context
 * 
 * This hook provides access to the authentication state and methods
 * throughout the application. It must be used within an AuthProvider.
 * 
 * @returns {Object} Authentication context value containing:
 * @returns {Object|null} user - The current authenticated user object, null if not authenticated
 * @returns {Function} login - Function to log in a user with email and password
 * @returns {Function} signup - Function to sign up a new user with email and password
 * @returns {Function} logout - Function to log out the current user
 * @returns {boolean} loading - Loading state indicator for authentication operations
 * @returns {string|null} error - Error message if an authentication error occurred, null otherwise
 * 
 * @example
 * const { user, login, logout, loading, error } = useAuth();
 * 
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 * if (user) return <div>Welcome, {user.email}</div>;
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default useAuth;
