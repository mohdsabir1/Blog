import { db, storage } from "@/lib/firebase";
import { Timestamp, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createPost = async ({ userId,data, image }) => {
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
    const imageRef = ref(storage, `posts/${data.slug}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    const fireStoreRef = doc(db, `posts/${data.slug}`);
    await setDoc(fireStoreRef, {
      ...data,
      id: data.slug,
      imageURL: imageUrl,
      userId,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
};

export const updatePost = async ({ data, image }) => {
  if (!data?.name?.trim()) {
    throw new Error("Name is required");
  }
  if (!data?.slug?.trim()) {
    throw new Error("Slug is required");
  }
  var imageUrl = data.imageURL;
  if (image) {
    const imageRef = ref(storage, `posts/${data.slug}`);
    await uploadBytes(imageRef, image);
    imageUrl = await getDownloadURL(imageRef);
  }

  try {
    const fireStoreRef = doc(db, `posts/${data.id}`);
    await updateDoc(fireStoreRef, {
      ...data,
      imageURL: imageUrl,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw new Error(`Failed to create Post: ${error.message}`);
  }
};

export const deletePost = async (id) => {
if(!id)
{
  throw new Error("Id is required");

}

await deleteDoc(doc(db,`posts/${id}`));
}
