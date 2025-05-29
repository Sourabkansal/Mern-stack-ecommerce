import React, { useContext, useState } from 'react'
import  {NavLink, useParams } from 'react-router-dom'
import { productContext } from '../contextStore/ProductStore';
import {FaStar} from "react-icons/fa6"
import { ImStarEmpty } from "react-icons/im";
import { FaRegStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartContext } from '../contextStore/Cartcontext';
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";

function producPage() {
 let {product , setproduct } = useContext(productContext);
   let {data , setData} = useContext(CartContext);
 let productid = useParams();
 console.log(productid)
 let singleProduct = product.filter((item)=>{
     return item._id==productid.id
 })


 let [quantityy , setquantityy] = useState();

 let quantityCount = (e)=>{
    setquantityy(e.target.value)
 }

 console.log(quantityy)

 let addtocart=(itemm)=>{
  if(quantityy==undefined){
    quantityy=1;
  }
    console.log(itemm.id)
    let index ; 
    let idd = itemm.id
    let matched = data.filter((item , a )=>{
      item.id==idd ? index = a : " ";
        return item.id==idd
    });
    let unmatched = data.filter((item)=>{
      return item.id!=idd
  });
  if( matched.length > 0  ){
    let obj = matched[0];
    obj = { ...obj, quantity: Number(obj.quantity) + Number(quantityy) };
    let newarr = JSON.parse(JSON.stringify(data)) ;
    newarr.splice(index , 1 , obj )
    setData(newarr)
    localStorage.setItem("Cart" , JSON.stringify(newarr))
    // console.log(newarr)
  }
  else{
    localStorage.setItem("Cart" , JSON.stringify([...unmatched, { ...itemm ,  quantity: quantityy }]))

    setData([...unmatched, { ...itemm ,  quantity: quantityy }])
  }
 }
  let arr = []
 let rating =(rat)=>{
  for(let i = 0 ; i<=4 ; i++){
    if(i<rat){
        arr[i]=1;
    }
    else{
      arr[i]=0;
    }

}
 }


console.log(singleProduct)

  return (
     <>
     
       {
         singleProduct.map((item)=>{
              return <div className="">
              <div className="bg-white flex flex-col justify-center items-center p-4 w-60 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 m-auto my-7 sm:flex-row sm:w-[40%] dark:text-black">
                
                {/* First Div:  */}
                <div className="flex flex-col justify-center items-center w-full ">
                  <div className="text-xs flex justify-end sm:justify-start w-56 font-semibold text-gray-400">
                    id: {item.id}
                  </div>
                  <div className="relative ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-44 w-40 sm:h-[250px]"
                    />
                  </div>
                </div>
                
                {/* Second Div */}
                <div className="flex flex-col items-center w-full mt-3 gap-2">
                 
                  <div className="flex flex-col justify-start w-48 gap-2">
                    <h1 className="font-bold">{item.name}</h1>
                    <h2 className="font-semibold text-gray-600">{item.subcategory}</h2>
                  </div>
                  
               
                  <div className="flex text-sm justify-start items-center w-48">
                    {rating(item.rating)}
                    {arr.map((star) =>
                      star === 1 ? (
                        <FaStar key={star} />
                      ) : (
                        <FaRegStar key={star} />
                      )
                    )}
                    <span className="px-1 font-semibold">{item.rating}</span>
                  </div>
                  
                 
                  <div className="w-48 mt-2">
                    <div className="flex gap-3">
                      <div className="flex gap-1">
                        <span className="no-underline flex text-green-700 font-bold">
                          <FaArrowDown className="mt-1" />10%
                        </span>
                        <span className="line-through font-semibold text-gray-500">{`$${(
                          item.price +
                          item.price * 0.1
                        ).toFixed(2)}`}</span>
                      </div>
                      <div className="font-bold">{`$${item.price}`}</div>
                    </div>
                  </div>
                  
                  
                  <div className="w-48">
                    <label className="text-gray-500 text-xs">Quantity</label>
                    <input
                      onChange={quantityCount}
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="border border-gray-300 w-full h-10 mt-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  
                  <div className="flex justify-between w-48 mt-4">
                    <button
                      onClick={() => addtocart(item)}
                      className="bg-green-600 text-white rounded-md px-6 py-2 shadow-md hover:bg-green-700 transition-all duration-200"
                    >
                      Add to cart
                    </button>
                    <NavLink to="/addcart">
                      <div className="bg-red-600 w-10 h-10 rounded-md flex justify-center items-center text-white text-xl shadow-md hover:shadow-lg transition-all duration-200">
                        <FaShoppingCart />
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
              <p className='mx-5'>Description:-{item.description}</p>
            </div>
            
            
         })
       }
      </>
  )
}

export default producPage