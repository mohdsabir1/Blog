import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import AuthList from "./components/List";

export default function Authors() {
  return (
    <section className="p-6 w-full flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Authors</h1>
        <Link href={"/admin/authors/form"} legacyBehavior passHref>
          <button className="bg-gray-800 text-white px-2 py-1 rounded-sm flex items-center gap-1">
            {" "}
            <IoMdAdd />
            Add{" "}
          </button>
        </Link>
      </div>
      <AuthList />
    </section>
  );
}
