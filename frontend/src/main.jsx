import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MensWear from "./components/DisplayProducts/MensWear.jsx";
import Home from "./components/Home/Home.jsx";
import WomensWear from "./components/DisplayProducts/WomensWear.jsx";
import Electronics from "./components/DisplayProducts/Electronics.jsx";
import Braclate from "./components/DisplayProducts/jewelery/Braclate.jsx";
import Nacklase from "./components/DisplayProducts/jewelery/nacklase.jsx";
import Rings from "./components/DisplayProducts/jewelery/Rings.jsx";
import ProducPage from "./components/ProducPage/producPage.jsx";
import Wishlist from "./components/Wishlist/wishlist.jsx";
import SearchResult from "./components/searchsection/SearchResult.jsx";
import TopsellingProducts from "./components/TopSellingProducts/TopsellingProducts.jsx";
import Cart from "./components/cart/cart.jsx";
import Paymentpage from "./components/cart/paymentpage.jsx";
import { SearchProvider } from "./components/contextStore/search";
import Signup from "./components/signup/signup.jsx";
import Login from "./components/signup/login.jsx";
import { UsercontextProvider } from "./components/contextStore/usercontext.jsx";
import ScrollToTop from "./components/scrollToTop/ScrollToTop.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

// Simulating an authentication check
const isAuthenticated = () => !!localStorage.getItem("authToken");

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signup" replace />;
};

let routerr = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mensWear"
          element={
            <ProtectedRoute>
              <MensWear />
            </ProtectedRoute>
          }
        />
        <Route
          path="/WomensWear"
          element={
            <ProtectedRoute>
              <WomensWear />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Electronics"
          element={
            <ProtectedRoute>
              <Electronics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Braclelet"
          element={
            <ProtectedRoute>
              <Braclate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Necklace"
          element={
            <ProtectedRoute>
              <Nacklase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Rings"
          element={
            <ProtectedRoute>
              <Rings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProducPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:text"
          element={
            <ProtectedRoute>
              <SearchResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Paymentpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topselling/:type"
          element={
            <ProtectedRoute>
              <TopsellingProducts />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <UsercontextProvider>
    <SearchProvider>
      <RouterProvider router={routerr} />
    </SearchProvider>
  </UsercontextProvider>
);
