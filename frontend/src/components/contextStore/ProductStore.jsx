import { createContext, useContext, useEffect, useState } from "react";

export const productContext = createContext()

export const ProductContextProvider = ({children})=>{
 const [ product , setproduct ] = useState([])
   
 useEffect(()=>{
   async function getdata() {
      let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
      let data = await response.json();
       setproduct(data)
     } 
     getdata();
 },[])

   return <productContext.Provider value={{product , setproduct}}>
              {children}
   </productContext.Provider>

}