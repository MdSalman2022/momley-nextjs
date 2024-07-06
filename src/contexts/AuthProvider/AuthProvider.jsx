"use client";

import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { app } from "@/config/firebase";
import {
  confirmOTP,
  reVerify,
} from "@/components/Shared/Authentication/Login-Phone";

export const AuthContext = createContext();
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (name, email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, name, email, password);
  };

  const updateUser = (userInfo) => {
    setLoading(true);

    return updateProfile(auth.currentUser, userInfo);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  if (loading) {
    <progress className="progress w-56"></progress>;
  }

  const handleMobileLogin = (phoneNumber) => {
    // e.preventDefault();
    reVerify();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log("OTP code sent");
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyOTP = async (otp, phoneNumber, displayName) => {
    // e.preventDefault();
    if (otp.length === 6) {
      // console.log(otp);
      const getOTPConfirmation = await confirmOTP(
        otp,
        phoneNumber,
        displayName
      );

      console.log(getOTPConfirmation);

      if (getOTPConfirmation.message === true) {
        console.log("Sent true");
        // Do something if OTP verification is successful
      } else {
        console.log("Invalid OTP");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    handleMobileLogin,
    handleVerifyOTP,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
