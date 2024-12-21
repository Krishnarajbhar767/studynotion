import React, { useEffect, useState } from "react";
import { Link, matchPath, NavLink, useLocation } from "react-router-dom";
import logo from "/src/assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "/src/data/navbar-links.js";
import { useSelector } from "react-redux";
import { Instructor } from "../../../constant";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConncetor } from "../../services/apiConnector";
import { CATEGORIES } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  (user)
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [subLinks, setSubLink] = useState([]);
  const fetchSubLinks = async () => {
    try {
      const result = await apiConncetor("GET", CATEGORIES.SHOW_ALL_CATEGORIES);
      setSubLink(result.data.data);
      localStorage.setItem("sublinks",JSON.stringify(result.data.data));
    } catch (error) {
      ("Could Not Fetch the Categoies List", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("sublinks")) {
      setSubLink(JSON.parse(localStorage.getItem("sublinks")));
    }else{
      fetchSubLinks();      
    }

  }, []);

  return (
    <div className="flex h-14 border-b-[1px] border-b-richblack-700 items-center justify-center">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={logo} width={160} height={42} loading="lazy" />
        </Link>

        {/* Navlinks */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, idx) => {
              return (
                <li key={idx}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-2 justify-center group relative">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />
                      <div className="lg:w-72 invisible opacity-0 absolute left-[50%] top-[50%] flex flex-col-reverse   items-start justify-center bg-richblack-5 text-richblue-900 rounded-md p-4 group-hover:visible group-hover:opacity-100 -translate-x-[50%] translate-y-[24%] z-10 transition-all duration-200 gap-y-1">
                        {subLinks.map((elem, idx) => {
                          return (
                            <NavLink to={`/${elem.name.split(" ").join("-")}`} className="cursor-pointer w-full text-md text-richblack-900 font-medium p-2 hover:bg-richblack-600 hover:text-richblack-100 transition-all duration-200 rounded">
                              <p className="">{elem.name}</p>
                            </NavLink>
                          );
                        })}

                        {/* That Floating ELEM */}
                        <div className="absolute left-1/2 -top-[8%] h-6 w-6 rotate-45 rounded bg-richblack-5 z-10 transition-all duration-200">

                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-50"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login /Signup/dashboard */}
        <div className="flex items-center gap-4 text-white">
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative mr-4">
              <AiOutlineShoppingCart className="text-3xl"/>
              {totalItems > 0 ? <span>{totalItems}</span> : ""}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button
                className="text-richblack-100 border border-richblack-700 px-3 py-2 rounded-md
                                bg-richblack-800
                                "
              >
                {" "}
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button
                className="text-richblack-100 border border-richblack-700 px-3 py-2 rounded-md
                                bg-richblack-800"
              >
                Signup
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
