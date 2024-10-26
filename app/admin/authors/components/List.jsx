
"use client";
import { useAuthor } from "@/lib/firebase/author/AuthorRead";
import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function AuthList() {
  const { data, error, loading } = useAuthor();


  if (loading) {
    return (
      <section className="container mx-auto px-4">
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">Sr.</th>
                <th className="border px-4 py-2 bg-gray-100">Name</th>
                <th className="border px-4 py-2 bg-gray-100">Email</th>
                <th className="border px-4 py-2 bg-gray-100">Image</th>
                <th className="border px-4 py-2 bg-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => ( // Adjust the number to your needs
                <tr key={index}>
                  <td className="border px-4 py-2 skeleton"></td>
                  <td className="border px-4 py-2 skeleton"></td>
                  <td className="border px-4 py-2 skeleton"></td>
                  <td className="border px-4 py-2 skeleton"></td>
                  <td className="border px-4 py-2 skeleton"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {[...Array(3)].map((_, index) => ( // Adjust the number to your needs
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="skeleton w-1/2 h-6"></span>
                  <span className="skeleton w-1/4 h-4"></span>
                </div>
                <p className="skeleton w-full h-4"></p>
                <div className="skeleton w-full h-32"></div>
                <span className="skeleton w-1/2 h-8 block mx-auto"></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (error) return <p className="text-center py-4 text-red-500">Error: {error.message}</p>
  if (!data) return <p className="text-center py-4">No posts found</p>

  return (
    <section className="container mx-auto px-4">
      <div className="hidden md:block"> {/* Table view for medium screens and up */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-100">Sr.</th>
              <th className="border px-4 py-2 bg-gray-100">Name</th>
              <th className="border px-4 py-2 bg-gray-100">Email</th>
              <th className="border px-4 py-2 bg-gray-100">Image</th>
              <th className="border px-4 py-2 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">
                  <img src={item.photoURL} alt={item.name} className="h-10 w-auto object-cover" />
                </td>
                <td className="border px-4 py-2">
                  <Link href={`/admin/authors/form?id=${item.id}`} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
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
              <img src={item.photoURL} alt={item.name} className="h-32 w-full object-cover rounded" />
              <Link href={`/admin/posts/authors?id=${item.id}`} className="block bg-gray-800 text-white text-center px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}