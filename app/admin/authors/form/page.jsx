'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthorForm } from './contexts/AuthorFormContext';

export default function AuthorForm() {
  const search = useSearchParams();
  const updateAuth = search.get('id');
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
  } = useAuthorForm();

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (updateAuth) {
      fetchData(updateAuth);
    }
  }, [updateAuth, fetchData]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateAuth) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold">Author Form</h2>
          <div className="mt-2">
            {updateAuth ? (
              <span className="bg-orange-500 text-xs font-semibold px-2 py-1 rounded-full">Update</span>
            ) : (
              <span className="bg-green-500 text-xs font-semibold px-2 py-1 rounded-full">Create</span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Author Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              placeholder="Enter Author Name"
              onChange={(e) => handleData('name', e.target.value)}
              value={data.name}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Author Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="email"
              placeholder="Enter Author Email"
              onChange={(e) => handleData('email', e.target.value)}
              value={data.email}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Author Image <span className="text-red-600">*</span>
            </label>
            <input
              id="image"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </div>

          {(previewUrl || data.photoURL) && (
            <div className="mt-2">
              <img
                src={previewUrl || data.photoURL}
                alt="Author preview"
                className="h-32 w-32 object-cover rounded-full mx-auto border-4 border-gray-200"
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
              Author {updateAuth ? 'updated' : 'created'} successfully!
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
                ? 'Processing...'
                : isDone
                ? updateAuth
                  ? 'Updated Successfully'
                  : 'Created Successfully'
                : updateAuth
                ? 'Update Author'
                : 'Create Author'}
            </button>

            {updateAuth && (
              <button
                type="button"
                disabled={loading || isDone}
                className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${
                  loading || isDone ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
                onClick={() => handleDelete(updateAuth)}
              >
                {loading ? 'Processing...' : 'Delete Author'}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
