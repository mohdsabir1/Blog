import  { db }from "@/lib/firebase"
import  { getDocs,getDoc, collection,doc, query, where } from "firebase/firestore"

 export const getALlPost = async ()=>{
    return getDocs (collection(db,'posts')).then((snaps)=>snaps.docs.map((d)=> d.data()))
}

export const getPost = async (id) => {
    return await getDoc(doc(db, `posts/${id}`)).then((snap)=>snap.data());
  };

  export const getALlPostByCategory = async (categoryId)=>{
    const q = query(collection(db, `posts`),where('categoryId', '==', categoryId))
    return getDocs (q).then((snaps)=>snaps.docs.map((d)=> d.data()))
}
