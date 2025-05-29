import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import Darkmode from "./Darkmode";
import { useNavigate, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { usercontext } from "./contextStore/usercontext";
import { useContext } from "react";

const Navbar = () => {
 const {userdata , setuserdata} = useContext(usercontext);
 console.log(userdata.user.username)

  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  function enterr(e) {
    console.log(e.key);
    if (e.key == "Enter" && searchWord) {
      console.log("enter");
      navigate(`/search/${searchWord}`);
    }
  }

  let logout=()=>{
              localStorage.removeItem('authToken')
              localStorage.removeItem('alldata')
              navigate("/login")
  }
  return (
    <div className=" shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40  ">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2 ">
        <div className="container flex justify-between items-center ">
          <div>
            <a href="#" className="font-bold  text-2xl sm:text-3xl flex gap-2 ">
              <img
                src="https://shopsy-tcj.netlify.app/assets/logo-Jm4BVSCI.png"
                alt="logo"
                className="w-10 "
              ></img>
              Shopz
            </a>
          </div>
          {/* search bar  */}
          <div className="flex justify-between items-center gap-4 ">
            <div className="group hidden relative sm:block">
              <input
                type="text"
                placeholder="Search"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyDown={enterr}
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800 "
              ></input>

              <NavLink to={`/search/${searchWord}`}>
                <IoSearchSharp className="text-gray-500 group:hover:text-primary absolute top-1/2 -translate-y-1/2 right-3  " />
              </NavLink>
            </div>
            {/* order button  */}

            <NavLink to={"/addcart"}>
              <button className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-1  sm:gap-3 group  ">
                <span className="group-hover:block hidden transition-all duration-200">
                  Order
                </span>
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
            </NavLink>

            <NavLink to={"/wishlist"}>
              <button className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-1 sm:gap-3 group  ">
                <span className="group-hover:block hidden transition-all duration-200">
                  Wishlist
                </span>
                <FaHeart className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
            </NavLink>

            {/* dark switch */}
            <Darkmode />
            <div class="relative inline-block group">
              <img
                src="https://img.freepik.com/premium-photo/profile-icon-white-background_941097-161709.jpg?ga=GA1.1.2066432878.1696925075&semt=ais_hybrid"
                alt="Profile"
                class="h-[35px] w-[35px] rounded-full cursor-pointer"
              />

              <ul class="absolute left-0  w-32 bg-white shadow-lg rounded-md z-50 hidden group-hover:block">
                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer ">{userdata.user.username}</li>
                <li onClick={logout} class="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>

            <div></div>
          </div>
        </div>
      </div>
      {/* search bar for mobile */}
      <div className="flex justify-center items-center gap-4 m-2 ">
        <div className="group relative w-[86%]  sm:hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={enterr}
            className="w-[100%]   group-hover:w-[100%] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800 "
          ></input>
          <NavLink to={`/search/${searchWord}`}>
            <IoSearchSharp className="text-gray-500 group:hover:text-primary absolute top-1/2 -translate-y-1/2 right-3  " />
          </NavLink>
        </div>
      </div>

      {/* Lower Navbar */}

      <div className="flex justify-center">
        <ul className=" sm:flex flex justify-center flex-wrap  items-center gap-x-3 ">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li className="inline-block px-4 hover:text-primary duration-200 cursor-pointer ">
              Home
            </li>
          </NavLink>
          <NavLink
            to="/mensWear"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li className="inline-block px-4 hover:text-primary duration-200 cursor-pointer ">
              Men's wear
            </li>
          </NavLink>
          <NavLink
            to="/WomensWear"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li className="inline-block px-4 hover:text-primary duration-200 cursor-pointer ">
              Women's wear
            </li>
          </NavLink>
          <NavLink
            to="/Electronics"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            <li className="inline-block px-4 hover:text-primary duration-200 cursor-pointer ">
              Electronics
            </li>
          </NavLink>
          <li className="group relative cursor-pointer">
            <div className="flex items-center gap-[2px] py-2 ">
              Jewellery
              <span>
                <FaCaretDown className="transition-all duration-200  group-hover:rotate-180" />
              </span>
            </div>
            <div className="absolute z-[9999] hidden  group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md ">
              <ul>
                <NavLink to="/Rings">
                  {" "}
                  <li className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                    {" "}
                    Rings
                  </li>
                </NavLink>
                <NavLink to="/Necklace">
                  <li className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                    {" "}
                    Necklace
                  </li>
                </NavLink>
                <NavLink to="/Braclelet">
                  {" "}
                  <li className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                    {" "}
                    Braclelet
                  </li>
                </NavLink>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
