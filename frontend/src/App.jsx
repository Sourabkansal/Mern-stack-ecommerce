import { useState , useContext } from "react";
import Navbar from "./components/Navbar";
import { ProductContextProvider } from "./components/contextStore/ProductStore";
import { WishlistContextProvider } from "./components/contextStore/WishlistContext";
import Footer from "./components/Footer/Footer";
import output from "./components/searchsection/SearchResult";
import { Outlet } from "react-router-dom";
import {SearchContext} from "./components/contextStore/search"
import { CartContextpovider } from "./components/contextStore/Cartcontext";
import { UsercontextProvider } from "./components/contextStore/usercontext";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
function App() {
  const [count, setCount] = useState(0);
console.log(useContext(SearchContext))

  return (
    <>
      <div className="dark:bg-gray-950 dark:text-white">
        <WishlistContextProvider>
          <ProductContextProvider>
            <CartContextpovider>
              <ScrollToTop/>
              <Navbar />
              <Outlet />
              <Footer />
            </CartContextpovider>
          </ProductContextProvider>
        </WishlistContextProvider>
      </div>
    </>
  );
}

export default App;
