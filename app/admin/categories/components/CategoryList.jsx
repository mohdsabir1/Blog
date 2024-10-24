
"use client";
import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";
import React from "react";

export default function CatList() {
  const { data, error, loading } = useCategories();

  if (loading) return <p className="text-center py-4">Loading...</p>
  if (error) return <p className="text-center py-4 text-red-500">Error: {error.message}</p>
  if (!data) return <p className="text-center py-4">No posts found</p>

  return (
    <section className="container mx-auto px-4">
      <div className="hidden md:block"> {/* Table view for medium screens and up */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-100">Sr.</th>
              <th className="border px-4 py-2 bg-gray-100">Title</th>
              <th className="border px-4 py-2 bg-gray-100">Slug</th>
              <th className="border px-4 py-2 bg-gray-100">Image</th>
              <th className="border px-4 py-2 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.slug}</td>
                <td className="border px-4 py-2">
                  <img src={item.iconURL} alt={item.name} className="h-10 w-auto object-cover" />
                </td>
                <td className="border px-4 py-2">
                  <Link href={`/admin/categories/form?id=${item.id}`} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4"> {/* Card view for small screens */}
        {data.map((item, index) => (
          <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{item.name}</span>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </div>
              <p className="text-sm text-gray-600">{item.slug}</p>
              <img src={item.iconURL} alt={item.name} className="h-32 w-full object-cover rounded" />
              <Link href={`/admin/categories/form?id=${item.id}`} className="block bg-gray-800 text-white text-center px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}