"use client";
import useCollectionCount from "@/lib/firebase/count";
import React from "react";

export default function CountCard({ userId,path, name, icon }) {
  const { data, error, isLoading } = useCollectionCount({ userId, path, name, icon });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="flex gap-3  bg-blue-50 items-center rounded px-4 py-2">
      {icon}
      <div className="flex items-center gap-4">
        <h1 className="font-bold ">{name}</h1>

        <p className="text-xl font-bold">{data}</p>
      </div>
    </div>
  );
}
