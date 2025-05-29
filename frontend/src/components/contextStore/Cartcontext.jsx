import { createContext, useContext, useState } from "react";

export const CartContext = createContext({
  helo: "fjksdhfjk",
});

export const CartContextpovider = function ({ children }) {
  let data2 = JSON.parse(localStorage.getItem("Cart"));

  const [data, setData] = useState([]);

  return (
    <CartContext.Provider value={{ data, setData }}>
      {children}
    </CartContext.Provider>
  );
};
