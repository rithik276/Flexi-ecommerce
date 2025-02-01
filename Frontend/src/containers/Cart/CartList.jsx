/* eslint-disable react/prop-types */
import React, {  useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from "react-redux";
import { STATIC_URL } from "../../utils/config";
import { updateQuantity } from "./cartSlice";

const CartList = ({ item }) => {
  
    const [selectedButton, setSelectedButton] = useState('plus')
    const dispatch = useDispatch();
    
    const handleQuantity = async (value) => {
        if(value == '+'){
            setSelectedButton("plus")
            item.quantity+=1
        }
        else{
            setSelectedButton("minus")
        }
        const payload = [{
          product_id: item.product_id,
          product_variant_id: item.product_variant_id,
          quantity: item.quantity + value,
          size : item.size
        }];
        await dispatch(updateQuantity(payload));
        
        
    };
    
    const deleteCart = () => {

    }

    return (
      <>
        <div className="mb-7 flex items-center justify-between">
          <div className=" flex gap-5">
            <div className="h-16 w-16 rounded-xl bg-white pt-2">
              <img src={STATIC_URL('media/' + item.image)} alt="" className="pt-1" />
            </div>
            <div>
              <h1 className="text-xl font-medium text-white">
                {item.product_name}
              </h1>
              <div className="mt-1 flex items-center justify-center gap-3">
                <div className="font-bold text-white">Rs. {item.price}</div>
                <div className="font-bold text-white border-l-2 pl-2">Size: {item.size}</div>
                
                <div
                  className={`flex ml-7 h-5 w-5 items-center justify-center rounded-full border-2 ${item.quantity <= 1 && "opacity-10"} ${selectedButton == "minus" && "border-orange-700 bg-orange-700"}`}
                >
                  <button
                    className="flex items-center justify-center text-white"
                    onClick={() => handleQuantity(-1)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </button>
                </div>
                <div className="text-xl font-semibold text-white">
                  <h3>{item.quantity}</h3>
                </div>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 
                    ${item.quantity >= item.size_stock[item.size] && "opacity-10"}
                    ${selectedButton == "plus" && "border-orange-700 bg-orange-700"}`}
                >
                  <button
                    className="flex items-center justify-center text-white"
                    onClick={() => handleQuantity(1)}
                    disabled={item.quantity >= item.size_stock[item.size]}
                  >
                    <AddIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center border-green-700">
            <div onClick={()=> deleteCart()} className="text-white">
              <DeleteOutlinedIcon fontSize="large" />
            </div>
          </div>
        </div>
      </>
    );
};

export default CartList;
