"use client";
import { getCategories } from "@/lib/firebase/category/read";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/firebase/category/write";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, createContext, useContext } from "react";

const CategoryForm = createContext();

export default function CatFormContext({ children }) {
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
      await createCategory({ data, image });
      setIsDone(true);
      // Reset form after successful creation
      setData({ name: "", slug: "" });
      setImage(null);
      router.push("/admin/categories");
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
      await updateCategory({ data, image });
      setIsDone(true);
      // Reset form after successful creation
      setData({ name: "", slug: "" });
      setImage(null);
      router.push("/admin/categories");
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
      await deleteCategory(id);
      router.push("/admin/categories");
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
      const res = await getCategories(id);
      if (res.exists()) {
        setData(res.data());
      } else {
        throw new Error("can't fetch categories");
      }
    } catch (error) {}
  };

  return (
    <CategoryForm.Provider
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
    </CategoryForm.Provider>
  );
}

export const useCategoryForm = () => {
  const context = useContext(CategoryForm);
  if (!context) {
    throw new Error(
      "useCategoryForm must be used within a CategoryFormProvider"
    );
  }
  return context;
};
