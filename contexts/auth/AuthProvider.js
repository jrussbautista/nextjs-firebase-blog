import { useState, useEffect } from "react";
import { auth as firebaseAuth } from "../../lib/firebase";
import { AuthContext, initialState } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid, displayName, emailVerified, photoURL } = user;
        const userData = {
          uid,
          email,
          displayName,
          emailVerified,
          photoURL,
        };
        setAuthState({
          ...authState,
          user: userData,
        });
      } else {
        setAuthState(initialState);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState }}>
      {children}
    </AuthContext.Provider>
  );
};
