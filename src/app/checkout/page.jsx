"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import lotion from "../../../public/images/products/lotion.jpeg";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

const FormInput = ({
  label,
  register,
  required,
  placeholder,
  type = "text",
  colSpan = "col-span-1",
}) => (
  <label className={`flex flex-col ${colSpan}`}>
    <span>
      {label}
      {required && "*"}
    </span>
    <input
      type={type}
      {...register(label, { required })}
      className="input-box w-full"
      placeholder={placeholder}
    />
  </label>
);

const CartItem = ({ item, handleMinusClick, handlePlusClick }) => (
  <div className="flex items-center">
    <div className="flex items-center px-7 gap-5 w-full justify-between">
      <div className="flex items-center h-20 w-[300px]">
        <Image
          src={item?.image}
          alt="book"
          className="h-12 w-12 object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm">{item?.name}</span>
          <span className="text-xs">{item?.author}</span>
        </div>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <span className="text-sm font-semibold">৳ {item?.price}</span>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <div className="flex items-center rounded-sm justify-between border border-[#E0E0E0]">
          <span
            onClick={handleMinusClick}
            className="flex items-center rounded-sm-l bg-[#F4F0F5] border-[#E0E0E0] justify-center w-7 h-7 border-r text-xs select-none cursor-pointer"
          >
            <FaMinus />
          </span>
          <span className="flex items-center justify-center  w-10 h-7 bg-[#F4F0F5] text-sm">
            {item?.quantity}
          </span>
          <span
            onClick={handlePlusClick}
            className="flex items-center rounded-sm-r border-[#E0E0E0] justify-center bg-gray-500 text-white  w-7 h-7 border-l text-xs select-none cursor-pointer"
          >
            <FaPlus />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <span className="text-sm font-semibold">৳ {item?.totalPrice}</span>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <button className="text-red-500 text-2xl">
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  </div>
);

const CheckoutPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payment: "",
      delivery: "",
    },
  });

  const [cartCount, setCartCount] = useState(0);

  const handleMinusClick = () => {
    if (cartCount === 0) {
      return; // do not update cartCount if it's already 0
    }
    setCartCount(cartCount - 1);
  };

  const handlePlusClick = () => {
    setCartCount(cartCount + 1);
  };

  const cartItems = [
    {
      id: 1,
      name: "Freeman Infusion Cleansing Clay Mask – 1022 ",
      price: 465.0,
      quantity: 1,
      totalPrice: 465.0,
      image: lotion,
    },
    {
      id: 2,
      name: "Himalaya Anti Wrinkle Cream",
      price: 655.0,
      quantity: 1,
      totalPrice: 655.0,
      image: lotion,
    },
    {
      id: 2,
      name: "Himalaya Anti Wrinkle Cream",
      price: 655.0,
      quantity: 1,
      totalPrice: 655.0,
      image: lotion,
    },
    {
      id: 2,
      name: "Himalaya Anti Wrinkle Cream",
      price: 655.0,
      quantity: 1,
      totalPrice: 655.0,
      image: lotion,
    },
    {
      id: 2,
      name: "Himalaya Anti Wrinkle Cream",
      price: 655.0,
      quantity: 1,
      totalPrice: 655.0,
      image: lotion,
    },
    {
      id: 2,
      name: "Himalaya Anti Wrinkle Cream",
      price: 655.0,
      quantity: 1,
      totalPrice: 655.0,
      image: lotion,
    },
  ];

  const onSubmit = (data) => {
    console.log("form input", data);
  };

  return (
    <div className="container mx-auto my-5 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start gap-10"
      >
        <div className="flex flex-col border py-4 px-6 rounded  mt-10">
          <p className="text-lg font-bold">Customer Information</p>

          <div
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-7 pt-5"
          >
            <FormInput
              label="First Name"
              register={register}
              required={true}
              placeholder="First Name"
            />
            <FormInput
              label="Last Name"
              register={register}
              required={true}
              placeholder="Last Name"
            />
            <FormInput
              label="Phone Number"
              register={register}
              required={true}
              placeholder="Phone Number"
              colSpan="col-span-2"
            />
            <FormInput
              label="Email"
              register={register}
              placeholder="Email (Optional)"
              colSpan="col-span-2"
            />
            <FormInput
              label="Region"
              register={register}
              required={true}
              placeholder="Region"
              colSpan="col-span-2"
            />
            <FormInput
              label="City"
              register={register}
              required={true}
              placeholder="City"
            />
            <FormInput
              label="Area"
              register={register}
              required={true}
              placeholder="Area"
            />
            <FormInput
              label="Address"
              register={register}
              required={true}
              placeholder="Address"
              colSpan="col-span-2"
            />
            <FormInput
              label="Comment"
              register={register}
              placeholder="Comment"
              colSpan="col-span-2"
            />
          </div>
        </div>
        <div className="mt-10 w-full flex flex-col gap-6">
          <div className="flex flex-col border rounded">
            <div className="bg-[#F2F2F2] flex items-center px-7 gap-5 w-full justify-between">
              <div className="flex items-center h-10 w-[300px]">
                <span className="flex items-center gap-1 text-[#BDBDBD]">
                  Products Details <span className="text-xs">(2 items)</span>
                </span>
              </div>
              <div className="flex items-center justify-center h-10 w-[150px]">
                <span className="flex items-center gap-1 text-[#BDBDBD]">
                  Unit Price
                </span>
              </div>
              <div className="flex items-center justify-center h-10 w-[150px]">
                <span className="flex items-center gap-1 text-[#BDBDBD]">
                  Quantity
                </span>
              </div>
              <div className="flex items-center justify-center h-10 w-[150px]">
                <span className="flex items-center gap-1 text-[#BDBDBD]">
                  Total Price
                </span>
              </div>
              <div className="flex items-center justify-center h-10 w-[150px]">
                <span className="flex items-center gap-1 text-[#BDBDBD]">
                  Action
                </span>
              </div>
            </div>
            <div className=" flex flex-col">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleMinusClick={handleMinusClick}
                  handlePlusClick={handlePlusClick}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 w-full">
            <div className="border rounded flex flex-col py-5 px-8 h-[172px]">
              <p className="text-lg font-bold">Payment Methods</p>
              <div className="flex items-center gap-5">
                <Controller
                  control={control}
                  name="payment"
                  render={({ field }) => (
                    <input {...field} type="radio" value="online" id="online" />
                  )}
                />
                <label htmlFor="online">Online Payment</label>
              </div>
              <div className="flex items-center gap-5">
                <Controller
                  control={control}
                  name="payment"
                  render={({ field }) => (
                    <input {...field} type="radio" value="cash" id="cash" />
                  )}
                />
                <label htmlFor="cash">Cash On Delivery</label>
              </div>
            </div>
            <div className="border rounded flex flex-col justify-start py-5 px-8 h-[172px]">
              <p className="text-lg font-bold">Delivery Methods</p>
              <div className="flex flex-col mt-1">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <Controller
                      control={control}
                      name="delivery"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          value="dhaka"
                          id="dhaka"
                        />
                      )}
                    />
                    <label htmlFor="dhaka">Home Delivery In Dhaka</label>
                  </div>
                  <span>50.00</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-between gap-5 w-full">
                    <div className="flex items-center gap-5">
                      <Controller
                        control={control}
                        name="delivery"
                        render={({ field }) => (
                          <input
                            {...field}
                            type="radio"
                            value="dOutside"
                            id="dOutside"
                          />
                        )}
                      />
                      <label htmlFor="dOutside">
                        Home Delivery In Dhaka Outside
                      </label>
                    </div>
                    <span>120.00</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-between gap-5 w-full">
                    <div className="flex items-center gap-5">
                      <Controller
                        control={control}
                        name="delivery"
                        render={({ field }) => (
                          <input
                            {...field}
                            type="radio"
                            value="Store"
                            id="Store"
                          />
                        )}
                      />
                      <label htmlFor="Store">Store Pickup</label>
                    </div>
                    <span>0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex border p-9 justify-between w-full">
            <p className="font-semibold text-[22px]">Order Summary</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">৳ 1120.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span className="font-bold">৳ 50.00</span>
              </div>
              <div className="flex items-center gap-5 border-b pb-5">
                <input
                  type="text"
                  className="input-box"
                  placeholder="Coupon Code"
                  {...register("coupon", { required: false })}
                />
                <div className="primary-outline-btn">Apply</div>
              </div>
              <div className="flex justify-between">
                <span>Grand Total</span>
                <span className="font-bold">৳ 1170.00</span>
              </div>
              <button className="primary-btn w-full flex justify-center cursor-pointer bg-[#333333]">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
