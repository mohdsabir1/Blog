'use client'
import { getAllCategories } from "@/lib/firebase/category/readToShowFronend";
import React,{useState,useEffect} from "react";
import Link from "next/link";
export default  function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Start listening to real-time updates
    const unsubscribe = getAllCategories((newCategories) => {
      setCategories(newCategories); // Update state with the latest categories
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  // const categories = await getAllCategories();
  console.log("the categories", categories);

  return (
    <main className="p-5">
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
     <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 hover:bg-gray-400 rounded-xl p-6 cursor-pointer">
        <img src={category.iconURL} className="w-14 h-14 object-cover rounded-ful "/>
      <h1 key={category.id} className="font-bold">{category.name}</h1>
    </div>
    </Link>
   
  );
}
