"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { getPosts } from "@/lib/firebase/post/PostRead";
import { createPost, deletePost, updatePost } from "@/lib/firebase/post/PostWrite";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, createContext, useContext } from "react";

const PostForm = createContext();

export default function PostFormContext({ children }) {
  const { user } = useAuth();
  const userId = user?.uid;
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [image, setImage] = useState(null);

  const handleData = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreate = async (e) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    setIsDone(false);

    try {
      await createPost({ userId,data, image });
      setIsDone(true);
      // Reset form after successful creation
      setData({ name: "", slug: "" });
      setImage(null);
      router.push("/admin/posts");
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setError(null);
    setLoading(true);
    setIsDone(false);

    try {
      await updatePost({ data, image });
      setIsDone(true);
      // Reset form after successful creation
      setData({ name: "", slug: "" });
      setImage(null);
      router.push("/admin/posts");
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setError(null);
    setLoading(true);
    setIsDone(false);

    try {
      await deletePost(id);
      router.push("/admin/posts");
      setLoading(false);
      setIsDone(true);
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
      setError(error?.message);
    }
  };

  const fetchData = async (id) => {
    setError(null);

    try {
      const res = await getPosts(id);
      if (res.exists()) {
        setData(res.data());
      } else {
        throw new Error("can't fetch categories");
      }
    } catch (error) {}
  };

  return (
    <PostForm.Provider
      value={{
        data,
        loading,
        error,
        handleCreate,
        handleData,
        isDone,
        image,
        setImage,
        fetchData,
        handleDelete,
        handleUpdate,
      }}
    >
      {children}
    </PostForm.Provider>
  );
}

export const usePostForm = () => {
  const context = useContext(PostForm);
  if (!context) {
    throw new Error(
      "usePostForm must be used within a PostFormProvider"
    );
  }
  return context;
};
