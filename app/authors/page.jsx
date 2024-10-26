
import React from "react";
import Link from "next/link";
import { getAllAuthors } from "@/lib/firebase/author/readFromServer";
export default async function CategoriesPage() {
  const authors = await getAllAuthors();
  console.log("the categories", authors);

  return (
    <main className="p-5">
     <section className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3">
        {authors.map((author,key) => {
        return <AuthorsCard author={author} key={key}/>; // Ensure each element has a unique key
      })}
        </section>
     
    </main>
  );
}

function AuthorsCard({ author }) {
  return (
    <Link href={`authors/${author.id}`}>
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 hover:bg-gray-400 rounded-xl p-6 cursor-pointer">
        <img src={author.photoURL} className="w-14 h-14 object-cover rounded-ful "/>
      <h1 key={author.id} className="font-bold">{author.name}</h1>
    </div>
    </Link>
   
  );
}
