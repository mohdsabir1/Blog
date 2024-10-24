"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

const links = [
  { name: "Dashboard", link: "/admin", icon: LayoutDashboard },
  { name: "Posts", link: "/admin/posts", icon: FileText },
  { name: "Categories", link: "/admin/categories", icon: FolderKanban },
  { name: "Authors", link: "/admin/authors", icon: Users },
  { name: "Queries", link: "/admin/queries", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleLogout } = useAuth(true);
  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed z-50 top-4 right-0 p-2 bg-gray-800 text-white rounded-md"
        aria-label="Toggle Sidebar"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out bg-gray-800 text-white`}
      >
        <div className="flex flex-col h-full">
          <Link href={"/admin"} legacyBehavior passHref>
            <div className="p-4 text-xl font-semibold border-b border-gray-700 cursor-pointer">
              Admin Panel
            </div>
          </Link>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              {links.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-gray-700 ${
                        pathname === item.link
                          ? "bg-gray-700 text-white"
                          : "text-gray-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                {" "}
                <button
                  className=" flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-gray-700"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
