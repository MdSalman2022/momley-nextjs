"use client";
import React, { useContext, useEffect, useState } from "react";
import ModalBox from "@/components/Shared/ModalBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { FaCheck, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import useCustomer from "@/hooks/useCustomer";
import useProduct from "@/hooks/useProduct";
import useOrder from "@/hooks/useOrder";
import { storeId } from "@/libs/utils/common";
import { StateContext } from "@/contexts/StateProvider/StateProvider";

const CreateOrderModal = ({ isOpen, setIsOpen }) => {
  const { storeInfo } = useContext(StateContext);
  const { createOrder } = useOrder();
  const { SearchProduct } = useProduct();
  const { SearchCustomer } = useCustomer();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  console.log("errors", errors);

  const paymentMethods = ["COD", "Credit Card", "Bkash", "Nagad", "Rocket"];
  const deliveryMethod = [
    {
      name: "Inside Dhaka",
      value: "dhaka",
      cost: storeInfo?.deliveryCharge?.shipmentInsideDhaka,
    },
    {
      name: "Inside Dhaka",
      value: "dOutside",
      cost: storeInfo?.deliveryCharge?.shipmentOutsideDhaka,
    },
    {
      name: "Store Pickup",
      value: "Store",
      cost: storeInfo?.deliveryCharge?.storePickup,
    },
  ];

  const handleValueChange = (value) => {
    setValue("paymentMethod", value, { shouldValidate: true });
  };
  const handleUpdateDeliveryMethod = (value) => {
    console.log("valuevalue", value);
    setValue(
      "deliveryCost",
      deliveryMethod.find((method) => method.value === value)?.cost,
      { shouldValidate: true }
    );
    setValue("deliveryMethod", value, { shouldValidate: true });
  };
  const onSubmit = async (data) => {
    // Handle form submission with validated data
    console.log("datadata", data);

    const totalAmount = selectedProducts?.reduce(
      (acc, product) => acc + parseInt(product?.price * product?.quantity),
      0
    );

    const items = selectedProducts?.map((product) => ({
      product: product?._id,
      quantity: product?.quantity,
      price: product?.price,
      productName: product?.name,
    }));

    console.log("items", items);
    console.log(
      "selectedCustomer?.shippingAddress[0]?.state",
      selectedCustomer?.shippingAddress[0]?.state
    );

    const payload = {
      customerId: selectedCustomer?._id,
      storeId: storeId,
      items,
      subTotal: parseInt(totalAmount),
      totalAmount: parseInt(totalAmount) + data?.deliveryCost,
      customerName: data?.name,
      customerPhone: data?.phone,
      deliveryAddress: data.deliveryAddress,
      paymentDetails: {
        paymentMethod: data?.paymentMethod,
        paymentStatus: "pending",
        partialPayment: 0,
      },
      shippingMethod: data.deliveryMethod,
      shippingCost: data.deliveryCost,
      discountCode: data.discountCode,
      discountAmount: data.discountAmount,
      notes: data.notes,
      customCustomerDetails: {
        phone:
          data?.phone !== selectedCustomer?.phoneNumber
            ? data?.phone
            : undefined,
        shippingAddress: {
          state:
            selectedCustomer?.shippingAddress[0]?.state !== data?.state
              ? data?.state
              : undefined,
          city:
            selectedCustomer?.shippingAddress[0]?.city !== data?.city
              ? data?.city
              : undefined,
          street:
            selectedCustomer?.shippingAddress[0]?.street !== data?.area
              ? data?.area
              : undefined,
          address:
            selectedCustomer?.shippingAddress[0]?.street !== data?.address
              ? data?.address
              : undefined,
        },
      },
    };

    console.log("payload", payload);
    const result = await createOrder(payload);

    console.log("resultresult", result);
  };

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  console.log("selectedCustomer", selectedCustomer);

  console.log("selectedProducts", selectedProducts, selectedProducts?.length);

  const [searchInput, setSearchInput] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchCustomers, setSearchCustomers] = useState([]);
  console.log("searchProducts", searchProducts);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearchCustomerModalOpen, setIsSearchCustomerModalOpen] =
    useState(false);

  const handleSearchProduct = async (e) => {
    console.log("e", e);
    e.preventDefault();
    const result = await SearchProduct(searchInput, "66965d022e79323150e122df");
    console.log("result", result);
    setSearchProducts(result?.data);
    if (result?.data?.length > 0) {
      setIsSearchModalOpen(true);
    }
  };

  const handleSearchCustomer = async (e) => {
    console.log("e", e);
    e.preventDefault();
    const result = await SearchCustomer(
      searchCustomerName,
      "66965d022e79323150e122df"
    );
    console.log("result", result);
    if (result?.customers?.length > 0) {
      setIsSearchCustomerModalOpen(true);
      setSearchCustomers(result?.customers);
    }
  };

  console.log("searchCustomers", searchCustomers);

  return (
    <ModalBox isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
      <div className="flex flex-col gap-1 px-10 py-6 bg-white rounded-xl w-full ">
        <div className="font-semibold">Create Order</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-5 border-t pt-3"
        >
          <div className="col-span-2">
            <div className="col-span-2 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 col-span-2">
                <div className="relative col-span-2 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm" htmlFor="name">
                        Search Product
                      </label>
                      <div className="flex gap-3 items-end w-full">
                        <input
                          className="input-box w-full border-[#11111170]"
                          id="search"
                          onChange={(e) => {
                            setSearchInput(e.target.value);
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => handleSearchProduct(e)}
                          className="border w-14 h-10 rounded flex items-center justify-center"
                        >
                          <FaSearch />
                        </button>
                      </div>
                    </div>
                  </div>
                  {isSearchModalOpen && (
                    <div className="absolute top-[70px] z-50 bg-white w-full min-h-10 max-h-32 overflow-y-auto border rounded-l0 p-2 flex flex-col gap-2">
                      <div className="text-sm flex justify-between w-full">
                        <span className="w-40">Name</span>
                        <span className="">In stock</span>
                        <span>Stock</span>
                        <span>Price</span>
                        <span>Action</span>
                      </div>
                      {searchProducts?.map((item, index) => (
                        <span
                          key={index}
                          className="flex justify-between w-full text-sm"
                        >
                          <span className="w-40">{item?.name}</span>
                          <span className="border rounded-full w-6 h-6 flex justify-center items-center">
                            {item?.stock?.inStock ? (
                              <FaCheck className="text-xs" />
                            ) : (
                              <span className=""></span>
                            )}
                          </span>
                          <span>{item?.stock?.quantity}</span>
                          <span>{item?.salePrice}</span>
                          <span
                            onClick={() => {
                              const itemQuantity = {
                                ...item,
                                quantity: 1,
                              };
                              selectedProducts?.length > 0
                                ? setSelectedProducts((prevItems) => [
                                    ...prevItems,
                                    itemQuantity,
                                  ])
                                : setSelectedProducts([itemQuantity]);
                              setIsSearchModalOpen(false);
                            }}
                            className="flex justify-center cursor-pointer"
                          >
                            <FaPlus />
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative col-span-2 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm" htmlFor="name">
                        Search Customer
                      </label>
                      <div className="flex items-end gap-3">
                        <input
                          className="input-box w-full border-[#11111170]"
                          id="search"
                          onChange={(e) => {
                            setSearchCustomerName(e.target.value);
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => handleSearchCustomer(e)}
                          className="border w-14 h-10 rounded flex items-center justify-center"
                        >
                          <FaSearch />
                        </button>
                      </div>
                    </div>
                  </div>
                  {isSearchCustomerModalOpen && (
                    <div className="absolute top-[70px] bg-white w-full min-h-10 max-h-32 overflow-y-auto border rounded-l0 p-2 flex flex-col gap-2">
                      <div className="text-sm flex justify-between w-full">
                        <span className="w-28">Name</span>
                        <span className="w-20">Phone</span>
                        <span className="w-[76px]">Verified</span>
                        <span className="w-16">Action</span>
                      </div>
                      {searchCustomers?.map((item, index) => (
                        <span
                          key={index}
                          className="flex justify-between w-full text-sm"
                        >
                          <span className="w-20">{item?.firstName}</span>
                          <span className="w-20">{item?.phoneNumber}</span>
                          <span className="border rounded-full w-6 h-6 flex justify-center items-center">
                            {item?.isVerified ? (
                              <FaCheck className="text-xs" />
                            ) : (
                              <span className=""></span>
                            )}
                          </span>
                          <span
                            onClick={() => {
                              setSelectedCustomer(item);
                              setIsSearchCustomerModalOpen(false);
                            }}
                            className="flex justify-center cursor-pointer w-20"
                          >
                            <span className="w-6 h-6 flex justify-center items-center">
                              <FaCheck className="text-xs" />
                            </span>
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {selectedProducts?.length > 0 && (
                <div className="grid grid-cols-2 gap-5 col-span-2 border-t py-2">
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-sm" htmlFor="name">
                      Selected Products
                    </label>
                    <div className="flex flex-col bg-gray-100 p-5 rounded-lg min-h-10 max-h-32 overflow-y-auto ">
                      <div className="flex justify-between w-full text-sm font-semibold">
                        <div className="flex gap-1">
                          <span>Id</span>
                          <span>Name</span>
                        </div>
                        <div className="flex">
                          <span className="flex justify-center w-20">
                            Quantity
                          </span>
                          <span className="flex justify-center w-10">
                            Action
                          </span>
                        </div>
                      </div>
                      {selectedProducts?.length > 0 &&
                        selectedProducts?.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between w-full text-sm"
                          >
                            <div className="flex gap-1">
                              <span>{index + 1}.</span>
                              <span>{item?.name}</span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="flex justify-center w-20">
                                <input
                                  className="input-box w-12 h-8"
                                  type="number"
                                  name=""
                                  id=""
                                  min={1}
                                  max={100}
                                  defaultValue={1}
                                  onChange={(e) => {
                                    const quantity = parseInt(e.target.value);

                                    const updatedProductList =
                                      selectedProducts.map((product) =>
                                        product._id === item?._id
                                          ? { ...product, quantity }
                                          : product
                                      );
                                    console.log(
                                      "updatedProductList",
                                      updatedProductList
                                    );
                                    setSelectedProducts(updatedProductList);
                                  }}
                                />
                              </span>
                              <span className="flex justify-center w-10 text-red-600 cursor-pointer">
                                <FaTrash />
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-2 mt-3">
              <label className="font-semibold">Customer Details</label>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id="name"
                    {...register("name", { required: true })}
                    defaultValue={selectedCustomer?.firstName}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id="phone"
                    {...register("phone", { required: true })}
                    defaultValue={selectedCustomer?.phoneNumber}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm" htmlFor="discountCode">
                    Discount Code
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id="discountCode"
                    {...register("discountCode", { required: false })}
                  />
                  {errors.discountCode && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 ">
                  <label className="text-sm" htmlFor="discountAmount">
                    Discount Amount
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id="discountAmount"
                    {...register("discountAmount", { required: false })}
                  />
                  {errors.discountAmount && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-5">
                  <div className="flex flex-col gap-1 col-span-1 ">
                    <label className="text-sm" htmlFor="name">
                      Payment Method
                    </label>
                    <Select onValueChange={handleValueChange}>
                      <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
                        <SelectValue
                          placeholder="Select Payment Method"
                          {...register("paymentMethod", { required: true })}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.delivery && (
                      <span className="text-xs text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <div className="flex flex-col gap-1 col-span-1 ">
                    <label className="text-sm" htmlFor="name">
                      Delivery Method
                    </label>
                    <Select onValueChange={handleUpdateDeliveryMethod}>
                      <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
                        <SelectValue
                          placeholder="Select Delivery Method"
                          {...register("deliveryMethod", { required: true })}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryMethod.map((option, index) => (
                          <SelectItem key={index} value={option?.value}>
                            {option?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.delivery && (
                      <span className="text-xs text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                {/*     <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm" htmlFor="billingAddress">
                    Billing Address
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id="billingAddress"
                    {...register("billingAddress", { required: true })}
                    defaultValue={
                      selectedCustomer?.billingAddress?.length > 0
                        ? selectedCustomer?.billingAddress[0]?.street
                        : ""
                    }
                  />
                  {errors.billingAddress && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-span-2 gap-2 flex flex-col">
            <div className="">
              <p className="text-gray-500">Delivery Address</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor="state">
                  State
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="state"
                  {...register("state", { required: true })}
                  defaultValue={
                    selectedCustomer?.shippingAddress?.length > 0
                      ? selectedCustomer?.shippingAddress[0]?.state
                      : ""
                  }
                />
                {errors.state && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor="city">
                  City
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="city"
                  {...register("city", { required: true })}
                  defaultValue={
                    selectedCustomer?.shippingAddress?.length > 0
                      ? selectedCustomer?.shippingAddress[0]?.city
                      : ""
                  }
                />
                {errors.city && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor="area">
                  Area
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="area"
                  {...register("area", { required: true })}
                  defaultValue={
                    selectedCustomer?.shippingAddress?.length > 0
                      ? selectedCustomer?.shippingAddress[0]?.area
                      : ""
                  }
                />
                {errors.area && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor="address">
                  Address
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="address"
                  {...register("address", { required: true })}
                  defaultValue={
                    selectedCustomer?.shippingAddress?.length > 0
                      ? selectedCustomer?.shippingAddress[0]?.address
                      : ""
                  }
                />
                {errors.address && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  className="input-box border-[#11111170] w-full h-20"
                  id="notes"
                  {...register("notes", { required: false })}
                />
                {errors.notes && (
                  <span className="text-xs text-red-600">{errors.notes}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-start col-span-4 gap-2">
            <button
              type="button"
              className="primary-outline-btn"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button className="primary-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </ModalBox>
  );
};

export default CreateOrderModal;
