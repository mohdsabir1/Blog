'use client';
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import useSWR from "swr";
import { db } from "../firebase";

// Fetcher function to get the count from Firestore
const fetcher = async (path, userId) => {
  try {
    // Log for debugging
    // console.log("Fetching count for path:", path, "userId:", userId);

    // Define the collection and query filtering by userId
    const collectionRef = collection(db, path);
    const q = query(collectionRef, where("userId", "==", userId));

    // Fetch count from the server
    const snapshot = await getCountFromServer(q);

    // Check if data is returned correctly
    // console.log("Snapshot Data:", snapshot.data());

    // Return count (ensure this is correct)
    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching count:", error);
    throw error;
  }
};

// SWR hook to use the collection count
export default function useCollectionCount({ path, userId }) {
  const { data, error, isValidating } = useSWR(
    userId ? [path, userId] : null,  // SWR only fetches if userId is available
    ([path, userId]) => fetcher(path, userId)
  );

  // // Log the fetched data and error for debugging
  // console.log("Fetched data:", data);
  // console.log("Error in fetching:", error);

  return { data, isLoading: isValidating, error };
}
