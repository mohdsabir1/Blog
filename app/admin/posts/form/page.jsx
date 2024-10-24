"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePostForm } from "./contexts/PostFormContext";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuthor } from "@/lib/firebase/author/read";
import RTEFields from "./components/RTEFields";

export default function PostForm() {
  const search = useSearchParams();
  const updatePost = search.get("id");
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
    handleDelete,
  } = usePostForm();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (updatePost) {
      fetchData(updatePost);
    }
  }, [updatePost, fetchData]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatePost) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold">Post Form</h2>
          <div className="mt-2">
            {updatePost ? (
              <span className="bg-orange-500 text-xs font-semibold px-2 py-1 rounded-full">Update</span>
            ) : (
              <span className="bg-green-500 text-xs font-semibold px-2 py-1 rounded-full">Create</span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              placeholder="Enter Post Title"
              onChange={(e) => handleData("name", e.target.value)}
              value={data.name}
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Post Slug <span className="text-red-600">*</span>
            </label>
            <input
              id="slug"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              placeholder="Enter Post Slug"
              onChange={(e) => handleData("slug", e.target.value)}
              value={data.slug}
              required
              disabled={updatePost}
            />
          </div>

          <div className="flex justify-between items-center">
            <SelectCategories 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleData={handleData}
            />
            <SelectAuthors 
              selectedAuthor={selectedAuthor}
              setSelectedAuthor={setSelectedAuthor}
              handleData={handleData}
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Post Image <span className="text-red-600">*</span>
            </label>
            <input
              id="image"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </div>

          {image && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Post preview"
                className="h-32 w-32 object-cover rounded-md border-4 border-gray-200 mx-auto"
              />
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-2 rounded" role="alert">
              {error}
            </p>
          )}

          {isDone && (
            <p className="text-green-600 text-sm bg-green-50 p-2 rounded" role="alert">
              Post {updatePost ? "updated" : "created"} successfully!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading || isDone}
              className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${
                loading || isDone ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading
                ? "Processing..."
                : isDone
                ? updatePost
                  ? "Updated Successfully"
                  : "Created Successfully"
                : updatePost
                ? "Update Post"
                : "Create Post"}
            </button>

            {updatePost && (
              <button
                type="button"
                disabled={loading || isDone}
                className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${
                  loading || isDone ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
                onClick={() => handleDelete(updatePost)}
              >
                {loading ? "Processing..." : "Delete Post"}
              </button>
            )}
          </div>
        </form>

        <RTEFields />
      </div>
    </main>
  );
}

function SelectCategories({ selectedCategory, setSelectedCategory, handleData }) {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col gap-2 py-3">
      <label>
        Category <span className="text-red-600 text-sm">*</span>
      </label>
      <select
        name="categoryId"
        id="categoryId"
        className="px-3 py-2 border rounded-sm bg-gray-100 text-black"
        required
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          handleData("categoryId", e.target.value);
        }}
      >
        <option value="">Select Category</option>
        {categories && categories.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}

function SelectAuthors({ selectedAuthor, setSelectedAuthor, handleData }) {
  const { data: authors } = useAuthor();

  return (
    <div className="flex flex-col gap-2 py-3">
      <label>
        Author <span className="text-red-600 text-sm">*</span>
      </label>
      <select
        name="authorId"
        id="authorId"
        className="px-3 py-2 border rounded-sm bg-gray-100 text-black"
        required
        value={selectedAuthor}
        onChange={(e) => {
          setSelectedAuthor(e.target.value);
          handleData("authorId", e.target.value);
        }}
      >
        <option value="">Select Author</option>
        {authors && authors.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}
