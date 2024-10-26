import { PostCard } from "@/app/components/FetchPosts";
import { getAuthor } from "@/lib/firebase/author/AuthorRead";
import { getAllAuthor } from "@/lib/firebase/author/readFromServer";
import { getAllCategory } from "@/lib/firebase/category/readToShowFronend";
import { getALlPostByAuthor } from "@/lib/firebase/post/readFromServer";
import Link from "next/link";
import React from "react";

export default async function AuthPage({ params }) {
  const { authorId } = params;
  console.log("Author ID:", authorId); // Debugging the authorId
  
  // Fetch posts by authorId
  const posts = await getALlPostByAuthor(authorId);

  if (!posts || posts.length === 0) {
    return <p>No posts found for this author.</p>;
  }

  return (
    <section className="p-5">
      <div className="flex p-5 gap-3">
        <h1 className="font-bold">
          <Link href={'/authors'}>Authors</Link> /
        </h1>
        <AuthorCard authorId={authorId} />
      </div>

     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post, key) => (
          <PostCard post={post} key={key} />
        ))}
      </div>
    </section>
  );
}

async function AuthorCard({ authorId }) {
  const author = await getAllAuthor(authorId);
  if (!author) return <h2>Author  not found</h2>;

  return (
    <div className="flex gap-2 items-center bg-white px-2 py-1 border bg-opacity-60">
      <img
        src={author.photoURL}
        className="h-4 w-4 object-cover rounded-full"
        alt="Category Icon"
      />
      <h1 className="text-sm text-gray-500">{author.name}</h1>
    </div>
  );
}
