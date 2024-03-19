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
            <div className="ml-8 w-36 pb-8 pt-8 xl:ml-36 xl:w-52 xl:pb-12 xl:pt-24">
              <img src={flexi_logo} alt="" />
            </div>
          </NavLink>
          <div className="hidden text-white xl:mt-12 xl:flex  xl:w-4/5">
            <NavLink to={"/"}>
              <h5 className="ml-32 text-3xl font-bold">Home</h5>
            </NavLink>
            <NavLink to={"/favorite"}>
              <h5 className="ml-32 text-3xl font-bold">Favorite</h5>
            </NavLink>
            <NavLink to={"/cart"}>
              <h5 className="ml-32 text-3xl font-bold">Cart</h5>
            </NavLink>
            <NavLink to={"/login"}>
              <h5 className="ml-32 text-3xl font-bold">Login</h5>
            </NavLink>
          </div>
          <div className="mr-8 block xl:hidden">
            <button onClick={toggleNavbar}>
              {isOpen ? (
                <CloseIcon className="text-white" style={{ fontSize: 50 }} />
              ) : (
                <MenuIcon className="text-white" style={{ fontSize: 50 }} />
              )}
            </button>
          </div>
          {isOpen && (
            <div className="fixed right-0 top-0 z-20 h-full w-1/2 bg-black/50 text-center text-white backdrop-blur-2xl">
              <div
                onClick={toggleNavbar}
                className="mr-9 mt-8 flex justify-end"
              >
                <CloseIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
              <div className="flex flex-col justify-between space-y-56">
                <div className="mt-10 flex flex-col gap-y-7">
                  <NavLink to={"/"} onClick={toggleNavbar}>
                    <h5 className="text-2xl font-bold">Home</h5>
                  </NavLink>
                  <NavLink to={"/favorite"}>
                    <h5 className="text-2xl font-bold">Favorite</h5>
                  </NavLink>
                  <NavLink to={"/cart"}>
                    <h5 className="text-2xl font-bold">Cart</h5>
                  </NavLink>
                  <NavLink to={"/login"}>
                    <h5 className="text-2xl font-bold">Login</h5>
                  </NavLink>
                </div>
                <div className="flex flex-wrap items-center justify-center space-y-10">
                  <div className=" flex space-x-2 ">
                    <a href="https://www.instagram.com/" target="_blank">
                      <div className="h-15 w-20">
                        <InstagramIcon
                          className="text-white"
                          style={{ fontSize: 30 }}
                        />
                      </div>
                    </a>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className=" h-15 w-20">
                        <XIcon
                          className="text-white"
                          style={{ fontSize: 30 }}
                        />
                      </div>
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className=" h-15 w-20">
                        <FacebookIcon
                          className="text-white"
                          style={{ fontSize: 30 }}
                        />
                      </div>
                    </a>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className=" h-15 w-20">
                        <YouTubeIcon
                          className="text-white"
                          style={{ fontSize: 35 }}
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* navbar */}

        {/* Content */}
        <div className="flex flex-col-reverse xl:flex-row">
          {/* left content */}
          <div className="sm:w-1/2 xl:h-3/5 xl:w-[50%]">
            <div className="flex flex-col px-6 text-white xl:mt-24 xl:items-center  xl:px-10">
              <h1 className="mt-9 text-center font-outfit text-6xl font-semibold xl:mt-0 xl:text-8xl ">
                Flexi's best Collection
              </h1>
              <p className="mt-4 text-center font-outfit text-xl font-light xl:mx-20 xl:p-5">
                Visit us here to get the best collection of FLEXI and buy your
                favourite shoes
              </p>
              <div className="mt-5 flex items-center justify-center xl:flex-none">
                <NavLink to={"/products"}>
                  <button className="rounded-2xl bg-orange-600 px-9 py-4 text-2xl font-semibold xl:mt-2 xl:px-28 xl:py-5 xl:text-3xl">
                    START SHOPPING
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          {/* left content */}

          {/* right content */}
          <div className="mr-0 mt-1 xl:mr-28 xl:mt-12">
            <div className="top-22 absolute z-10 hidden w-[100%] xl:right-20  xl:block xl:w-[50%]">
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
            <div className="relative z-10 -mt-72 w-[100%]  xl:hidden">
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
