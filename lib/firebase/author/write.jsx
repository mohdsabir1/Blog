import { db, storage } from "@/lib/firebase";
import { Timestamp, setDoc, doc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createAuthor = async ({ data, image }) => {
  if (!data?.name?.trim()) {
    throw new Error("Name is required");
  }
 
  if (!image) {
    throw new Error("Image is required");
  }
  const id = doc(collection(db,'id')).id

  try {
    const imageRef = ref(storage, `authors/${id}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    const fireStoreRef = doc(db, `authors/${id}`);
    await setDoc(fireStoreRef, {
      ...data,
      id: id,
      photoURL: imageUrl,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to create author: ${error.message}`);
  }
};

export const updateAuthor = async ({ data, image }) => {
  if (!data?.name?.trim()) {
    throw new Error("Name is required");
  }

  var imageUrl = data.photoURL;
  if (image) {
    const imageRef = ref(storage, `authors/${data.id}`);
    await uploadBytes(imageRef, image);
    imageUrl = await getDownloadURL(imageRef);
  }

  try {
    const fireStoreRef = doc(db, `authors/${data.id}`);
    await updateDoc(fireStoreRef, {
      ...data,
      photoURL: imageUrl,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};

export const deleteAuthor = async (id) => {
if(!id)
{
  throw new Error("Id is required");

}

await deleteDoc(doc(db,`authors/${id}`));
}
