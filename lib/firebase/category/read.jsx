'use client'
import { db } from '@/lib/firebase'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
 
export function useCategories() {
  const { data,error } = useSWRSubscription(['categories'], ([path], { next }) => {
    const ref = collection(db,path)
    const unsub = onSnapshot(ref, (snaps)=>{
      next(null, snaps.docs.map(doc => doc.data()))
    }, (error)=>{
        next(error?.message)
    })
   
   
    return () => unsub()
  })
 
  return {
    data,
    error,
    loading: data===undefined ? true : false
  }


}


export const getCategories = async (id) =>{
  return await getDoc(doc(db, `categories/${id}`))
}