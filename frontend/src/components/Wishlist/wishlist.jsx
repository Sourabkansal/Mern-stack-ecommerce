import React from 'react'
import { useContext } from 'react'
import { wishlistContext } from '../contextStore/WishlistContext'
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { productContext } from '../contextStore/ProductStore'
import { NavLink } from 'react-router-dom'
import { MdAutoDelete } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";


const wishlist = () => {
  
  

    const {wishlistt , setwishlistt} = useContext(wishlistContext);
    // let wishlistdata = localStorage.getItem("wishlist")
    // let wishdata2 = JSON.parse(wishlistdata)
    // console.log(wishdata2)
    //   const { product , setproduct } = useContext(productContext);
    let deletewishlist = (idd)=>{

      let unmatched = wishlistt.filter((item)=>{
            return item.id!=idd
      })
      localStorage.setItem("wishlist" , JSON.stringify(unmatched ))
      setwishlistt(unmatched)
    }
  
    console.log(wishlistt)

    let arr = [];
    let rating = (rat) => {
      for (let i = 0; i <= 4; i++) {
        if (i < rat) {
          arr[i] = 1;
        } else {
          arr[i] = 0;
        }
      }
    };

  return (
    <div className="  flex flex-col gap-6  items-center sm:flex-row justify-center my-10  flex-wrap sm:gap-8   ">
               {wishlistt.map((item) => {
                 return (
                   <div>
                       <div className=" bg-white  flex flex-col justify-center items-center p-4 w-60 sm:w-56 border border-gray-300 rounded-lg  shadow-md hover:shadow-xl transition-all duration-200 ">
                         <div className="text-xs flex justify-end w-56 sm:w-48 font-semibold text-gray-400">
                           id:{item.id}
                         </div>
       
                         <div className="relative">
                           <img
                             src={item.image}
                             alt=""
                             className="object-contain h-44 w-40 sm:w-36"
                           />
                           
                         </div>
                         <div className="flex flex-col justify-start  w-48 sm:w-44 mt-3">
                           <div className="">
                             {" "}
                             <h1 className="font-bold">{item.subcategory}</h1>
                           </div>
       
                           <div className="flex text-sm justify-start items-center">
                             {rating(item.rating)}
                             {arr.map((item) => {
                               if (item == 1) {
                                 return <FaStar />;
                               } else {
                                 return <FaRegStar />;
                               }
                             })}
                             
                             <span className="px-1 font-semibold">{item.rating}</span>
                           </div>
                         </div>
                         {/* div in div */}
                         <div className="flex justify-between w-48 sm:w-44 mt-6">
                           <div className="">
                             <div className=" text-xs ">
                               <span className="line-through font-semibold ">{`$ ${(
                                 item.price +
                                 item.price * (10 / 100)
                               ).toFixed(2)}`}</span>
                               <span className="no-underline text-xs bg-blue-200 px-1  ml-1 rounded-sm">
                                 -10%
                               </span>
                             </div>
                             <div className="font-bold">{`$ ${item.price}`}</div>
                           </div>

                                 <NavLink key={item.id} to={`/product/${item._id}`}>
                           <div className="flex justify-center items-center text-2xl bg-blue-700 w-8 h-8 text-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ">
                             <MdOutlineShoppingCart />
                           </div>
                           </NavLink>
                           <div onClick={()=>deletewishlist(item.id)} className="flex justify-center items-center text-2xl bg-red-600 w-8 h-8 text-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ">
                             <MdOutlineDeleteSweep/>
                           </div>
                         </div>
                       </div>
                     </div>
                 );
               })}
             </div>
  )
}

export default wishlist