import React from "react";
import flexi_logo from "../../assets/images/LOGOS/flexi_logo.png";
import flexi_gradient from "../../assets/images/flexi_gradient.png";
import home_shoe from "../../assets/images/main_page_shoe.png";

import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Home = () => {
  return (
    <>
      <div className=" flex items-center bg-black bg-gradient-to-r from-black via-transparent to-orange-500 max-h-screen w-screen relative">
        {/* Left Side HomePage */}
        <div className="p-12 h-screen  w-[55%]">
          <div className="text-white flex items-center justify-around">
            <div className="w-40">
              <img src={flexi_logo} alt="" />
            </div>
            <h5 className="text-3xl font-bold">Home</h5>
            <h5 className="text-3xl font-bold">Favorite</h5>
            <h5 className="text-3xl font-bold">Cart</h5>
            <h5 className="text-3xl font-bold">Login</h5>
          </div>

          <div className="text-white mt-20 px-10 flex flex-col items-center">
            <h1 className="font-outfit text-center text-9xl font-semibold ">
              Flexi's best Collection
            </h1>
            <p className="mt-6 p-4 text-4xl font-outfit font-light text-center">
              Visit us here to get the best collection of FLEXI and buy your
              favourite shoes
            </p>
            <div>
              <button className="bg-orange-600 mt-10 text-3xl font-semibold py-5 px-28 rounded-2xl">
                START SHOPPING
              </button>
            </div>
          </div>
        </div>

        {/* Right Side HomePage */}
        <div className="w-[45%] h-screen  relative">
          <div className="absolute w-[24rem] overflow-hidden h-screen ml-[8rem]">
            <img className="" src={flexi_gradient} alt="" />
          </div>
          <div className="absolute z-10 mt-36">
            <img className="w-[38rem]" src={home_shoe} alt="" />
          </div>
          <div className=" h-full flex justify-end">
            <div className="flex flex-col items-end justify-center space-y-10">
              <div className=" w-20 h-15">
                <InstagramIcon
                  className="text-white"
                  style={{ fontSize: 50 }}
                />
              </div>
              <div className=" w-20 h-15">
                <XIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
              <div className=" w-20 h-15">
                <FacebookIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
              <div className=" w-20 h-15">
                <YouTubeIcon className="text-white" style={{ fontSize: 50 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
