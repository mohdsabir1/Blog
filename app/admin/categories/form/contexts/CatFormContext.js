"use client";
import { useAuth } from "@/lib/context/AuthContext";
import { getCategories } from "@/lib/firebase/category/CategoryRead";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/firebase/category/CategoryWrite";
import { useRouter } from "next/navigation";
import React, { useState, createContext, useContext } from "react";

const CategoryForm = createContext();

export default function CatFormContext({ children }) {
  const { user } = useAuth();
  const userId = user?.uid;
  const router = useRouter();
  
  const [data, setData] = useState({
    name: "",
    slug: "",
    iconURL: "",
    id: "",
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

  const resetForm = () => {
    setData({
      name: "",
      slug: "",
      iconURL: "",
      id: "",
    });
    setImage(null);
    setError(null);
    setIsDone(false);
  };

  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!userId) {
      setError("You must be logged in to create a category");
      return;
    }

    setError(null);
    setLoading(true);
    setIsDone(false);

    try {
      await createCategory({ userId, data, image });
      setIsDone(true);
      resetForm();
      router.push("/admin/categories");
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e?.preventDefault();
    if (!userId) {
      setError("You must be logged in to update a category");
      return;
    }

    setError(null);
    setLoading(true);
    setIsDone(false);

    try {
      await updateCategory({ userId, data, image });
      setIsDone(true);
      resetForm();
      router.push("/admin/categories");
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!userId) {
      setError("You must be logged in to delete a category");
      return;
    }

    setError(null);
    setLoading(true);
    setIsDone(false);

    try {
      await deleteCategory({ userId, id });
      setIsDone(true);
      router.push("/admin/categories");
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (id) => {
    setError(null);
    setLoading(true);

    try {
      const docSnapshot = await getCategories(id);
      if (docSnapshot.exists()) {
        const categoryData = docSnapshot.data();
        setData({
          id: categoryData.id,
          name: categoryData.name,
          slug: categoryData.slug,
          iconURL: categoryData.iconURL,
        });
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      setError(error?.message || "Failed to fetch category");
    } finally {
      setLoading(false);
    }
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
    throw new Error("useCategoryForm must be used within a CategoryFormProvider");
  }
  return context;
};