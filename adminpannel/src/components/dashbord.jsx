import React from "react";
import Products from "./products";
const Dashbord = () => {
  return (
    <>
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="border py-4 px-4 rounded shadow w-full md:w-[38%]">
          <div className="pb-3">
            <h1 className="font-bold text-2xl">Shop with Zosh</h1>
            <p className="font-semibold">Congratulations 🎉</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-xl">420.8k</h1>
              <button className="my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                View Sales
              </button>
            </div>
            <img
              className="h-[80px] w-[85px] object-cover"
              src="https://media.istockphoto.com/id/1168757141/vector/gold-trophy-with-the-name-plate-of-the-winner-of-the-competition.jpg?s=612x612&w=0&k=20&c=ljsP4p0yuJnh4f5jE2VwXfjs96CC0x4zj8CHUoMo39E="
              alt="Trophy"
            />
          </div>
        </div>

        <div className="border py-4 px-4 rounded shadow w-full md:w-[58%] cursor-pointer ">
          <div className="pb-3">
            <h1 className="font-bold text-2xl">Monthly Overview</h1>
            <p className="font-semibold">Total 48.5% growth 💸 this month</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center">
              <img
                className="h-[40px] w-[40px] mr-3"
                src="https://cdn-icons-png.flaticon.com/512/1389/1389181.png"
                alt="Sales"
              />
              <div>
                <h3 className="text-gray-700">Sales</h3>
                <h1 className="font-semibold text-[18px]">245k</h1>
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="h-[40px] w-[40px] mr-3"
                src="https://cdn-icons-png.flaticon.com/512/1379/1379505.png"
                alt="Customers"
              />
              <div>
                <h3 className="text-gray-700">Customers</h3>
                <h1 className="font-semibold text-[18px]">2.1k</h1>
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="h-[40px] w-[40px] mr-3"
                src="https://cdn-icons-png.flaticon.com/128/2875/2875878.png"
                alt="Products"
              />
              <div>
                <h3 className="text-gray-700">Products</h3>
                <h1 className="font-semibold text-[18px]">1.8k</h1>
              </div>
            </div>

            <div className="flex items-center">
              <img
                className="h-[40px] w-[40px] mr-3"
                src="https://cdn-icons-png.flaticon.com/128/10365/10365210.png"
                alt="Revenue"
              />
              <div>
                <h3 className="text-gray-700">Revenue</h3>
                <h1 className="font-semibold text-[18px]">88k</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     
    <div className="p-4">
        <h1 className="font-semibold ">
            Products:-
        </h1>
         <Products/>
    </div>
    </>
  );
};

export default Dashbord;
