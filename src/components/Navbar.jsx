import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateQuery } from "../redux/features/querySlice";
import { IoMdAdd } from "react-icons/io";

const Navbar = ({ setIsFormOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searched, setSearched] = useState("");

  const query = useSelector((state) => state.query.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateQuery({ search: searched }));
  }, [searched]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  window.addEventListener("click", (e) => {
    setIsMenuOpen(false);
  });

  if (isMenuOpen) {
    document.querySelector("body").style.overflow = "hidden";
  } else {
    document.querySelector("body").style.overflow = "visible";
  }

  return (
    <nav
      className="fixed z-50 w-full navbar lg:px-10 backdrop-blur-md h-14 flex items-center text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center h-full mx-auto w-full">
        <div className="relative size-full">
          <input
            className="w-[60%] max-w-[300px] bg-neutral-800 text-white py-1 px-5 outline-none rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            placeholder="Search"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
          <button
            className="absolute right-0 md:right-10 top-[50%] md:top-[55%] -translate-y-1/2 md:px-3 py-1 rounded-[100px] md:border border-purple-600 text-purple-500 flex items-center gap-2"
            onClick={() => setIsFormOpen(true)}
          >
            <IoMdAdd className="text-3xl" />
            <div className="hidden md:block">Add User</div>
          </button>
        </div>
        <div className="lg:block hidden h-full ml-auto">
          <ul className="flex space-x-5 h-full">
            <li>
              <NavLink
                to="/"
                className="font-normal transition-colors duration-300"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Team"
                className="font-normal transition-colors duration-300"
              >
                Team
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="lg:hidden block ml-auto px-5">
          <button
            onClick={toggleMenu}
            className="menu-icon focus:outline-none flex"
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>
        </div>
        <div
          className={`lg:hidden absolute top-14 right-0 bg-neutral-900 w-0 h-screen transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "w-48" : ""
          }`}
        >
          <ul className="flex flex-col pt-6">
            <li className="w-full h-12">
              <NavLink
                to="/"
                className="font-normal hover:text-574c4c transition-colors duration-300"
              >
                Home
              </NavLink>
            </li>
            <li className="w-full h-12">
              <NavLink
                to="/Team"
                className="font-normal hover:text-574c4c transition-colors duration-300"
              >
                Team
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
