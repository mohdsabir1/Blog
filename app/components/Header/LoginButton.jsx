"use client";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import React from "react";

export default function LoginButton() {
  const { user, isLoading, error, handleSignIn, handleLogout } = useAuth();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (user) {
    return (
      <div>
        <button className=" px-3 py-1 flex items-center bg-black text-white rounded-md" onClick={()=>{handleLogout()}}>
          Logout
        </button>
        <Link href="/admin">
        <div className="flex gap-5">
          {/* <img src={user?.photoURL} alt="profile" /> */}
          <p>{user?.displayName}</p>
          {/* <img src={user?.photoURL}/> */}
          {/* <p>{user?.email}</p> */}
        </div>
        </Link>
      
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        handleSignIn();
      }}
      className=" px-3 py-1 flex items-center bg-black text-white rounded-md"
    >
      <img src="/img/gogle.webp" alt="google" className="h-7" /> With Google
    </button>
  );
}
