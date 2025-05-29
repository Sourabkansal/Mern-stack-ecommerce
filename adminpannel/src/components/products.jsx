import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const products = () => {
 const [data , setdata]=useState([]);
 
 async function getdata() {
     let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
     let data = await response.json();
     setdata(data)
 }

 useEffect(()=>{
   getdata()
 },[])

  const delItem = async (_id) => {
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${_id}`, {
      method: "DELETE",
    });
     let data = await response.json();
    if (response.ok) {
      setdata((prev) => prev.filter((item) => item._id !== _id));
      toast.success(data.message);
    } else {
      toast.error(data.message);
      console.error("Failed to delete item");
    }
  };
  
  return (
    <div>
      <div>
        {/* <h1>Products</h1> */}
      </div>
      <ToastContainer/>
      <div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="hover:bg-gray-50 border-b">
              <th className="text-left py-2 px-4">ID</th>
              <th className="text-left py-2 px-4" >Image</th>
              <th className="text-left py-2 px-4">Title</th>
              <th className="text-left py-2 px-4">Category</th>
              <th className="text-left py-2 px-4">Price</th>
              <th className="text-left py-2 px-4">Delete</th>
            </tr>
          </thead>
      {
         data.map((item)=>{
               return <>
          <tr className="hover:bg-gray-50 border-b ">
            <td className="py-2 px-4">{item._id}</td>
            <td className="py-2 px-4">
              <img className="h-[30px] w-[30px] rounded-full" src={item.image} alt="img"></img>
            </td>
            <td className="py-2 px-4">{item.name}</td>
            <td className="py-2 px-4">{item.main_category}</td>
            <td className="py-2 px-4">{`$${item.price}`}</td>
            <td className="py-2 px-4">
              <button onClick={()=>delItem(item._id)} className="text-blue-500 border border-blue-500 hover:bg-blue-50 font-semibold py-2 px-4 rounded">
                Delete
              </button>
            </td>
          </tr>
               </>
         })
      }

        </table>
      </div>
    </div>
  );
};

export default products;
