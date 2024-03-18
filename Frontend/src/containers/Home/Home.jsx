/* eslint-disable react/no-unescaped-entities */
import React from "react";
import flexi_logo from "../../assets/images/LOGOS/flexi_logo.png";
import home_shoe from "../../assets/images/HomePage/home_jordan.png";

import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Home = () => {
  return (
    <>
      <div className="bg-[#1B1B1B] h-screen w-screen">
        {/* navbar */}
        <div className="w-full h-28 flex items-center justify-between">
          <div className="w-52 ml-36 mt-12 ">
            <img src={flexi_logo} alt="" />
          </div>
          <div className="flex w-4/5 mt-12  text-white">
            <h5 className="text-3xl font-bold ml-32">Home</h5>
            <h5 className="text-3xl font-bold ml-32">Favorite</h5>
            <h5 className="text-3xl font-bold ml-32">Cart</h5>
            <h5 className="text-3xl font-bold ml-32">Login</h5>
          </div>
        </div>
        {/* navbar */}

        {/* Content */}
        <div className="flex">
          {/* left content */}
          <div className="h-3/5 w-[50%]">
            <div className="text-white mt-24 px-10 flex flex-col items-center">
              <h1 className="font-outfit text-center text-8xl font-semibold ">
                Flexi's best Collection
              </h1>
              <p className="mt-5 mx-20 p-5 text-2xl font-outfit font-light text-center">
                Visit us here to get the best collection of FLEXI and buy your
                favourite shoes
              </p>
              <div className="mt-5">
                <button className="bg-orange-600 text-3xl font-semibold py-5 px-28 rounded-2xl">
                  START SHOPPING
                </button>
              </div>
            </div>
          </div>
          {/* left content */}

          {/* right content */}
          <div className="mt-12 mr-28">
            {/* <div className="border relative mt-10 ml-10"> */}
            <div className="absolute w-[50%] right-20 z-20">
              <img src={home_shoe} alt="" />
            </div>
            <div className="bg-[#FF5C00] ml-16 rounded-full  flex p-5">
              {/* F047FF */}
              <div className="bg-gradient-to-b from-[#4764FF] to-[#F047FF] rounded-full  p-6 flex  z-1">
                <div className="bg-gradient-to-b from-[#0029FF] to-[#FF0606] rounded-full flex  p-14 z-2">
                  <div className="bg-gradient-to-b from-[#98F600] to-[#00660A] rounded-full flex p-36 z-2">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="flex flex-col items-end justify-center space-y-10 ">
            <a href="https://www.instagram.com/" target="_blank">
              <div className="w-20 h-15">
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
              <div className=" w-20 h-15">
                <XIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" w-20 h-15">
                <FacebookIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" w-20 h-15">
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
