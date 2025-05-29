import { createContext, useState } from "react";

export const usercontext = createContext(["hello"])

export const UsercontextProvider = function ({children}){
      const [userdata , setuserdata] = useState(localStorage.getItem("alldata")?JSON.parse(localStorage.getItem("alldata")):[]);

      console.log(userdata)
      
      return <usercontext.Provider value={{userdata , setuserdata}}>
            {children}
      </usercontext.Provider>

}