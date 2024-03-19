/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import flexi_logo from "../../assets/images/LOGOS/flexi_logo.png";
import home_shoe from "../../assets/images/HomePage/home_jordan.png";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { NavLink } from "react-router-dom";
import HomeBurgerMenu from "../../components/HomeBurgerMenu";
import NavLinks from "./NavLinks";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="h-screen w-screen overflow-x-hidden bg-[#1B1B1B]">
        {/* navbar */}
        <div className="flex h-28 w-full items-center justify-between">
          <NavLink to={"/"}>
            <div className="ml-8 w-36 xl:ml-36 xl:mt-12 xl:w-52 ">
              <img src={flexi_logo} alt="" />
            </div>
          </NavLink>
          <NavLinks />
          <div className="mr-8 block xl:hidden">
            <button onClick={toggleNavbar}>
              {isOpen ? (
                <CloseIcon className="text-white" style={{ fontSize: 50 }} />
              ) : (
                <MenuIcon className="text-white" style={{ fontSize: 50 }} />
              )}
            </button>
          </div>
        </div>
        {/* navbar */}

        {/* Content */}
        <div className="flex flex-col-reverse xl:flex-row">
          {/* left content */}
          <div className="sm:w-1/2 xl:h-3/5 xl:w-[50%]">
            <div className="flex flex-col px-6 text-white xl:mt-24 xl:items-center  xl:px-10">
              <h1 className="mt-12 text-center font-outfit text-6xl font-semibold xl:mt-0 xl:text-8xl ">
                Flexi's best Collection
              </h1>
              <p className="mt-5 text-center font-outfit text-xl font-light xl:mx-20 xl:p-5">
                Visit us here to get the best collection of FLEXI and buy your
                favourite shoes
              </p>
              <div className="mt-5 flex items-center justify-center xl:flex-none">
                <NavLink to={"/products"}>
                  <button className="mt-7 rounded-2xl bg-orange-600 px-9 py-4 text-2xl font-semibold xl:mt-2 xl:px-28 xl:py-5 xl:text-3xl">
                    START SHOPPING
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          {/* left content */}

          {/* right content */}
          <div className="mr-0 mt-12 xl:mr-28">
            <div className="top-22 absolute z-20 hidden w-[100%] xl:right-20  xl:block xl:w-[50%]">
              <img src={home_shoe} alt="" className="" />
            </div>
            <div className="flex items-center justify-center xl:flex-none">
              <div className="flex rounded-full bg-[#FF5C00] p-4 xl:ml-16 xl:p-5">
                <div className="z-1 flex rounded-full bg-gradient-to-b  from-[#4764FF] to-[#F047FF]     p-9 xl:p-6">
                  <div className="z-2 flex rounded-full bg-gradient-to-b from-[#0029FF]  to-[#FF0606]   p-10 xl:p-14">
                    <div className="z-2 flex rounded-full bg-gradient-to-b from-[#98F600] to-[#00660A] p-16 xl:p-36"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-20 -mt-72 w-[100%]  xl:hidden">
              <img src={home_shoe} alt="" className="" />
            </div>
          </div>
          <div className="hidden flex-col items-end justify-center space-y-10 xl:flex">
            <a href="https://www.instagram.com/" target="_blank">
              <div className="h-15 w-20">
                <InstagramIcon
                  className="text-white"
                  style={{ fontSize: 50 }}
                />
              </div>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" h-15 w-20">
                <XIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" h-15 w-20">
                <FacebookIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" h-15 w-20">
                <YouTubeIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
            </a>
          </div>
          {/* right content */}
        </div>
        {/* Content */}
      </div>
    </>
  );
};

export default Home;
