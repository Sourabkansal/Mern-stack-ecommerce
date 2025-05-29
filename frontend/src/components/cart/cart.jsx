import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../contextStore/Cartcontext";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import js from "@eslint/js";

const cart = () => {
  let { data, setData } = useContext(CartContext);
  let [subtotal, setsubtotal] = useState();

  // console.log(data)

  let addquan = (idd) => {

   let newarr = data.map((item)=>{

     if(item.id == idd){
            return {...item , quantity: item.quantity + 1  }
          }
   return item
   })

   setData(newarr)
  localStorage.setItem("Cart" , JSON.stringify(newarr))
  };

  let Minusquan = (idd) => {

    let newarr = data.map((item)=>{
    if(item.quantity == 1 ){
      return {...item , quantity: 1   }

    }
    if ( item.id == idd ){
        return {...item , quantity: item.quantity - 1  }
    }
    return item
    })
 setData(newarr)
 localStorage.setItem("Cart" , JSON.stringify(newarr))

    };

  useEffect(() => {
    let data2 = localStorage.getItem("Cart");
    if (data2) {
      setData(JSON.parse(data2));
      
    }
  }, [] );

  useEffect(()=>{
    if(data){
      setsubtotal(
        data.reduce((total, curr) => {
          return total + curr.price * curr.quantity;
        }, 0)
      );
    }

  }, [data])

  let delcartitem = (idd) => {
    let unmatched = data.filter((item) => {
      return item.id != idd;
    });
    setData(unmatched);
    localStorage.setItem("Cart", JSON.stringify(unmatched));
  };

  let clearCart = () => {
    setData([]);
    localStorage.removeItem("Cart");
    setsubtotal(0);
  };

  return (
    <div>
      <h1 className="text-center text-blue-700 text-3xl font-bold py-2 dark:text-white ">
        Shopping Cart
      </h1>
      <div className="h-[50px] w-[100px] m-auto py-2">
        <button
          onClick={clearCart}
          className="bg-blue-700 px-2 py-1 text-white rounded-md  dark:text-white "
        >
          Clear cart
        </button>
      </div>

      <div>
        <div className="bg-slate-50 w-[80%]  m-auto pb-10 pt-7 my-3 dark:bg-gray-200">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white w-[95%] sm:h-[125px] m-auto px-3 dark:text-black  "
              >
                <div className="flex sm:justify-evenly sm:items-center sm:flex flex-col sm:flex-row gap-[5px] ">
                  <div>
                    <img
                      className="h-[118px] object-contain w-[90px] m-auto "
                      src={item.image}
                    ></img>
                  </div>
                  <div className="flex-col m-auto w-[200px] ">
                    <div>
                      <h1 className="text-xl font-bold">{item.name}</h1>
                    </div>
                    <div className="font-semibold text-center">
                      <span>{item.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 m-auto">
                    <span className="font-semibold">Quantity</span>

                    <div>
                      <button onClick={()=> Minusquan(item.id)} className="h-[32px] w-[25px] bg-gray-200 text-2xl rounded-l-xl font-bold">
                        -
                      </button>
                      <span className="h-[32px]  px-2 bg-slate-100 text-2xl">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addquan(item.id)}
                        className="h-[32px] w-[25px] bg-gray-200 text-2xl rounded-r-xl font-bold "
                      >
                        +
                      </button>
                    </div>

                  </div>
                  <div className="m-auto ">
                    <span className="font-bold mx-2">Total: </span>{" "}
                    <span className="font-semibold ">
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="m-auto">
                    <button
                      onClick={() => delcartitem(item.id)}
                      className="bg-blue-600 text-white h-[30px] w-[30px] text-[23px] px-1 mx-2 rounded-md"
                    >
                      <MdDelete />
                    </button>
                    <NavLink to={`/product/${item._id}`}>
                      <button className="bg-red-600 text-white h-[30px] w-[30px] text-[19px] px-2  rounded-md">
                        <FaEdit />
                      </button>
                    </NavLink>
                  </div>
                </div>
                <hr className="mx-7"></hr>
              </div>
            );
          })}

          {/* Checkout sec */}
          <div className="bg-white w-[95%] h-[55px] m-auto flex justify-between items-center px-4 ">
            <div>
             <NavLink to="/payment">
              <button className="bg-red-600 px-2 py-1 text-white font-semibold rounded-md  ">
                Checkout
              </button>
             </NavLink>
            
            </div>
            <div>
              <span className=" text-xs font-bold mx-2 sm:text-xl dark:text-black">
                Total Amount :
              </span>{" "}
              <span className=" text-xs font-semibold text-blue-600 sm:text-xl">
                {`${subtotal ? subtotal.toFixed(2) : ""}`}
              </span>
            </div>
          </div>
          <hr className="mx-7"></hr>
        </div>
      </div>
    </div>
  );
};

export default cart;
