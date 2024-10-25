import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
// Adjust the function to fetch a single document
export const getAllCategory = async (id) => {
  const authorDocRef = doc(db, `categories`, id); // Use doc() to reference a specific document
  const authorDoc = await getDoc(authorDocRef); // Fetch the document
  return authorDoc.exists() ? authorDoc.data() : null; // Check if it exists and return data
}
export const getAllCategories = async () => {
  const categoryCollection = collection(db, 'categories'); // Reference the collection
  const snapshot = await getDocs(categoryCollection); // Fetch all documents

  return snapshot.docs.map((doc) => doc.data()); // Return an array of category data
}

