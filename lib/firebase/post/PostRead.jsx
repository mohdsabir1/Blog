
'use client'
import { db } from '@/lib/firebase'
import { collection, query, where, onSnapshot, doc, getDoc  } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { useAuth } from "@/lib/context/AuthContext"; // Assuming you have an auth context

export function usePosts() {
  const { user } = useAuth(); // Retrieve the current user
  const userId = user?.uid; // User ID of the currently logged-in user

  const { data, error } = useSWRSubscription(['posts', userId], ([path, userId], { next }) => {
    if (!userId) return;

    const ref = query(collection(db, path), where("userId", "==", userId)); // Filter by userId
    const unsub = onSnapshot(ref, (snaps) => {
      next(null, snaps.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Ensure ID is included in data
    }, (error) => {
      next(error?.message)
    });

    return () => unsub();
  });

  return {
    data,
    error,
    loading: data === undefined
  };
}
// File: /lib/firebase/category/CategoryRead.js



export const getPosts = async (id) => {
  const docRef = doc(db, 'posts', id);  // Referencing specific category doc
  const docSnapshot = await getDoc(docRef);  // Fetching document snapshot
  return docSnapshot;  // Return the snapshot for data access
};
