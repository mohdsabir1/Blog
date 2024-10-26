import { db } from "@/lib/firebase";
import {
  getDocs,
  getDoc,
  collection,
  doc,
  query,
  where,
  onSnapshot 
} from "firebase/firestore";

export const getALlPost = (callback) => {
  const postCollection = collection(db, "posts");

  // Set up a real-time listener using onSnapshot
  return onSnapshot(postCollection, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(posts); // Call the callback with the updated posts data
  }, (error) => {
    console.error("Error listening to posts:", error);
  });
};;

export const getPost = async (id) => {
  return await getDoc(doc(db, `posts/${id}`)).then((snap) => snap.data());
};

export const getALlPostByCategory = async (categoryId) => {
  const q = query(
    collection(db, `posts`),
    where("categoryId", "==", categoryId)
  );
  return getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()));
};
export const getAllAuthor = async (id) => {
  try {
    const authorDocRef = doc(db, "authors", id);
    const authorDoc = await getDoc(authorDocRef);

    if (!authorDoc.exists()) {
      console.log("No author found with ID:", id);
      return null;
    }

    return {
      id: authorDoc.id,
      ...authorDoc.data(),
    };
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
};

export const getALlPostByAuthor = async (authorId) => {
  try {
    // Create a query to get posts by authorId
    const q = query(collection(db, "posts"), where("authorId", "==", authorId));

    // Get the documents
    const querySnapshot = await getDocs(q);

    // Map the documents and include the document ID
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(),
    }));

    console.log("Fetched posts:", posts); // Debug log
    return posts;
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    return [];
  }
};
