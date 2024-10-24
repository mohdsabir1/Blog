'use client'
import React from "react";
import { IoHome } from "react-icons/io5";
import { FaBlogger } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import LoginButton from "./LoginButton";
import AuthContextProvider, { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";


export default function Header() {
  const { user } = useAuth();

  console.log(user)
  return (
    <>
    {!user &&  <nav className="px-7 py-3 border-b flex justify-between items-center  ">
    <Link href={"/"}>
      <img src="/img/logo.png" alt="logo" className="h-10" />
    </Link>

    <ul className="flex  gap-6 items-center">
      <Link href={"/"} passHref legacyBehavior>
        <li className="flex items-center gap-1 cursor-pointer ">
          <IoHome />
          Home
        </li>
      </Link>
      <Link href={"/categories"}>
        <li className="flex items-center gap-1 cursor-pointer ">
          <FaBlogger />
          Categories
        </li>
      </Link>
      <Link href={"/contact"}>
        <li className="flex items-center gap-1 cursor-pointer ">
          <MdContacts />
          Contact
        </li>
      </Link>
    </ul>
    <AuthContextProvider>
      
      <LoginButton />
        </AuthContextProvider>
  </nav> }
  
   </>
  
  );
}
