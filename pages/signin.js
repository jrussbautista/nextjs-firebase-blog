import React from "react";
import { auth, googleAuthProvider } from "../lib/firebase";

const Signin = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <div className="mt-4 container p-2">
      <button className="btn btn-light" onClick={signInWithGoogle}>
        Signin with Google
      </button>
    </div>
  );
};

export default Signin;
