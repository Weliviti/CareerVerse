/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2FA state
  const [pendingUser, setPendingUser] = useState(null);
  const [maskedEmail, setMaskedEmail] = useState(null);

  useEffect(() => {
    // Listen to Firebase auth state changes (triggers on sign-in, sign-out, and token refresh)
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        // If there is a pending 2FA verification, don't promote to currentUser yet
        if (pendingUser && pendingUser.uid === user.uid) {
          // User is in 2FA limbo — keep them as pendingUser
          setLoading(false);
          return;
        }

        // User is signed in or token refreshed
        setCurrentUser(user);
        // Force token refresh if needed (though onIdTokenChanged usually handles this, 
        // access the token to ensure it's available/refreshed in SDK internals)
        try {
          await user.getIdToken();
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role || 'user');
          } else {
            setUserRole('user');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole('user');
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setUserRole(null);
        setPendingUser(null);
        setMaskedEmail(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Set the user as pending 2FA verification.
   * Called from Login when the backend indicates two_fa_enabled is true.
   */
  const set2FAPending = (user, masked) => {
    setPendingUser(user);
    setMaskedEmail(masked);
    // Ensure the user is NOT set as currentUser while pending
    setCurrentUser(null);
    setUserRole(null);
  };

  /**
   * Complete 2FA verification — promotes pendingUser to currentUser.
   * Called from VerifyOTP page after successful OTP verification.
   */
  const complete2FA = async () => {
    if (pendingUser) {
      setCurrentUser(pendingUser);
      // Fetch role
      try {
        const userDoc = await getDoc(doc(db, 'users', pendingUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role || 'user');
        } else {
          setUserRole('user');
        }
      } catch (error) {
        console.error("Error fetching user role after 2FA:", error);
        setUserRole('user');
      }
      setPendingUser(null);
      setMaskedEmail(null);
    }
  };

  const value = {
    currentUser,
    userRole,
    loading,
    // 2FA
    pendingUser,
    maskedEmail,
    set2FAPending,
    complete2FA,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
