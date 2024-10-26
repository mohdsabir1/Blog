import { PostCard } from "@/app/components/FetchPosts";
import { getAllCategory } from "@/lib/firebase/category/readToShowFronend";
import { getALlPostByCategory } from "@/lib/firebase/post/readFromServer";
import Link from "next/link";
import React from "react";

export default async function CatPage({ params }) {
  const { categoryId } = params;
  const posts = await getALlPostByCategory(categoryId);
  console.log("the post on category" + posts)
  // return
  if(posts.length == "")  return <p>No post from this this category</p>
  return (
    <section className="p-5">
      <div className="flex p-5 gap-3">
        <h1 className="font-bold"><Link href={'/categories'}>Categories</Link> /</h1>
        <CategoryCard categoryId={categoryId} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post, key) => {
          return <PostCard post={post} key={key} />;
        })}
      </div>
    </section>
  );
}

async function CategoryCard({ categoryId }) {
  const category = await getAllCategory(categoryId);
  if (!category) return <h2>Category not found</h2>;
  return (
    <div className="">
      <div className="flex gap-2 items-center bg-white px-2 py-1 border bg-opacity-60">
        <img
          src={category.iconURL}
          className=" h-4 w-4 object-cover rounded-full"
        />
        <h1 className="text-sm text-gray-500">{category.name}</h1>
      </div>
    </div>
  );
}
