import React from "react";
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
const AddProduct = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

async function adddata(data){
       let response = await fetch (`${import.meta.env.VITE_API_BASE_URL}/adddata`,{
           method:"POST",
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
       })

       let result = await response.json();
       toast.success(result.message)
}

let onsubmit=(data)=>{
       console.log(data)
       adddata(data)
}

  return (
    <div className="w-[95%]  ">
      <ToastContainer/>
      <h1 className="bold text-3xl text-center ">Add New Product</h1>
        {errors.image && <span className="text-red-600">This field is required*</span>}
      <form className="" onSubmit={handleSubmit(onsubmit)} >
        <input
          type="text"
          placeholder="Image URL"
          className="border border-gray-300 p-2 rounded w-full my-4 "
          {...register ( "image" ,{required:true })}
        />
        <div className="flex justify-between ">
          {errors.price && <span className="text-red-600">This field is required*</span>}
          <input
            type="number"
            placeholder="Price"
            className="border border-gray-300 p-2 rounded w-[49%]"
            {...register ( "price" ,{required:true})}
            
          />
            {errors.name && <span className="text-red-600">This field is required*</span>}
          <input
            type="text"
            placeholder="Enter Name"
            className="border border-gray-300 p-2 rounded w-[49%]  "
            {...register ( "name" ,{required:true})}
          />
        </div>
        <div className="flex justify-between my-4">
          <select className="border border-gray-300 px-4 py-2 rounded-md w-[32%] " 
          {...register ( "main_category" ,{required:true})}>
            <option value="">Select Category</option>
            <option value="Men's Wear">Men's Wear</option>
            <option value="Women's Wear">Women's Wear</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewelry">Jewelry</option>
             
          </select>
          {errors.name && <span>This field is required</span>}

          <select
            name="subcategory"
            id="subcategory"
            className="border border-gray-300 px-4 py-2 rounded-md w-[32%]"
                    {...register ( "subcategory")}
          >
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Shorts">Shorts</option>
            <option value="Blazers">Blazers</option>
            <option value="Pants">Pants</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Dresses">Dresses</option>
            <option value="Skirts">Skirts</option>
            <option value="Blouses">Blouses</option>
            <option value="Tops">Tops</option>
            <option value="Goggles">Goggles</option>
            <option value="Headphones">Headphones</option>
            <option value="Smartwatches">Smartwatches</option>
            <option value="Television">Television</option>
            <option value="Speakers">Speakers</option>
            <option value="Chargers">Chargers</option>
            <option value="Rings">Rings</option>
          </select>
          <select className="border border-gray-300 px-4 py-2 rounded-md w-[32%]"
           {...register ( "type")}>
            <option value="">Type</option>
            <option value="bottom">bottom</option>
            <option value="upper">upper</option>
            <option value="Womenwestern">Womenwestern</option>
            <option value="WomenEthnic">WomenEthnic</option>
          </select>
        </div>
        {errors.Description && <span className="text-red-600">This field is required*</span>}

        <input
          type="text"
          placeholder="Description"
          className="border border-gray-300 p-2 rounded w-full"
          {...register ( "description" ,{required:true})}
       
       />
        <div className="flex justify-center mt-4">
          <input
            type="submit"
            value="Submit"
            className="w-[30%] bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
