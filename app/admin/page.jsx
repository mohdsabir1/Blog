import React from "react";
import CountCard from "./components/CountCard";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CiBag1 } from "react-icons/ci";
import Link from "next/link";

export default function HomePage() {
  const Data = [
    {
      id: 1,
      name: "Posts",
      path: "posts",
     
      icon: <FaRegNoteSticky />,
      link: "/admin/posts"
    },
    {
      id: 2,
      name: "Authors",
      path: "authors",
      icon: <FaUser />,
      link: "/admin/authors",
    },
    {
      id: 3,
      name: "Categories",
      path: "categories",
      icon: <CiBag1 />,
      link: "/admin/categories",
      
    },
    {
      id: 4,
      name: "Queries",
      path: "contactMessages",
      icon: <CiBag1 />,
      link: "/admin/queries",
    }
  ];

  return (
    <main className="p-5 pt-14 grid gap-5 
      grid-cols-1  
      sm:grid-cols-2  
      md:grid-cols-3  
      lg:grid-cols-4  
      xl:grid-cols-6 
    ">
      {Data.map(data => (
        <Link key={data.id} href={data.link} passHref legacyBehavior>
       
            <CountCard name={data.name} path={data.path} icon={data.icon} />
      
        </Link>
      ))}
    </main>
  );
}
