import { doc, getDoc,getDocs,collection} from "firebase/firestore";
import { db } from "@/lib/firebase";
// Adjust the function to fetch a single document
export const getAllAuthor = async (id) => {
  const authorDocRef = doc(db, `authors`, id); // Use doc() to reference a specific document
  const authorDoc = await getDoc(authorDocRef); // Fetch the document
  return authorDoc.exists() ? authorDoc.data() : null; // Check if it exists and return data
}
// export const getAllAuthors = async (authorsId)=>{
//   const q = query(collection(db, `authors`),where('id', '==', authorsId))
//   return getDocs (q).then((snaps)=>snaps.docs.map((d)=> d.data()))
// }

export const getAllAuthors = async () => {
  const authorsSnapshot = await getDocs(collection(db, "authors"));
  return authorsSnapshot.docs.map((doc) => ({
    id: doc.id, // Include document ID
    ...doc.data(),
  }));
};