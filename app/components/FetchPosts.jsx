import { getAllAuthor } from "@/lib/firebase/author/readFromServer";
import { getAllCategory } from "@/lib/firebase/category/readToShowFronend";
import { getALlPost } from "@/lib/firebase/post/readFromServer";
import Link from "next/link";
import React from "react";

export default async function FetchPosts() {
  const posts = await getALlPost();
  console.log("the posts data", posts);

  if (!posts || posts.length === 0) return <h3>No posts found</h3>;

  return (
    <section className="p-10">
      <div className="grid grid-cols-4 gap-5">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
          // Added key prop for list items
        ))}
      </div>
    </section>
  );
}

 export function PostCard({ post }) {
  return (
    <Link className="" href={`/post/${post.id}`} passHref legacyBehavior>
     <div key={post.index} className=" flex flex-col gap-3 p-5">
    
    <div className="relative">
   
    <div className="absolute flex justify-end w-full top-2 right-2"> 
    <CategoryCard categoryId={post?.categoryId} />
    </div>
    <img src={post.imageURL} className="h-[200px] w-full object-cover" />
   
    <h1 className="font-bold">{post.name}</h1>
    </div>
 
    <div className="flex  items-center justify-between">
      <AuthorCard authorId={post?.authorId} />
      <p className="text-xs text-gray-500">
        {post.timestamp.toDate().toLocaleDateString()}
      </p>
     
    </div>
    
  </div>
    </Link>
   
  );
}

async function AuthorCard({ authorId }) {
  const author = await getAllAuthor(authorId);
  return (
    <div className="flex gap-2 items-center">
      <img src={author.photoURL} className=" w-10 object-cover rounded-xl" />
      <h1 className="text-sm text-gray-500">{author.name}</h1>
    </div>
  );
}
async function CategoryCard({ categoryId }) {
  const category = await getAllCategory(categoryId);
  return (
    <div className="">
 <div className="flex gap-2 items-center bg-white px-2 py-1  bg-opacity-60">
      <img src={category.iconURL} className=" h-4 w-4 object-cover rounded-full" />
      <h1 className="text-sm text-gray-500">{category.name}</h1>
    </div>
    </div>
   
  );
}
