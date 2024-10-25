import { getAllCategories } from "@/lib/firebase/category/readToShowFronend";
import React from "react";
import Link from "next/link";
export default async function CategoriesPage() {
  const categories = await getAllCategories();
  console.log("the categories", categories);

  return (
    <main className="p-5">
        <section className="grid grid-cols-4">
        {categories.map((category,key) => {
        return <CategoriesCard category={category} key={key}/>; // Ensure each element has a unique key
      })}
        </section>
     
    </main>
  );
}

function CategoriesCard({ category }) {
  return (
    <Link href={`categories/${category.id}`}>
     <div className="flex flex-col justify-center items-center gap-2 hover:bg-blue-500 rounded-xl p-6 cursor-pointer">
        <img src={category.iconURL} className="w-24 h-24 object-cover rounded-ful "/>
      <h1 key={category.id} className="font-bold">{category.name}</h1>
    </div>
    </Link>
   
  );
}
