import React from "react";
import { sideMenuData } from "../constants/SideMenuData";
import { Link } from "react-router-dom";
import { FaShopware } from "react-icons/fa6";
import { collection, addDoc } from "firebase/firestore"; // Make sure to import necessary Firebase functions
import { firestore } from "../firebase/config"; // Import Firebase config
import logo from "../images/logo.png";
const Sidebar = () => {


  return (
    <div className="bg-secondary flex flex-col items-center justify-between p-2 w-[70px] h-screen border-r-2 border-lightGray">
      <div className="my-3">
        <Link to="/" className="text-white">
          <img src={logo} alt="logo" className="w-7 h-7" />
        </Link>
      </div>
      <div className="flex-grow my-2">
        {sideMenuData?.map((item, index) => {
          return (
            <Link
              key={index}
              to={item?.route}
              className="text-white p-2 rounded-md group hover:bg-gray-900 transition-all duration-100 hover:cursor-pointer text-2xl my-3 "
              
            >
              <div>
                {item?.icon}
                <span className="absolute z-20 bottom-[-5px] w-auto py-2 px-3 m-2 min-w-max left-12 rounded-md shadow-md bg-gray text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                  {item.text}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
