import { db, storage } from "@/lib/firebase";
import { Timestamp, setDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createCategory = async ({ userId, data, image }) => {
  if (!data?.name?.trim()) {
    throw new Error("Name is required");
  }
  if (!data?.slug?.trim()) {
    throw new Error("Slug is required");
  }
  if (!image) {
    throw new Error("Image is required");
  }

  try {
    // Use slug as the document ID consistently
    const documentId = data.slug;
    const imageRef = ref(storage, `categories/${documentId}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    const fireStoreRef = doc(db, 'categories', documentId);
    await setDoc(fireStoreRef, {
      name: data.name,
      slug: data.slug,
      id: documentId, // Store the same value as document ID
      iconURL: imageUrl,
      userId,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};

export const updateCategory = async ({ userId, data, image }) => {
  if (!data?.name?.trim()) {
    throw new Error("Name is required");
  }
  if (!data?.slug?.trim()) {
    throw new Error("Slug is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const documentId = data.id || data.slug;
    const fireStoreRef = doc(db, 'categories', documentId);
    const categoryDoc = await getDoc(fireStoreRef);

    if (!categoryDoc.exists()) {
      throw new Error("Category does not exist");
    }

    const categoryData = categoryDoc.data();

    // Check if the current user is allowed to update this category
    if (categoryData.userId !== userId) {
      throw new Error("You are not authorized to update this category");
    }

    let imageUrl = data.iconURL;
    if (image) {
      const imageRef = ref(storage, `categories/${documentId}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(fireStoreRef, {
      name: data.name,
      slug: data.slug,
      iconURL: imageUrl,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
};

export const deleteCategory = async ({ userId, id }) => {
  if (!id) throw new Error("Id is required");
  if (!userId) throw new Error("User ID is required");

  try {
    const fireStoreRef = doc(db, 'categories', id);
    const categoryDoc = await getDoc(fireStoreRef);

    if (!categoryDoc.exists()) {
      throw new Error("Category does not exist");
    }

    const categoryData = categoryDoc.data();

    // Check if the current user is allowed to delete this category
    if (categoryData.userId !== userId) {
      throw new Error("You are not authorized to delete this category");
    }

    await deleteDoc(fireStoreRef);
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
};