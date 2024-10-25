import { db } from "@/lib/firebase"; // Adjust the path if necessary
import { setDoc, doc, Timestamp } from "firebase/firestore"; // Ensure Timestamp is imported

export const createUser = async ({ uid, name, email, photoURL }) => {
  if (!uid) {
    throw new Error("User ID is required");
  }

  try {
    const userRef = doc(db, `admins/${uid}`); // Use uid here
    await setDoc(userRef, {
      uid,
      name,
      email,
      photoURL,
      timestamp: new Date(),
      // Add any additional user properties here
      
    }, { merge: true }); // Use merge to avoid overwriting existing data
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};
