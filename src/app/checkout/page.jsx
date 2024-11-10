"use client";
import React, { useRef, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import lotion from "../../../public/images/products/lotion.jpeg";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiCheckCircle, HiOutlineTrash } from "react-icons/hi";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import {
  formatBDT,
  getAppliedToOptions,
  getDiscountTypeOptions,
  storeId,
} from "@/libs/utils/common";
import toast from "react-hot-toast";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/navigation";
import useDiscount from "@/hooks/useDiscount";
import { BsCartXFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import { useQuery } from "react-query";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";
import AddDeliveryAddressModal from "./AddDeliveryAddressModal";
import { clearCart, getCookie, setCookie } from "@/libs/utils/cookieUtils";
import { FaCircleCheck } from "react-icons/fa6";
import LoadingAnimationFloating from "@/libs/utils/LoadingAnimationFloating";

const CartItem = ({
  item,
  productCloudfrontUrl,
  handleMinusClick,
  handlePlusClick,
  handleRemoveItem,
}) => (
  <div className="flex items-center">
    <div className="flex items-center px-7 gap-5 w-full justify-between">
      <div className="flex items-center h-20 w-[300px] gap-2">
        {item?.images?.length > 0 && (
          <Image
            src={productCloudfrontUrl?.replace(
              "*",
              `products/${item?.images[0]}`
            )}
            alt={item?.name || "Product Image"}
            className="h-12 w-12 object-cover"
            width={48}
            height={48}
          />
        )}
        <div className="flex flex-col gap-1">
          <span className="text-sm">{item?.name}</span>
          {item?.stock?.quantity < item?.quantity && (
            <span className="px-2 py-1 bg-red-100 text-xs w-fit">
              Low Stock
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <span className="text-sm font-semibold">৳ {item?.salePrice}</span>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <div className="flex items-center rounded-sm justify-between border border-[#E0E0E0]">
          <span
            onClick={() => handleMinusClick(item)}
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
            onClick={() => handlePlusClick(item)}
            className="flex items-center rounded-sm-r border-[#E0E0E0] justify-center bg-gray-500 text-white  w-7 h-7 border-l text-xs select-none cursor-pointer"
          >
            <FaPlus />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <span className="text-sm font-semibold">
          ৳ {formatBDT(item?.totalPrice)}
        </span>
      </div>
      <div className="flex items-center justify-center h-20 w-[150px]">
        <button
          type="button"
          className="text-red-500 text-2xl"
          onClick={() => handleRemoveItem(item)}
        >
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  </div>
);

/* const DeliveryMethods = ({ register, pricing, setDeliveryCost }) => {
  const deliveryOptions = [
    {
      value: "dhaka",
      id: "dhaka",
      label: "Home Delivery In Dhaka",
      price: pricing?.dhaka,
      defaultChecked: true,
    },
    {
      value: "dOutside",
      id: "dOutside",
      label: "Home Delivery In Dhaka Outside",
      price: pricing?.dOutside,
    },
    {
      value: "Store",
      id: "Store",
      label: "Store Pickup",
      price: pricing?.storePickup || 0,
    },
  ];

  return (
    <div className="border rounded flex flex-col justify-start py-5 px-8 h-[172px]">
      <p className="text-lg font-bold">Delivery Methods</p>
      <div className="flex flex-col mt-1">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between gap-5 w-full"
          >
            <div className="flex items-center gap-5">
              <input
                {...register("delivery")}
                type="radio"
                value={option.value}
                id={option.id}
                onChange={() => setDeliveryCost(option.price)}
                defaultChecked={option.defaultChecked}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
            <span>{option.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; */
const PaymentOption = ({ register, value, id, label }) => (
  <div className="flex items-center gap-5">
    <input
      {...register("payment", { required: true })}
      type="radio"
      value={value}
      id={id}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);
const PaymentMethods = ({ register, errors }) => (
  <div
    className={`border rounded flex flex-col py-5 px-8 h-fit ${
      errors?.payment && "border-red-500"
    }`}
  >
    <div className="flex items-center gap-1">
      <p className="text-lg font-bold">Payment Methods</p>
      {errors?.payment && (
        <span className="text-red-500 text-xs">This field is required</span>
      )}
    </div>
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
  const { AddToCart, getCartCheckout, EmptyCart, handleRemoveFromCart } =
    useCart();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      division: "",
      city: "",
      area: "",
      address: "",
    },
  });

  console.log("errors", errors);

  const { user } = useContext(AuthContext);
  const { userInfo, isUserInfoLoading, storeInfo, cartInfo, refetchCartInfo } =
    useContext(StateContext);
  const { createOrder } = useOrder();
  const { getDiscountByCode } = useDiscount();
  const [deliveryCost, setDeliveryCost] = useState(70);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountData, setDiscountData] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const router = useRouter();
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("homeDelivery");
  const [discountCode, setDiscountCode] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    fname: "",
    phone: "",
    division: "",
    city: "",
    area: "",
    address: "",
  });

  console.log("deliveryLocation", deliveryLocation);

  useEffect(() => {
    if (userInfo?.customer && userInfo?.customer?.shippingAddress[0]?.city) {
      setDeliveryLocation(userInfo?.customer?.shippingAddress[0]?.city);
      setDeliveryMethod("homeDelivery");
    } else if (!userInfo?._id) {
      setDeliveryLocation(customerInfo?.city);
      setDeliveryMethod("homeDelivery");
    }
  }, [userInfo, customerInfo]);

  const products = Array.isArray(cartInfo)
    ? cartInfo.map(({ productId, quantity }) => ({
        _id: productId,
        quantity,
      }))
    : [];

  useEffect(() => {
    const savedFormData = getCookie("deliveryAddress");
    console.log("savedFormData", savedFormData);

    if (savedFormData) {
      setCustomerInfo(savedFormData); // Populate state with saved cookie data
    }
  }, []);

  console.log("customerInfo", customerInfo);

  const {
    data: checkoutInfo = {},
    isLoading: isCheckoutInfoLoading,
    refetch: refetchCheckoutInfo,
  } = useQuery({
    queryKey: [
      "checkoutInfo",
      storeId,
      userInfo?._id,
      deliveryLocation,
      discountCode,
      products,
    ],
    queryFn: () =>
      storeId &&
      getCartCheckout(
        storeId,
        userInfo?._id,
        deliveryLocation,
        discountCode,
        products
      ),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (checkoutInfo?.items?.length > 0) {
      setCartData(checkoutInfo.items);
    }
  }, [checkoutInfo]);

  console.log("checkoutInfo", checkoutInfo);

  const productCloudfrontUrl = storeInfo?.cloudFrontURL;

  console.log("userInfo", userInfo);
  console.log("storeInfo", storeInfo);
  console.log("option", getAppliedToOptions().option1);
  console.log("cartInfo", cartInfo);

  useEffect(() => {
    if (!isCheckoutInfoLoading && cartData?.length > 0) {
      const total = cartData?.reduce((acc, item) => acc + item.totalPrice, 0);
      setSubTotal(total);
      if (
        discountData?.discountInfo?.appliesTo === getAppliedToOptions().option1
      ) {
        const type = discountData?.discountInfo?.type;
        const value = discountData?.discountInfo?.value;
        if (type === getDiscountTypeOptions().option1) {
          const discountAmount = (total * value) / 100;
          setDiscountAmount(discountAmount);
          setTotalAmount(total - discountAmount + deliveryCost);
        } else if (type === getDiscountTypeOptions().option2) {
          setDiscountAmount(value);
          setTotalAmount(total - value + deliveryCost);
        } else if (type === getDiscountTypeOptions().option3) {
          setDiscountAmount(deliveryCost);
          setTotalAmount(total);
        } else if (type === getDiscountTypeOptions().option4) {
        } else {
          setDiscountAmount(value);
          setTotalAmount(total - value + deliveryCost);
        }
      } else {
        setTotalAmount(total + deliveryCost);
      }
    }
  }, [cartData, deliveryCost, discountData, isCheckoutInfoLoading]);

  console.log("deliveryCost", deliveryCost);
  console.log("subTotal", subTotal);
  console.log("totalAmount", totalAmount);
  console.log("cartInfo", cartInfo);

  const handleCheckDiscount = async () => {
    setDiscountCode(watch("coupon"));
    /*     const discountCode = watch("coupon");
    const discount = await getDiscountByCode(storeId, discountCode);
    console.log("discount", discount);
    if (discount) {
      setDiscountData(discount);
      toast.success("Coupon Code Applied");
    } else {
      toast.error("Invalid Coupon Code");
    } */
  };

  const handleRemoveDiscount = () => {
    setDiscountData({});
    setTotalAmount(totalAmount + discountData?.discountAmount);
  };

  console.log("discountData", discountData);

  useEffect(() => {
    if (userInfo?._id) {
      reset({
        firstName: userInfo?.customer?.firstName,
        lastName: userInfo?.customer?.lastName,
        phone: userInfo?.customer?.phoneNumber,
        email: userInfo?.email || "",
        division:
          (userInfo?._id && userInfo?.customer?.shippingAddress[0]?.state) ||
          "",
        city:
          (userInfo?._id && userInfo?.customer?.shippingAddress[0]?.city) || "",
        area:
          (userInfo?._id && userInfo?.customer?.shippingAddress[0]?.street) ||
          "",
        address:
          (userInfo?._id && userInfo?.customer?.shippingAddress[0]?.street) ||
          "",
      });
    }
  }, [userInfo, reset]);

  const handleMinusClick = async (product) => {
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: product._id,
      quantity: product?.quantity - 1,
    };

    if (userInfo?._id && product?.quantity > 1) {
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCheckoutInfo();
      }
    } else if (product?.quantity > 1) {
      const cartKey = "userCart";

      // Check if the product exists in the cart
      const updatedCart = cartInfo.map((item) =>
        item.productId === product._id
          ? {
              productId: item.productId,
              quantity: item.quantity - 1,
              storeId: storeId,
            }
          : item
      );
      setCookie(cartKey, JSON.stringify(updatedCart), 7);
      refetchCartInfo();
    }
  };

  const handlePlusClick = async (product) => {
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: product._id,
      quantity: product?.quantity + 1,
    };

    if (userInfo?._id) {
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCheckoutInfo();
      }
    } else if (product?.quantity < product?.stock?.quantity) {
      const cartKey = "userCart";

      // Check if the product exists in the cart
      const updatedCart = cartInfo.map((item) =>
        item.productId === product._id
          ? {
              productId: item.productId,
              quantity: item.quantity + 1,
              storeId: storeId,
            }
          : item
      );
      setCookie(cartKey, JSON.stringify(updatedCart), 7);
      refetchCartInfo();
    }
  };

  const handleRemoveItem = async (product) => {
    const response = await handleRemoveFromCart(product, userInfo, cartInfo);

    console.log("return response", response);

    if (response?.success) {
      refetchCheckoutInfo();
      refetchCartInfo();
    }

    // if (response?.success) {
    //   setCartData((prevData) =>
    //     prevData.filter((item) => item._id !== product._id)
    //   );
    // }
  };
  const isQuantityExceedingStock =
    cartData?.length > 0 &&
    cartData?.some((item) => item?.quantity > item?.stock?.quantity);

  console.log("isQuantityExceedingStock", isQuantityExceedingStock);

  const onSubmit = async (data) => {
    console.log("form input", data);
    if (isQuantityExceedingStock) {
      toast.error(
        "One or more items have a quantity exceeding the available stock."
      );
      return;
    }

    if (!data?.payment) {
      toast.error("Please select a payment method");
      return;
    }

    const customerShippingAddress = {
      division: customerInfo?.division,
      city: customerInfo?.city,
      area: customerInfo?.area,
      address: customerInfo?.address,
    };

    const payload = {
      customerId: userInfo?.customer?._id || null,
      customerInfo: userInfo?.customer?._id
        ? null
        : {
            firstName: customerInfo?.fname,
            phoneNumber: customerInfo?.phone,
            shippingAddress: [
              {
                ...customerShippingAddress,
              },
            ],
          },
      storeId: storeId,
      items: cartData?.map(({ _id, salePrice, quantity, name }) => ({
        product: _id,
        price: salePrice,
        quantity,
        productName: name,
      })),
      subTotal: checkoutInfo?.subTotal,
      totalAmount: checkoutInfo?.grandTotal,
      paymentDetails: {
        paymentMethod: data?.payment,
        paymentStatus: "pending",
        partialPayment: 0,
      },
      shippingMethod: deliveryMethod,
      shippingCost: checkoutInfo?.deliveryCharge,
      shippingInfo: userInfo?._id
        ? userInfo?.customer?.shippingAddress[0]
        : customerShippingAddress,
      discountObject: checkoutInfo?.discountId,
      discountAmount: checkoutInfo?.discount,
      notes: data?.comment,
    };

    const response = await createOrder(payload);

    console.log("response", response);
    if (response?.success) {
      router.push("/order-successful");
      userInfo?._id ? await EmptyCart(userInfo?._id) : clearCart();
      refetchCheckoutInfo();
      refetchCartInfo();
    }
  };
  console.log("deliveryMethod", deliveryMethod);

  const handleChangeDeliveryLocation = (value) => {
    console.log("delivery location", value);
    if (value === "homeDelivery") {
      setDeliveryLocation(
        userInfo?._id
          ? userInfo?.customer?.shippingAddress[0]?.city
          : customerInfo?.city
      );
      setDeliveryMethod("homeDelivery");
    } else {
      setDeliveryLocation("storePickup");
      setDeliveryMethod("storePickup");
    }
  };

  console.log("checking", isUserInfoLoading, isCheckoutInfoLoading);

  const [isAddDeliveryAddressModalOpen, setIsAddDeliveryAddressModalOpen] =
    useState(false);

  const firstLoad = useRef(true);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  console.log("cartInfo", cartInfo);

  if (
    firstLoad.current &&
    ((isUserInfoLoading && user?.uid) || isCheckoutInfoLoading)
  ) {
    return <LoadingAnimation />;
  }

  if (!isCheckoutInfoLoading && cartInfo?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <BsCartXFill className="w-24 h-24 text-gray-400 mb-4" />
        <p className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </p>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button onClick={() => router.push("/")} className="primary-btn mt-6">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {((isUserInfoLoading && user?.uid) || isCheckoutInfoLoading) && (
        <LoadingAnimationFloating />
      )}
      <AddDeliveryAddressModal
        isOpen={isAddDeliveryAddressModalOpen}
        setIsOpen={setIsAddDeliveryAddressModalOpen}
        setCustomerInfo={setCustomerInfo}
        customerInfo={customerInfo}
      />
      <div className="container mx-auto my-5 min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-5"
        >
          <div className="col-span-1 mt-5 flex flex-col gap-5 border py-4 px-6 rounded ">
            <div className="flex flex-col gap-5">
              <p className="font-semibold">Delivery Location</p>
              <div className="flex flex-col gap-5">
                <div
                  onClick={() => handleChangeDeliveryLocation("homeDelivery")}
                  className={`flex items-center px-0 bg-gray-100 border  w-full h-24 relative cursor-pointer  ${
                    errors?.deliveryAddress
                      ? "border-red-500"
                      : "border-gray-100"
                  }`}
                >
                  {userInfo?._id &&
                    userInfo?.customer?.shippingAddress[0]?.division && (
                      <Link
                        href="/profile/edit-profile"
                        className="absolute top-3 right-3 flex items-center justify-center rounded-full"
                      >
                        <MdEdit />
                      </Link>
                    )}
                  {!userInfo?._id &&
                    customerInfo?.fname &&
                    customerInfo?.city && (
                      <button
                        type="button"
                        onClick={() => setIsAddDeliveryAddressModalOpen(true)}
                        className="absolute top-3 right-3 flex items-center justify-center rounded-full"
                      >
                        <MdEdit />
                      </button>
                    )}
                  <div className="flex items-center justify-between w-full px-3">
                    <div className={`flex`}>
                      {userInfo?._id &&
                      userInfo?.customer?.shippingAddress[0]?.division ? (
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-3 w-full relative">
                            <Image
                              src={userInfo?.cloudFrontURL?.replace(
                                "*",
                                `${userInfo?.customerId}/${userInfo?.customer?.profilePicture}`
                              )}
                              className="w-10 h-10 rounded-full border"
                              width={40}
                              height={40}
                            />
                            <div className="flex flex-col text-sm">
                              <span className="font-semibold">
                                {userInfo?.customer?.firstName +
                                  " " +
                                  userInfo?.customer?.lastName}{" "}
                              </span>
                              <span>{userInfo?.customer?.phoneNumber}</span>
                              <span className="flex flex-wrap">
                                {userInfo?._id &&
                                  userInfo?.customer?.shippingAddress[0]
                                    ?.address +
                                    ", " +
                                    userInfo?._id &&
                                  userInfo?.customer?.shippingAddress[0]?.area +
                                    ", " +
                                    userInfo?._id &&
                                  userInfo?.customer?.shippingAddress[0]?.city +
                                    ", " +
                                    userInfo?._id &&
                                  userInfo?.customer?.shippingAddress[0]
                                    ?.division}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : !userInfo?._id && customerInfo?.fname ? (
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-3 w-full relative">
                            <div className="flex flex-col text-sm">
                              <span className="font-semibold">
                                {customerInfo?.fname}
                              </span>
                              <span>{customerInfo?.phone}</span>
                              <span className="flex flex-wrap">
                                {customerInfo?.address +
                                  ", " +
                                  customerInfo?.area +
                                  ", " +
                                  customerInfo?.city +
                                  ", " +
                                  customerInfo?.division}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`flex flex-col w-full py-10 items-center px-3`}
                        >
                          <div
                            onClick={() => {
                              userInfo?._id
                                ? router.push("/profile/edit-profile")
                                : setIsAddDeliveryAddressModalOpen(true);
                            }}
                            className="flex gap-3 items-center justify-center w-fit cursor-pointer"
                          >
                            <span className="text-xl text-black">
                              <FiPlus />
                            </span>
                            <div className="flex flex-col">
                              <input
                                className="hidden"
                                {...register("deliveryAddress", {
                                  required: true,
                                })}
                                value={
                                  userInfo?.customer?.shippingAddress[0]
                                    ?.city || customerInfo?.city
                                }
                                placeholder="Delivery Address"
                              />
                              <p>Home Delivery</p>
                              <span>Add Delivery Address</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex w-5 h-5 aspect-square border-2 border-black rounded-full">
                      {deliveryMethod === "homeDelivery" && <FaCircleCheck />}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleChangeDeliveryLocation("storePickup")}
                  className="flex items-center justify-between px-3 bg-gray-100 w-full h-24 cursor-pointer"
                >
                  <div className="flex flex-col w-fit">
                    <p>Store Pickup</p>
                    <p className="text-sm">
                      Collect your parcel from our pick-up point with no
                      shipping fee
                    </p>
                  </div>
                  <div className="flex w-5 h-5 aspect-square border-2 border-black rounded-full">
                    {deliveryMethod === "storePickup" && <FaCircleCheck />}
                  </div>
                </div>
              </div>
            </div>
            <PaymentMethods register={register} errors={errors} />
            <label>
              <span>Comment</span>
              <input
                type="text"
                {...register("comment")}
                className="input-box w-full"
                placeholder={"Comment"}
              />
            </label>
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
                {cartData?.length > 0 &&
                  cartData?.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      productCloudfrontUrl={productCloudfrontUrl}
                      handleMinusClick={handleMinusClick}
                      handlePlusClick={handlePlusClick}
                      handleRemoveItem={handleRemoveItem}
                    />
                  ))}
              </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-5 w-full">
            <PaymentMethods register={register} errors={errors} />
              <DeliveryMethods
              register={register}
              pricing={{
                dhaka: storeInfo?.deliveryCharge?.shipmentInsideDhaka,
                dOutside: storeInfo?.deliveryCharge?.shipmentOutsideDhaka,
                store: storeInfo?.deliveryCharge?.storePickup,
              }}
              setDeliveryCost={setDeliveryCost}
            />
          </div> */}
            <div className="flex border p-9 justify-between w-full">
              <p className="font-semibold text-[22px]">Order Summary</p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    ৳ {formatBDT(checkoutInfo?.subTotal || 0)}
                  </span>
                </div>
                {checkoutInfo?.discountValid && (
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="font-bold">
                      ৳ - {checkoutInfo?.discount || 0}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Charge</span>
                  <span className="font-bold">
                    ৳ {checkoutInfo?.deliveryCharge || 0}
                  </span>
                </div>
                <div className="flex items-center gap-5 border-b pb-5">
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Coupon Code"
                    autoComplete="on"
                    {...register("coupon", { required: false })}
                    readOnly={discountData?.discountCode}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      checkoutInfo?.discountValid
                        ? handleRemoveDiscount()
                        : handleCheckDiscount();
                    }}
                    className={
                      checkoutInfo?.discountValid
                        ? "primary-outline-btn border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        : "primary-btn"
                    }
                  >
                    {checkoutInfo?.discountValid ? "Remove" : "Apply"}
                  </button>
                </div>
                <div className="flex justify-between">
                  <span>Grand Total</span>
                  <span className="font-bold">
                    ৳ {formatBDT(checkoutInfo?.grandTotal || 0)}
                  </span>
                </div>
                <button className="primary-btn w-full flex justify-center cursor-pointer bg-[#333333]">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
