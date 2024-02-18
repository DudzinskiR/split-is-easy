import { auth } from "./firebase-config";
import { FirebaseError } from "firebase/app";
import { FirebaseAuthResponse } from "src/enums";
import { findValue } from "src/utils/helpers";
import {
  GoogleAuthProvider,
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const checkFirebaseError = (error: FirebaseError) => {
  return findValue(FirebaseAuthResponse, error.code, "UNKNOWN");
};

export const getToken = async () => {
  const auth = getAuth();
  const { currentUser } = auth;

  if (!currentUser) return "";
  const token = await getIdToken(currentUser!, true);

  return token;
};

export const firebaseAuth = () => {
  return getAuth();
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    localStorage.setItem("LOGGED", "TRUE");
    return FirebaseAuthResponse.SUCCESS;
  } catch (e) {
    if (e instanceof FirebaseError) return checkFirebaseError(e);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("LOGGED", "TRUE");
    return FirebaseAuthResponse.SUCCESS;
  } catch (e) {
    if (e instanceof FirebaseError) return checkFirebaseError(e);
  }
};

export const signUpWithMail = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem("LOGGED", "TRUE");
    return FirebaseAuthResponse.SUCCESS;
  } catch (e) {
    if (e instanceof FirebaseError) return checkFirebaseError(e);
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);

    return FirebaseAuthResponse.SUCCESS;
  } catch (e) {
    if (e instanceof FirebaseError) return checkFirebaseError(e);
  }
};

export const changePassword = async (oldPassword: string, password: string) => {
  try {
    await signInWithEmail(auth.currentUser!.email!, oldPassword);
    await updatePassword(auth.currentUser!, password);
    return FirebaseAuthResponse.SUCCESS;
  } catch (e) {
    if (e instanceof FirebaseError) return checkFirebaseError(e);
  }
};

export const signOutAccount = async () => {
  localStorage.removeItem("LOGGED");
  getAuth().signOut();
};
