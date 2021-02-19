import { auth, db, firebase, serverTimestamp } from "../lib/firebase";

const createUser = async (user) => {
  if (!user) return;

  const { uid, email, photoURL, emailVerified, displayName } = user;

  const newUser = {
    displayName,
    email,
    photoURL,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    emailVerified,
  };

  await db.collection("users").doc(uid).set(newUser);

  return user;
};

const socialLogin = async (provider) => {
  try {
    let selectedProvider;

    switch (provider) {
      case "google":
        selectedProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case "github":
        selectedProvider = new firebase.auth.GithubAuthProvider();
        break;
      default:
        throw new Error("Unknown provider");
    }

    const { user, additionalUserInfo } = await auth.signInWithPopup(
      selectedProvider
    );
    if (additionalUserInfo?.isNewUser) {
      await createUser(user);
    }

    return user;
  } catch (error) {
    console.log(error);
    let errorMessage = "";
    switch (error.code) {
      case "auth/account-exists-with-different-credential":
        errorMessage =
          "An account already exists with the same email address but different sign-in credentials.";
        break;
      default:
        errorMessage = `Unable to login with ${provider} right now. Please try again later`;
    }
    throw new Error(errorMessage);
  }
};

const logout = async () => {
  return auth.signOut();
};

export const AuthService = {
  logout,
  socialLogin,
};
