import { useState } from 'react';
import './App.css';
import { MdDashboardCustomize, MdAccountBox, MdLogout } from "react-icons/md";
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex">
        <div className="fixed bg-slate-100 h-screen w-[200px] left-0 top-0">
          <ul className="pt-4">
            <Link to="c">
              <li className="flex items-center border-b border-gray-400 py-2 hover:bg-gray-300 cursor-pointer px-3">
                <MdDashboardCustomize className="text-[25px] mx-2" />
                Dashboard
              </li>
            </Link>
            <Link to="products">
              <li className="flex items-center border-b border-gray-400 py-2 hover:bg-gray-300 cursor-pointer px-3">
                <MdDashboardCustomize className="text-[25px] mx-2" />
                Products
              </li>
            </Link>
            <Link to="customers">
              <li className="flex items-center border-b border-gray-400 py-2 hover:bg-gray-300 cursor-pointer px-3">
                <MdDashboardCustomize className="text-[25px] mx-2" />
                Customers
              </li>
            </Link>
            <Link to="addProduct">
              <li className="flex items-center border-b border-gray-400 py-2 hover:bg-gray-300 cursor-pointer px-3">
                <MdDashboardCustomize className="text-[25px] mx-2" />
                Add Product
              </li>
            </Link>
          </ul>

          <ul className="absolute bottom-0 w-full">
            <li className="flex items-center border-t border-gray-400 py-2 hover:bg-gray-300 cursor-pointer px-3">
              <MdAccountBox className="text-[25px] mx-2" />
              Account
            </li>
            <li className="flex items-center border-t border-gray-400 py-2 hover:bg-gray-300 cursor-pointer px-3">
              <MdLogout className="text-[25px] mx-2" />
              Log-out
            </li>
          </ul>
        </div>

        <div className="ml-[200px] p-4 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
