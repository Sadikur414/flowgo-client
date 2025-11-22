import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,

  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useEffect, useState } from "react";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   ------------------- Create user-----------------------
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   ------------------- Signin User-----------------------
  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // -----------------google sign in------------------
  const signInwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //----------------Update user profile-------------------
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }

  //------------------------Logout User--------------------
  const logOut = () => {
    return signOut(auth);
  };

  //-----------------------Observer------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  //   ------------------- Auth Info-----------------------
  const authInfo = {
    user,
    loading,
    createUser,
    signinUser,
    signInwithGoogle,
    updateUserProfile,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
