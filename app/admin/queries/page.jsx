// 'use client'
// import React, { useEffect, useState } from 'react';
// import { db } from "@/lib/firebase"; // Adjust the import based on your structure
// import { collection, onSnapshot } from "firebase/firestore";
// import Link from 'next/link';

// const ContactMessages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "contactMessages"), (snapshot) => {
//       const messagesData = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setMessages(messagesData);
//       setLoading(false);
//     }, (error) => {
//       console.error("Error fetching messages: ", error);
//       setError("Error fetching messages.");
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, []);

//   if (loading) return <p>Loading messages...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="mx-auto p-6">
//       <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>
      
//       <section>
//       <table className="w-full ">
//         <thead>
//           <tr>
//             <th className="border-2 px-4 py-2 bg-blue-50">Sr.</th>

//             <th className="border-2 px-4 py-2 bg-blue-50">Name</th>
//             <th className="border-2 px-4 py-2 bg-blue-50">Email</th>
//             <th className="border-2 px-4 py-2 bg-blue-50">Message</th>
//             {/* <th className="border-2 px-4 py-2 bg-blue-50">Action</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((msg, key) => {
//             return (
//               <tr>
//                 <td className="border-2 px-4 py-2">{key + 1}</td>
//                 <td className="border-2 px-4 py-2">{msg.name}</td>
//                 <td className="border-2 px-4 py-2">{msg.email}</td>
//                 <td className="border-2 px-4 py-2">{msg.message}</td>
// {/*                
//                 <td className="border-2 px-4 py-2">
//                     <Link href={`/admin/posts/form?id=${msg.id}`} passHref legacyBehavior> 
//                     <button className="bg-gray-800 text-white px-2 py-1 rounded-sm ">
//                     Action
//                   </button></Link>
                 
//                 </td> */}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </section>
//     </div>
//   );
// };

// export default ContactMessages;

"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase"; // Adjust the import based on your structure
import { collection, onSnapshot } from "firebase/firestore";
import Link from 'next/link';
const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "contactMessages"), (snapshot) => {
          const messagesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setMessages(messagesData);
          setLoading(false);
        }, (error) => {
          console.error("Error fetching messages: ", error);
          setError("Error fetching messages.");
          setLoading(false);
        });
    
        return () => unsubscribe(); // Cleanup subscription on unmount
      }, []);
    
     

      if (loading) {
        return (
          <section className="container mx-auto px-4">
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-gray-100">Sr.</th>
                    <th className="border px-4 py-2 bg-gray-100">Name</th>
                    <th className="border px-4 py-2 bg-gray-100">Email</th>
                    <th className="border px-4 py-2 bg-gray-100">Image</th>
                    <th className="border px-4 py-2 bg-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => ( // Adjust the number to your needs
                    <tr key={index}>
                      <td className="border px-4 py-2 skeleton"></td>
                      <td className="border px-4 py-2 skeleton"></td>
                      <td className="border px-4 py-2 skeleton"></td>
                      <td className="border px-4 py-2 skeleton"></td>
                      <td className="border px-4 py-2 skeleton"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            <div className="md:hidden space-y-4">
              {[...Array(3)].map((_, index) => ( // Adjust the number to your needs
                <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="skeleton w-1/2 h-6"></span>
                      <span className="skeleton w-1/4 h-4"></span>
                    </div>
                    <p className="skeleton w-full h-4"></p>
                    <div className="skeleton w-full h-32"></div>
                    <span className="skeleton w-1/2 h-8 block mx-auto"></span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }
  if (error) return <p className="text-center py-4 text-red-500">Error: {error.message}</p>
  if (!messages) return <p className="text-center py-4">No Data found</p>

  return (
    <section className="container mx-auto px-4">
      <div className="hidden md:block"> {/* Table view for medium screens and up */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-100">Sr.</th>
              <th className="border px-4 py-2 bg-gray-100">Name</th>
              <th className="border px-4 py-2 bg-gray-100">Email</th>
              <th className="border px-4 py-2 bg-gray-100">Image</th>
              {/* <th className="border px-4 py-2 bg-gray-100">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {messages.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.message}</td>
                
                {/* <td className="border px-4 py-2">
                  <Link href={`/admin/authors/form?id=${item.id}`} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                    Edit
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4"> {/* Card view for small screens */}
        {messages.map((item, index) => (
          <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{item.name}</span>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </div>
              <p className="text-sm text-gray-600">{item.email}</p>
              <p className="text-sm text-gray-600">{item.message}</p>
              {/* <img src={item.iconURL} alt={item.name} className="h-32 w-full object-cover rounded" /> */}
              <Link href={`/admin/posts/authors?id=${item.id}`} className="block bg-gray-800 text-white text-center px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ContactMessages;