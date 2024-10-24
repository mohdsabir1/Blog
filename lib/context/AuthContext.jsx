'use client'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

import { createUser } from "../firebase/admim/write";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setError(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/admin'); // Redirect to /admin when user logs in
    }
  }, [user, router]); // Redirect only when user state changes

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user); 
      // Create or update user document in Firestore
      await createUser({
        uid: user.uid, // Correctly use uid here
      });
      console.log("User document created/updated"); 
      // Redirect to the admin page (if applicable)
      router.push('/admin');
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      router.push('/'); // Redirect to / after logout
    } catch (error) {
      setError(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        handleSignIn,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
