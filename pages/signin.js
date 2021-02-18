import React from "react";
import toast from "react-hot-toast";
import { auth, googleAuthProvider } from "../lib/firebase";

const Signin = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        toast.error(
          "Unable to sign in with google right now. Please try again later"
        );
      }
    }
  };

  return (
    <div className="mt-4 container p-2">
      <button className="btn btn-light btn-lg" onClick={signInWithGoogle}>
        <img
          src="/images/google.png"
          alt="google icon"
          width="25"
          className="me-2"
        />
        Signin with Google
      </button>
    </div>
  );
};

export default Signin;
