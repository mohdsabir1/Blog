'use client';
import { getAllAuthor } from "@/lib/firebase/author/readFromServer";
import { getAllCategory } from "@/lib/firebase/category/readToShowFronend";
import { getALlPost } from "@/lib/firebase/post/readFromServer";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Start listening to real-time updates
    const unsubscribe = getALlPost((newPosts) => {
      setPosts(newPosts); // Update state with the latest posts
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!posts || posts.length === 0) return <h3>No posts found</h3>;

  return (
    <section className="p-10">
      <h1 className="text-xl md:text-3xl font-semibold">Posts you may like</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </section>
  );
}

export function PostCard({ post }) {
 
  return (
    <Link href={`/post/${post.id}`} passHref legacyBehavior>
      <div className="mt-10 cursor-pointer">
        <div className="card bg-base-100 shadow-xl">
          <div className="flex items-center justify-between">
            <AuthorCard authorId={post.authorId} />
            <p className="text-xs text-gray-500">
              {/* {post.timestamp ? post.timestamp.toDate().toLocaleDateString() : 'Unknown Date'} */}
            </p>
          </div>
          <figure>
            <img src={post.imageURL} alt={post.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-sm">{post.name}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

function AuthorCard({ authorId }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await getAllAuthor(authorId);
      setAuthor(authorData);
    };
    
    fetchAuthor();
  }, [authorId]);

  if (!author) return null; // Avoid rendering if author data is not yet loaded

  return (
    <div className="flex gap-2 items-center">
      <img src={author.photoURL} alt={author.name} className="w-5 object-cover rounded-xl" />
      <h1 className="text-sm text-gray-500">{author.name}</h1>
    </div>
  );
}

function CategoryCard({ categoryId }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryData = await getAllCategory(categoryId);
      setCategory(categoryData);
    };
    
    fetchCategory();
  }, [categoryId]);

  if (!category) return null; // Avoid rendering if category data is not yet loaded

  return (
    <div className="">
      <div className="flex gap-2 items-center bg-white px-2 py-1 bg-opacity-60">
        <img src={category.iconURL} alt={category.name} className="h-4 w-4 object-cover rounded-full" />
        <h1 className="text-sm text-gray-500">{category.name}</h1>
      </div>
    </div>
  );
}
