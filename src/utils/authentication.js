import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getWebsite } from ".";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth();

export async function signUp(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
    // Signed in
    const user = userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    throw error;
  }
}

export async function signIn(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    throw error;
  }
}

export async function emailVerification() {
  return await sendEmailVerification(auth.currentUser, {
    url: getWebsite(),
  });
}
const Auth = Object.freeze({
  SIGNED_IN: "signedIn",
  SIGN_OUT: "signOut",
  SIGNED_OUT: "signedOut",
});

export function useAuth(type) {
  const router = useRouter();
  useEffect(() => {
    switch (type) {
      case Auth.SIGNED_IN: {
        // Not signed in
        if (auth.currentUser === null) {
          router.push("/signIn");
        } else if (
          !auth.currentUser.emailVerified &&
          router.route !== "/verifyEmail"
        ) {
          router.push("/verifyEmail");
        }
        break;
      }

      case Auth.SIGN_OUT: {
        // Not signed in
        if (auth.currentUser !== null) {
          auth.signOut().then(() => {
            localStorage.removeItem("user");
            console.log(localStorage);
            router.push("/signIn");
          });
        } else {
          router.push("/signIn");
        }
        break;
      }

      case Auth.SIGNED_OUT: {
        console.log(auth.currentUser);
        if (auth.currentUser != null) {
          router.push("/");
        }
        break;
      }

      default:
        break;
    }
  });

  return router;
}
export { auth, Auth };
