"use client";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import lotion from "../../../public/images/products/lotion.jpeg";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import { storeId } from "@/libs/utils/common";
import toast from "react-hot-toast";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/navigation";

const FormInput = ({
  label,
  name,
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
      {...register(name, { required })}
      className="input-box w-full"
      placeholder={placeholder}
    />
  </label>
);

const CartItem = ({
  item,
  handleMinusClick,
  handlePlusClick,
  handleRemoveItem,
}) => (
  <div className="flex items-center">
    <div className="flex items-center px-7 gap-5 w-full justify-between">
      <div className="flex items-center h-20 w-[300px]">
        <Image src={lotion} alt="book" className="h-12 w-12 object-cover" />
        <div className="flex flex-col gap-1">
          <span className="text-sm">{item?.name}</span>
          <span className="text-xs">{item?.author}</span>
        </div>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <span className="text-sm font-semibold">৳ {item?.salePrice}</span>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <div className="flex items-center rounded-sm justify-between border border-[#E0E0E0]">
          <span
            onClick={() => handleMinusClick(item._id)}
            className={`flex items-center rounded-sm-l justify-center w-7 h-7 border-r text-xs select-none cursor-pointer ${
              item?.quantity === 1
                ? "bg-gray-100 text-gray-200 cursor-not-allowed"
                : "bg-[#F4F0F5] border-[#E0E0E0] cursor-pointer"
            }`}
          >
            <FaMinus />
          </span>
          <span className="flex items-center justify-center  w-10 h-7 bg-[#F4F0F5] text-sm">
            {item?.quantity}
          </span>
          <span
            onClick={() => handlePlusClick(item._id)}
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
        <button
          type="button"
          className="text-red-500 text-2xl"
          onClick={() => handleRemoveItem(item._id)}
        >
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  </div>
);

const DeliveryOption = ({
  register,
  value,
  id,
  label,
  price,
  setDeliveryCost,
}) => (
  <div className="flex items-center justify-between gap-5 w-full">
    <div className="flex items-center gap-5">
      <input
        {...register("delivery")}
        type="radio"
        value={value}
        id={id}
        onChange={() => setDeliveryCost(price)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
    <span>{price}</span>
  </div>
);
const DeliveryMethods = ({ register, pricing, setDeliveryCost }) => (
  <div className="border rounded flex flex-col justify-start py-5 px-8 h-[172px]">
    <p className="text-lg font-bold">Delivery Methods</p>
    <div className="flex flex-col mt-1">
      <DeliveryOption
        register={register}
        value="dhaka"
        id="dhaka"
        label="Home Delivery In Dhaka"
        price={pricing?.dhaka}
        setDeliveryCost={setDeliveryCost}
      />
      <DeliveryOption
        register={register}
        value="dOutside"
        id="dOutside"
        label="Home Delivery In Dhaka Outside"
        price={pricing?.dOutside}
        setDeliveryCost={setDeliveryCost}
      />
      <DeliveryOption
        register={register}
        value="Store"
        id="Store"
        label="Store Pickup"
        price={pricing?.storePickup || 0}
        setDeliveryCost={setDeliveryCost}
      />
    </div>
  </div>
);

const PaymentOption = ({ register, value, id, label }) => (
  <div className="flex items-center gap-5">
    <input {...register("payment")} type="radio" value={value} id={id} />
    <label htmlFor={id}>{label}</label>
  </div>
);

const PaymentMethods = ({ register }) => (
  <div className="border rounded flex flex-col py-5 px-8 h-[172px]">
    <p className="text-lg font-bold">Payment Methods</p>
    <PaymentOption
      register={register}
      value="Credit Card"
      id="online"
      label="Online Payment"
    />
    <PaymentOption
      register={register}
      value="COD"
      id="cash"
      label="Cash On Delivery"
    />
  </div>
);

const CheckoutPage = () => {
  const { cart, setCart, userInfo, isUserInfoLoading, storeInfo } =
    useContext(StateContext);
  const { createOrder } = useOrder();
  console.log("userInfo", userInfo);
  console.log("storeInfo", storeInfo);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    setSubTotal(total);
    setTotalAmount(total + deliveryCost);
  }, [cart, deliveryCost]);

  console.log("deliveryCost", deliveryCost);
  console.log("totalAmount", totalAmount);
  console.log("cart", cart);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      state: "",
      city: "",
      area: "",
      address: "",
    },
  });

  useEffect(() => {
    if (userInfo?._id) {
      reset({
        firstName: userInfo?.customer?.firstName,
        lastName: userInfo?.customer?.lastName,
        phone: userInfo?.customer?.phoneNumber,
        email: userInfo?.email || "",
        state: userInfo?.customer?.shippingAddress[0]?.state || "",
        city: userInfo?.customer?.shippingAddress[0]?.city || "",
        area: userInfo?.customer?.shippingAddress[0]?.street || "",
        address: userInfo?.customer?.shippingAddress[0]?.street || "",
      });
    }
  }, [userInfo, reset]);

  const handleMinusClick = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId) {
        const newQuantity = item.quantity - 1;
        const newTotalPrice =
          item.salePrice * (newQuantity < 1 ? 1 : newQuantity);
        return {
          ...item,
          quantity: newQuantity < 1 ? 1 : newQuantity,
          totalPrice: newTotalPrice,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handlePlusClick = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId) {
        const newQuantity = item.quantity + 1;
        const newTotalPrice = item.salePrice * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  console.log("cartItems", cartItems);

  const onSubmit = async (data) => {
    console.log("form input", data);

    const payload = {
      customerId: userInfo?.customer?._id,
      storeId: storeId,
      items: cartItems.map(({ _id, salePrice, quantity, name }) => ({
        product: _id,
        price: salePrice,
        quantity,
        productName: name,
      })),
      subTotal: subTotal,
      totalAmount: totalAmount,
      paymentDetails: {
        paymentMethod: data?.payment,
        paymentStatus: "pending",
        partialPayment: 0,
      },
      shippingMethod: data?.delivery,
      shippingCost: deliveryCost,
      discountCode: data?.coupon,
      discountAmount: 0,
      notes: data?.comment,
    };
    if (data?.firstName !== userInfo?.customer?.firstName) {
      payload.customCustomerDetails.name = data?.name;
    }
    if (data?.phone !== userInfo?.customer?.phoneNumber) {
      payload.customCustomerDetails.phone = data?.phone;
    }
    if (data?.email !== userInfo?.email) {
      payload.customCustomerDetails.email = data?.email;
    }
    if (userInfo?.customer?.shippingAddress?.[0]?.state !== data?.state) {
      payload.customCustomerDetails.shippingAddress.state = data?.state;
    }
    if (userInfo?.customer?.shippingAddress?.[0]?.city !== data?.city) {
      payload.customCustomerDetails.shippingAddress.city = data?.city;
    }
    if (userInfo?.customer?.shippingAddress?.[0]?.street !== data?.area) {
      payload.customCustomerDetails.shippingAddress.street = data?.area;
    }
    if (userInfo?.customer?.shippingAddress?.[0]?.street !== data?.address) {
      payload.customCustomerDetails.shippingAddress.street = data?.address;
    }

    const response = await createOrder(payload);

    console.log("response", response);
    if (response?.success) {
      router.push("/order-successful");
      toast.success("Order placed successfully");
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (isUserInfoLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="container mx-auto my-5 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-5"
      >
        <div className="col-span-1 mt-5 flex flex-col border py-4 px-6 rounded ">
          <p className="text-lg font-bold">Customer Information</p>

          <div className="grid grid-cols-2 gap-7 pt-5">
            <FormInput
              label="First Name"
              name="firstName"
              register={register}
              required={true}
              placeholder="First Name"
            />
            <FormInput
              label="Last Name"
              name="lastName"
              register={register}
              required={true}
              placeholder="Last Name"
            />
            <FormInput
              label="Phone Number"
              name="phone"
              register={register}
              required={true}
              placeholder="Phone Number"
              colSpan="col-span-2"
            />
            <FormInput
              label="Email"
              name="email"
              register={register}
              placeholder="Email (Optional)"
              colSpan="col-span-2"
            />
            <FormInput
              label="State"
              name="state"
              register={register}
              required={true}
              placeholder="state"
              colSpan="col-span-2"
            />
            <FormInput
              label="City"
              name="city"
              register={register}
              required={true}
              placeholder="City"
            />
            <FormInput
              label="Area"
              name="area"
              register={register}
              required={true}
              placeholder="Area"
            />
            <FormInput
              label="Address"
              name="address"
              register={register}
              required={true}
              placeholder="Address"
              colSpan="col-span-2"
            />
            <FormInput
              label="Comment"
              name="comment"
              register={register}
              placeholder="Comment"
              colSpan="col-span-2"
            />
          </div>
        </div>
        <div className="col-span-2 mt-5 w-full flex flex-col gap-5">
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
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 w-full">
            <PaymentMethods register={register} />
            <DeliveryMethods
              register={register}
              pricing={{
                dhaka: storeInfo?.deliveryCharge?.shipmentInsideDhaka,
                dOutside: storeInfo?.deliveryCharge?.shipmentOutsideDhaka,
                store: storeInfo?.deliveryCharge?.storePickup,
              }}
              setDeliveryCost={setDeliveryCost}
            />
          </div>
          <div className="flex border p-9 justify-between w-full">
            <p className="font-semibold text-[22px]">Order Summary</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">৳ {subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span className="font-bold">
                  ৳{" "}
                  {deliveryCost ||
                    storeInfo?.deliveryCharge?.shipmentInsideDhaka}
                </span>
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
                <span className="font-bold">৳ {totalAmount}</span>
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
