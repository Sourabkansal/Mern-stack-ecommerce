import React, { useContext } from 'react'
import { productContext } from '../contextStore/ProductStore'
import { useParams ,NavLink } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { wishlistContext } from "../contextStore/WishlistContext";



const output = () => {
  let text = useParams().text
    const { wishlistt, setwishlistt } = useContext(wishlistContext);
  const products = useContext(productContext)
  const filteredproduct = products.product.filter((item)=>{
    console.log(item.name.toLowerCase().includes())
    return item.name.toLowerCase().includes(useParams().text.toLowerCase())
  })
  console.log(filteredproduct)

  
  let addWishlist = (idd) => {
    let WishMatched = filteredproduct.filter((item) => {
      return item.id == idd;
    });
    let mathced = wishlistt.filter((item) => {
      return item.id == idd;
    });
    let unmatch = wishlistt.filter((item) => {
      return item.id != idd;
    });
    if (!(mathced.length > 0)) {
      localStorage.setItem(
        "wishlist",
        JSON.stringify([...wishlistt, ...WishMatched])
      );
      setwishlistt([...wishlistt, ...WishMatched]);
    } else {
      localStorage.setItem("wishlist", JSON.stringify(unmatch));
      setwishlistt(unmatch);
    }
  };
  let newitemm = filteredproduct.map((item) => {
    let newitem = { ...item, infav: false };
    wishlistt.map((item2) => {
      if (item.id == item2.id) {
        newitem = { ...item, infav: true };
      }
    });
    return newitem;
  });

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
    <div>
      <div className="  flex flex-col gap-6  items-center sm:flex-row justify-center my-10  flex-wrap sm:gap-8   ">
        {!filteredproduct.length && <h1>No item present ......</h1>}
        {newitemm.map((item) => {
          return (
            <NavLink key={Math.random()} to={`/product/${item.id}`}>
              <div>
                <div className=" bg-white  flex flex-col justify-center items-center p-4 w-60 sm:w-56 border border-gray-300 rounded-lg  shadow-md hover:shadow-xl transition-all duration-200 ">
                  <div className="text-xs flex justify-end w-56 sm:w-48 font-semibold text-gray-400">
                    id:{item.id}
                  </div>

                  <div className="relative">
                    <img
                      src={item.image}
                      alt=""
                      className=" h-44 w-40 sm:w-36 object-contain"
                    />
                    <NavLink to={`/search/${text}`}>
                      <div
                        onClick={() => addWishlist(item.id)}
                        className="p-[7px] bg-gray-800 h-8 w-8 rounded-full text-white absolute top-4 right-[-35px] sm:right-[-30px]"
                        >
                        {/* <FaRegHeart className={item.infav ? "bg-red-500" : ""} /> */}
                        {item.infav ? (
                          <FaHeart className="text-[#FF3131] text-[18px]" />
                        ) : (
                          <FaRegHeart className="text-[18px]" />
                        )}
                      </div>
                        </NavLink>
                    
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
                          return <FaStar key={Math.random()} />;
                        } else {
                          return <FaRegStar key={Math.random()}/>;
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
                    <div className="flex justify-center items-center text-2xl bg-blue-700 w-10 h-10 text-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ">
                      <MdOutlineShoppingCart />
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default output