import { BiHomeAlt } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { StateContext } from "../../../contexts/StateProvider/StateProvider";
import { useContext, useEffect, useState } from "react";
import CheckoutBookList from "../../../components/Main/CheckoutPage/CheckoutBookList";

const CheckoutPage = () => {
  const { cart, setCart } = useContext(StateContext);

  const totalPrice = cart.reduce(
    (accumulator, item) => accumulator + item.totalPrice,
    0
  );

  return (
    <div className="pb-20 pt-5 container mx-auto">
      <div className="flex flex-col gap-5">
        <span className="py-3 px-5 text-white bg-gray-500 w-full">
          Delivery Address
        </span>

        <div className="flex justify-between px-5">
          <div className="flex items-center gap-5">
            <BiHomeAlt className="text-3xl" />
            <div>
              <p>Omar Faaruk - 091852322423</p>
              <p>Siis COnsulting, 3rd FLoor, Akmol</p>
              <p>Quarter, Demra, Dhaka - South, Dhaka</p>
            </div>
          </div>
          <Link to="/checkout/info" className="flex items-center">
            <button className="primary-btn flex items-center justify-center h-12 w-60 gap-2">
              <BsCartPlus className="text-xl" />
              Add New Address
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-6 py-3 px-5 text-white bg-gray-500 w-full">
          <div className="col-span-2">
            Product Details <span className="text-xs">(2 items)</span>
          </div>
          <div>Unit Price</div>
          <div>Quantity</div>
          <div>Total Price</div>
          <div>Action</div>
        </div>
        {cart.map((item, index) => (
          <CheckoutBookList key={index} book={item} />
        ))}

        <div className="bg-[#F6F6F6] grid grid-cols-6 p-10">
          <div className="col-span-4">
            <p>Order Summary</p>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Subtotal (2 items)</p>
              <p className="font-semibold">Shipping Charge</p>
              <input
                className="input-box"
                type="text"
                placeholder="Coupon Code"
              />
              <p className="font-semibold">Grand Total</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>{parseFloat(totalPrice.toFixed(2)).toFixed(2)}</p>
              <p>50.00</p>
              <button className="primary-outline-btn">Apply</button>
              <p>{(parseFloat(totalPrice.toFixed(2)) + 50).toFixed(2)}</p>
            </div>

            <Link to="/checkout/successfull" className="col-span-2">
              <button className="primary-btn w-full">Place Order</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
