import { getAllAuthor } from "@/lib/firebase/author/readFromServer";
import { getAllCategory } from "@/lib/firebase/category/readFromServer";
import { getPost } from "@/lib/firebase/post/readFromServer";
import React from "react";
export async function generateMetadata({ params }) {
  // read route params
  const { postId } = params;
  const post = await getPost(postId);

 
  return {
    title: post.name,
    
    openGraph: {
      images: [post.imageURL],
    },
  }
}
 

export default async function PostDetails({ params }) {
  const { postId } = params;
  const post = await getPost(postId);
  return (
    <main >
    <section className="px-24 py-10 flex flex-col gap-3 max-w-[750px] mx-auto">
    <CategoryCard categoryId={post.categoryId} />
      <h1 className="tex-3xl font-bold">{post.name}</h1>

      <img src={post.imageURL} className=" w-full mx-auto  object-cover" />
      <div className="flex justify-between items-center">
      <p className="text-xs text-gray-500">
        {post.timestamp.toDate().toLocaleDateString()}
      </p>
      <AuthorCard authorId={post.authorId} />
      </div>
      
    <div dangerouslySetInnerHTML={{__html:post.content}}></div>
     
    </section>
    </main>
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
    <div className="flex">
      <div className="flex gap-2 items-center bg-white px-2 py-1  bg-opacity-60 border ">
        <img
          src={category.iconURL}
          className=" h-4 w-4 object-cover rounded-full"
        />
        <h1 className="text-sm text-gray-500">{category.name}</h1>
      </div>
    </div>
  );
}
