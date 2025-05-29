import {  createContext, useState } from "react";

export const wishlistContext = createContext() 

export const WishlistContextProvider = ({children})=>{

    let wishlistdata  = []
    if(localStorage.getItem("wishlist")){
        wishlistdata = JSON.parse(localStorage.getItem("wishlist"))
    }
    // console.log(wishdata2)
       const [wishlistt , setwishlistt]= useState(wishlistdata);

       return <wishlistContext.Provider value={{wishlistt , setwishlistt}}>
           {children}
       </wishlistContext.Provider>
}