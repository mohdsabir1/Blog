'use client'
import React from 'react'
import AuthContextProvider, { useAuth } from '@/lib/context/AuthContext'
import Sidebar from './components/Sidebar'
import { useAdmin } from '@/lib/firebase/admim/read'

export default function Layout({ children }) {
 return <AuthContextProvider>
  <InnerLayoutProvider>
    {children}
  </InnerLayoutProvider>
 
 </AuthContextProvider>
}


function InnerLayoutProvider({children})
{
  const {user,isLoading:authisLoading} = useAuth()
  const {data,error,isLoading} = useAdmin({Uid:user?.uid})

  if(authisLoading|| isLoading){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Error: {error.message}</p>
  }
  if(!data){
    return <p>No admin data found</p>
  }
  return (

      <section className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </section>
 
  )
}