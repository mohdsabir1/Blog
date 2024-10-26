
'use client'

import { IoHome } from "react-icons/io5";
import { FaBlogger } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import LoginButton from "./LoginButton";
import { SiLibreofficewriter } from "react-icons/si";
import AuthContextProvider, { useAuth } from "@/lib/context/AuthContext";

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
  >
    {children}
  </Link>
)

const MobileNavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
  >
    {children}
  </Link>
)

export default function Header() {
    const { user } = useAuth();

  console.log(user)
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
     {!user &&   
      <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
            <img src="/img/logo.png" alt="logo" className="h-10" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/categories">Categories</NavLink>
               
                <NavLink href="/authors">Author</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
          <AuthContextProvider>
      
            <LoginButton />
              </AuthContextProvider>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink href="/">Home</MobileNavLink>
                <MobileNavLink href="/categories">Categories</MobileNavLink>
             
                <MobileNavLink href="/authors">Author</MobileNavLink>
                <MobileNavLink href="/contact">Contact</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
          <AuthContextProvider>
      
             <LoginButton />
              </AuthContextProvider>
          </div>
        </div>
      )}
      
    </nav>}
 
    </>
   
  )
}