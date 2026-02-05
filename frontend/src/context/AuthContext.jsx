import { createContext, useContext, useState, useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes (triggers on sign-in, sign-out, and token refresh)
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        // User is signed in or token refreshed
        setCurrentUser(user);
        // Force token refresh if needed (though onIdTokenChanged usually handles this, 
        // access the token to ensure it's available/refreshed in SDK internals)
        try {
          await user.getIdToken();
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
