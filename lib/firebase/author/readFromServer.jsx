import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
// Adjust the function to fetch a single document
export const getAllAuthor = async (id) => {
  const authorDocRef = doc(db, `authors`, id); // Use doc() to reference a specific document
  const authorDoc = await getDoc(authorDocRef); // Fetch the document
  return authorDoc.exists() ? authorDoc.data() : null; // Check if it exists and return data
}
