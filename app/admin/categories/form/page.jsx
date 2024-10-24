"use client";
import React, { useEffect } from "react";
import { useCategoryForm } from "./contexts/CatFormContext";
import { useSearchParams } from "next/navigation";

export default function CatForm() {
  const search = useSearchParams();
  const updateCat = search.get("id");
  const {
    data,
    loading,
    error,
    handleCreate,
    handleData,
    isDone,
    image,
    setImage,
    fetchData,
    handleUpdate,
    handleDelete
  } = useCategoryForm();

  useEffect(() => {
    if (updateCat) {
      fetchData(updateCat);
    }
  }, [updateCat]);

  return (
    <main className="w-full p-6 flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <h2 className="font-bold">Category | Form</h2>
        {updateCat ? (
          <div>
            <h3 className="text-white bg-orange-500 px-3 py-1 ">Update</h3>
          </div>
        ) : (
          <div>
            <h3 className="text-white bg-green-500 px-3 py-1 ">Create</h3>
          </div>
        )}
      </div>

      <section className="flex">
        <form
          className="flex flex-col gap-2 bg-blue-200 p-5 rounded-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (updateCat) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Category Name <span className="text-red-600 text-sm">*</span>
            </label>
            <input
              id="name"
              className="px-3 py-2 border rounded-sm bg-gray-100 text-black"
              type="text"
              placeholder="Enter Category Name"
              onChange={(e) => handleData("name", e.target.value)}
              value={data.name}
              required
            />
          </div>

          <div className="flex flex-col gap-2 py-3">
            <label htmlFor="slug">
              Category Slug <span className="text-red-600 text-sm">*</span>
            </label>
            <input
              id="slug"
              className="px-3 py-2 border rounded-sm bg-gray-100 text-black"
              type="text"
              placeholder="Enter Category Slug"
              onChange={(e) => handleData("slug", e.target.value)}
              value={data.slug}
              required
            />
          </div>

          {image && (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Category preview"
                className="h-24 object-contain"
              />
              {/* <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                aria-label="Remove image"
              >
                ×
              </button> */}
            </div>
          )}
          {data.iconURL && (
            <div className="relative">
              <img
                src={data.iconURL}
                alt="Category preview"
                className="h-24 object-contain"
              />
              {/* <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                aria-label="Remove image"
              >
                ×
              </button> */}
            </div>
          )}
          <div className="flex flex-col gap-2 py-3">
            <label htmlFor="image">
              Category Image <span className="text-red-600 text-sm">*</span>
            </label>
            <input
              id="image"
              className="px-3 py-2 border rounded-sm bg-gray-100 text-black"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </div>

          {error && (
            <p
              className="text-red-400 text-sm bg-red-50 p-2 rounded"
              role="alert"
            >
              {error}
            </p>
          )}

          {isDone && (
            <p
              className="text-green-600 text-sm bg-green-50 p-2 rounded"
              role="alert"
            >
              Category created successfully!
            </p>
          )}
  
          <button
            type="submit"
            disabled={loading || isDone}
            className={`px-4 py-2 rounded-sm ${
              loading || isDone
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            } text-white transition-colors`}
          >
            {loading
              ? "Creating..."
              : isDone
              ? updateCat
                ? "Update Successfully"
                : "New Category Created!"
              : updateCat
              ? "Update Category"
              : " Create Category"}
          </button>

          {updateCat && 
          <button
            type="submit"
            disabled={loading || isDone}
            className={`px-4 py-2 rounded-sm ${
              loading || isDone
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-800 hover:bg-red-700"
            } text-white transition-colors`}
           onClick={(e)=>{
         
            handleDelete(updateCat);
           }}
          >

           {loading ? "Loading....": "Delete"}
          </button>}
        </form>
      </section>
    </main>
  );
}
