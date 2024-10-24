"use client";


import { getAuthor } from "@/lib/firebase/author/read";
import { createAuthor, deleteAuthor, updateAuthor } from "@/lib/firebase/author/write";
import { useRouter } from "next/navigation";
import React, { useState, createContext, useContext } from "react";

const AuthorFormContext = createContext();

export default function AuthorFormContextProvider({ children }) {
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
      await createAuthor({ data, image });
      setIsDone(true);
      // Reset form after successful creation
      setData({ name: "", slug: "" });
      setImage(null);
      router.push("/admin/authors");
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
      await updateAuthor({ data, image });
      setIsDone(true);
      // Reset form after successful creation
      setData({ name: "", slug: "" });
      setImage(null);
      router.push("/admin/authors");
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
      await deleteAuthor(id);
      router.push("/admin/authors");
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
      const res = await getAuthor(id);
      if (res.exists()) {
        setData(res.data());
      } else {
        throw new Error("can't fetch categories");
      }
    } catch (error) {}
  };

  return (
    <AuthorFormContext.Provider
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
    </AuthorFormContext.Provider>
  );
}

export const useAuthorForm = () => {
  const context = useContext(AuthorFormContext);
  if (!context) {
    throw new Error(
      "useCategoryForm must be used within a CategoryFormProvider"
    );
  }
  return context;
};
