/* eslint-disable react/prop-types */
import flexi_logo from "../assets/images/LOGOS/flexi_logo.png";
import React, { useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { header, URL } from "../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailsCard = ({ total, cart }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [phno, setPhno] = useState(null);
  const [address, setAddress] = useState(null);
  const [emailClick, setEmailClick] = useState(false);
  const [phnoClick, setPhnoClick] = useState(false);
  const [addressClick, setAddressClick] = useState(false);
  const [showError, setShowError] = useState([]);
  const shipping = 20;

  useEffect(() => {
    setEmail(cart?.user?.email);
    setPhno(cart?.user?.phone);
    setAddress(cart?.user?.address);
  }, [cart]);

  const handleEditClick = (type) => {
    setShowError((prevErrors) => {
      if (
        (type === "Email" && (email || "").trim() !== "") ||
        (type === "Address" && (address || "").trim() !== "") ||
        (type === "PhNo" && (phno || "").trim() !== "")
      ) {
        return prevErrors.filter((i) => i !== type);
      }
      return prevErrors;
    });

    if (type === "Email") {
      setEmailClick((prev) => !prev);
    } else if (type === "Address") {
      setAddressClick((prev) => !prev);
    } else if (type === "PhNo") {
      setPhnoClick((prev) => !prev);
    }
  };

  const handleChange = (e, type) => {
    e.preventDefault();
    type == "Email" && setEmail(e.target.value);
    type == "PhNo" && setPhno(e.target.value);
    type == "Address" && setAddress(e.target.value);
  };

  const handleOrder = (e) => {
    let temp_arr = [...showError];

    if (!address) {
      temp_arr.push("Address");
    }
    if (!phno || (phno && phno?.length != 10)) {
      temp_arr.push("PhNo");
    }
    if (!email) {
      temp_arr.push("Email");
    }

    setShowError(temp_arr);

    if (showError.length == 0) {
      showRazorpay();
    }
  };

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: URL("payment_success"),
        method: "POST",
        data: bodyData,
        headers: header,
      })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    bodyData.append("paid_amount", total.toString());
    bodyData.append("name", cart?.user?.name);
    bodyData.append("cart_id", cart?.cart_id);
    bodyData.append("shipping_address", address);
    bodyData.append("phone", phno);

    const data = await axios({
      url: URL("order/create"),
      method: "POST",
      headers: header,
      data: bodyData,
    }).then((res) => {
      return res;
    });

    var options = {
      key_id: import.meta.env.VITE_RP_PUBLIC_KEY,
      key_secret: import.meta.env.VITE_RP_SECRET_KEY,
      amount: total.toString(),
      currency: "INR",
      name: "Flexi- ecommerce",
      description: "Test transaction",
      image: flexi_logo, // add image url
      order_id: data.data.data.payment.id,
      prefill: {
        name: cart?.user?.name,
        email: email,
        contact: phno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      theme: {
        color: "#EA590C",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <div className="ml-10 w-1/4">
      <div className="rounded-xl border bg-white px-6 py-4">
        <h1 className="mb-3 text-xl font-semibold">Contact Information</h1>

        {/* Email Input */}
        <div className="flex items-center gap-3">
          <EmailOutlinedIcon />
          {emailClick ? (
            <input
              type="text"
              value={email}
              className="w-5/6 border-b-2 border-orange-400 focus:outline-none"
              onChange={(e) => handleChange(e, "Email")}
            />
          ) : (
            <div className="flex w-full flex-col">
              <h2
                className={` ${showError.includes("Email") && "border-red-500 pt-5"} border-b-2 text-slate-500`}
              >
                {email}
              </h2>
              {showError.includes("Email") && (
                <span className="text-xs text-red-500">
                  * Please fill Email ID
                </span>
              )}
            </div>
          )}
          <div
            className="cursor-pointer"
            onClick={() => handleEditClick("Email")}
          >
            {emailClick ? (
              <SaveOutlinedIcon />
            ) : (
              <ModeEditOutlineOutlinedIcon />
            )}
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="mt-4 flex items-center gap-3">
          <LocalPhoneOutlinedIcon />
          {phnoClick ? (
            <input
              type="text"
              value={phno}
              className="w-5/6 border-b-2 border-orange-400 focus:outline-none"
              onChange={(e) => handleChange(e, "PhNo")}
            />
          ) : (
            <div className="flex w-full flex-col">
              <h2
                className={` ${showError.includes("PhNo") && "border-red-500"} ${phno && "pt-0"} border-b-2 pt-4 text-slate-500`}
              >
                {phno}
              </h2>
              {showError.includes("PhNo") && (
                <span className="text-xs text-red-500">
                  * Please fill a valid Phone Number
                </span>
              )}
            </div>
          )}
          <div
            className="cursor-pointer"
            onClick={() => handleEditClick("PhNo")}
          >
            {phnoClick ? <SaveOutlinedIcon /> : <ModeEditOutlineOutlinedIcon />}
          </div>
        </div>

        {/* Address Input */}
        <div className="mt-4">
          <h1 className="mb-2 text-xl font-semibold">Address</h1>
          <div className="flex items-center gap-3">
            {addressClick ? (
              <input
                type="text"
                value={address}
                className="w-full border-b-2 border-orange-400 focus:outline-none"
                onChange={(e) => handleChange(e, "Address")}
              />
            ) : (
              <div className="flex w-full flex-col">
                <h2
                  className={`${showError.includes("Address") && "border-red-500 pt-4"} ${!address && "pt-4"} border-b-2 text-slate-500`}
                >
                  {address}
                </h2>
                {showError.includes("Address") && (
                  <span className="text-xs text-red-500">
                    * please fill address
                  </span>
                )}
              </div>
            )}
            <div
              className="cursor-pointer"
              onClick={() => handleEditClick("Address")}
            >
              {addressClick ? (
                <SaveOutlinedIcon />
              ) : (
                <ModeEditOutlineOutlinedIcon />
              )}
            </div>
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-xl font-semibold">Total</h1>
          <div className="pt-2">
            <div className="flex items-center justify-between font-medium">
              <h1 className="font-medium">Items Total</h1>
              <h1 className="font-normal">₹ {total}</h1>
            </div>
            <div className="flex items-center justify-between pb-2 ">
              <h1 className="font-medium">Shipping</h1>
              <h1 className="font-normal">₹ {shipping}</h1>
            </div>
            <div className="flex items-center justify-between border-t-2 border-orange-400 pt-2 font-bold">
              <h1>Grand Total</h1>
              <h1>₹ {total + shipping}</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="mt-5 h-1/4 w-3/4 rounded-xl bg-orange-600 text-2xl font-semibold text-white"
            onClick={(e) => handleOrder(e)}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
