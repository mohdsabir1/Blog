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
      <h1 className="text-xl md:text-3xl font-semibold">Posts you may like</h1>
      <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-5">
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
    <>
    
      <Link className="" href={`/post/${post.id}`} passHref legacyBehavior>
        <div className="mt-10 cursor-pointer">
          <div className="card bg-base-100  shadow-xl">
            <div className="flex  items-center justify-between">
              <AuthorCard authorId={post?.authorId} />
              <p className="text-xs text-gray-500">
                {post.timestamp.toDate().toLocaleDateString()}
              </p>
            </div>
            <figure>
              <img src={post.imageURL} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-sm">
                {post.name}
                {/* <div className="badge badge-secondary">NEW</div> */}
              </h2>
       
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

async function AuthorCard({ authorId }) {
  const author = await getAllAuthor(authorId);
  return (
    <div className="flex gap-2 items-center">
      <img src={author.photoURL} className=" w-5 object-cover rounded-xl" />
      <h1 className="text-sm text-gray-500">{author.name}</h1>
    </div>
  );
}
async function CategoryCard({ categoryId }) {
  const category = await getAllCategory(categoryId);
  return (
    <div className="">
      <div className="flex gap-2 items-center bg-white px-2 py-1  bg-opacity-60">
        <img
          src={category.iconURL}
          className=" h-4 w-4 object-cover rounded-full"
        />
        <h1 className="text-sm text-gray-500">{category.name}</h1>
      </div>
    </div>
  );
}
