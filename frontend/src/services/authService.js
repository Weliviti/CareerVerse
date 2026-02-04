import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

/**
 * Logs in a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The user object on success.
 * @throws {Object} - Firebase error object on failure.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    // Re-throw the error to be handled by the caller
    // Common errors: auth/user-not-found, auth/wrong-password, auth/invalid-email
    throw error;
  }
};
