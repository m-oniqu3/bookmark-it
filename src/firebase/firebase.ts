import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import { doc, getFirestore, initializeFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { BookRecord } from "../store/features/library/librarySlice";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

export const auth = getAuth(app);
export const database = getFirestore(app);

export const provider = new GoogleAuthProvider().setCustomParameters({
  prompt: "select_account",
});

export const addLibraryToFirebase = async (user_id: string, library: BookRecord) => {
  console.log("called addLibraryToFirebase");
  const currentDoc = doc(database, "library", `${user_id}`);
  await setDoc(currentDoc, { library }, { merge: true });
};

// sign user out and remove data from local storage
export const signUserOut = async () => {
  await signOut(auth)
    .then(() => localStorage.removeItem("user"))
    .catch(() => toast.error("Error signing out. Please try again.", { autoClose: 5000 }));
};
