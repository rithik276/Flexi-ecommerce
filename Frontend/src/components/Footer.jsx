import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/LOGOS/flexi_logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";


const Footer = () => {
  return (
    <div className="flex w-full flex-col">
      {/* first part */}
      <div
        className="flex items-center justify-items-start bg-[#373737]
"
      >
        <div className="w-1/3">
          <NavLink to={"/"}>
            <div className="mb-3 w-10 lg:ml-24 lg:w-40 lg:pt-3">
              <img src={logo} alt="" />
            </div>
          </NavLink>
        </div>
        <div className="flex items-center justify-between gap-20">
          <h3 className="text-3xl font-medium text-white">Get Help</h3>
          <h3 className="text-3xl font-medium text-white">About Us</h3>
          <h3 className="text-3xl font-medium text-white">FAQ</h3>
        </div>
      </div>
      {/* first part */}
      {/* second part */}
      <div className="flex h-1/3 w-full items-center justify-between bg-bg">
        <div className="ml-10 mb-4 mt-4 flex items-center justify-center">
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
                <XIcon className="text-white" style={{ fontSize: 30 }} />
              </div>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" h-15 w-20">
                <FacebookIcon className="text-white" style={{ fontSize: 30 }} />
              </div>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className=" h-15 w-20">
                <YouTubeIcon className="text-white" style={{ fontSize: 35 }} />
              </div>
            </a>
        </div>
        <div className='flex gap-5  mr-10'>
          <span className="text-base font-extralight text-white">
            Terms & Conditions
          </span>
          <span className="text-base font-extralight text-white">
            Privacy & Policy
          </span>
        </div>
      </div>
      {/* second part */}
    </div>
  );
}

export default Footer