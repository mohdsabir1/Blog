import { db, storage } from "@/lib/firebase";
import { Timestamp, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createCategory = async ({ data, image }) => {
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
    const imageRef = ref(storage, `categories/${data.slug}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    const fireStoreRef = doc(db, `categories/${data.slug}`);
    await setDoc(fireStoreRef, {
      ...data,
      id: data.slug,
      iconURL: imageUrl,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};

export const updateCategory = async ({ data, image }) => {
  if (!data?.name?.trim()) {
    throw new Error("Name is required");
  }
  if (!data?.slug?.trim()) {
    throw new Error("Slug is required");
  }
  var imageUrl = data.iconURL;
  if (image) {
    const imageRef = ref(storage, `categories/${data.slug}`);
    await uploadBytes(imageRef, image);
    imageUrl = await getDownloadURL(imageRef);
  }

  try {
    const fireStoreRef = doc(db, `categories/${data.id}`);
    await updateDoc(fireStoreRef, {
      ...data,
      iconURL: imageUrl,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};

export const deleteCategory = async (id) => {
if(!id)
{
  throw new Error("Id is required");

}

await deleteDoc(doc(db,`categories/${id}`));
}
