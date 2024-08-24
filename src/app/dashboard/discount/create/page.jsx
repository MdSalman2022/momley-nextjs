"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useDiscount from "@/hooks/useDiscount";
import { storeId } from "@/libs/utils/common";
import toast from "react-hot-toast";
import DateTimePicker from "./DateTimePicker";

function generateDiscountCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let discountCode = "";
  const codeLength = 6;

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    discountCode += characters[randomIndex];
  }

  return discountCode;
}

const RadioGroup = ({ label, options, register, name }) => {
  return (
    <div className="flex flex-col border rounded p-6">
      <label className="block mb-2 font-semibold">{label}</label>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label key={option.value} className="mr-4">
            <input
              type="radio"
              {...register(name)}
              value={option.value}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

const DiscountPage = () => {
  const { createDiscount } = useDiscount();
  const [selectedStartDateTime, setSelectedStartDateTime] = useState(
    new Date()
  );
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(new Date());

  const handleStartDateTimeChange = (newStartDateTime) => {
    setSelectedStartDateTime(newStartDateTime);
  };

  const handleEndDateTimeChange = (newEndDateTime) => {
    setSelectedEndDateTime(newEndDateTime);
  };

  console.log("selectedStartDateTime", selectedStartDateTime);
  console.log("selectedEndDateTime", selectedEndDateTime);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discountCode: "",
      discountType: "percentage",
      appliesTo: "all-products",
      minimumRequirement: "none",
      customerEligibility: "everyone",
    },
  });

  const onSubmit = async (data) => {
    console.log("result", data);
    const payload = {
      storeId: storeId,
      discountCode: data.discountCode,
      discountInfo: {
        type: data.discountType,
        value: data.value,
        appliesTo: data.appliesTo,
      },
      minimumRequirement: {
        type: data.minimumRequirement,
        amount: parseFloat(data.minimumAmount),
        quantity: parseInt(data.minimumQuantity),
      },
      customerEligibility: data.customerEligibility,
      customerGroups: data.customerGroups,
      customers: data.customers,
      usageLimits: {
        limitTotalUsage: parseFloat(data.limitTotalUsage),
        totalUsageLimit: data.totalUsageLimit,
        limitPerCustomer: data.limitPerCustomer,
        perCustomerUsageLimit: data.perCustomerUsageLimit,
      },
      categories: data.categories,
      products: data.products,
      startTimestamp: data.startTimestamp,
      endTimestamp: data.endTimestamp,
    };

    console.log("payload", payload);

    const response = await createDiscount(payload);

    if (response?.success) {
      toast.success("Discount created successfully");
      console.log("Discount created successfully");
    }
  };

  const discountTypeOptions = [
    { label: "Percentage", value: "percentage" },
    { label: "Fixed Amount", value: "fixed-amount" },
    { label: "Free Shipping", value: "free-shipping" },
    { label: "Buy 2 Get 1", value: "buy-2-get-1" },
  ];

  const appliesToOptions = [
    { label: "All Products", value: "all-products" },
    { label: "Specific Collections", value: "specific-collections" },
    { label: "Specific Products", value: "specific-products" },
  ];

  const customersEligibilityOptions = [
    { label: "Everyone", value: "everyone" },
    {
      label: "Specific groups of customers",
      value: "specific-groups",
    },
    { label: "Specific customers", value: "specific-customers" },
  ];

  const categoriesOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home-garden", label: "Home & Garden" },
    { value: "sports", label: "Sports" },
    { value: "toys", label: "Toys" },
  ];

  const productsOptions = [
    { value: "laptop", label: "Laptop" },
    { value: "smartphone", label: "Smartphone" },
    { value: "headphones", label: "Headphones" },
    { value: "shoes", label: "Shoes" },
    { value: "watch", label: "Watch" },
  ];

  const selectedOptionMinimumRequirements = watch("minimumRequirement");
  const selectedCustomerEligibility = watch("customerEligibility");
  const limitTotalUsage = watch("limitTotalUsage");
  const limitPerCustomer = watch("limitPerCustomer");

  const minimumRequirementOptions = [
    { value: "none", label: "None" },
    { value: "amount", label: "Minimum Amount" },
    { value: "quantity", label: "Minimum Quantity" },
  ];

  const customerGroupsOptions = [
    { value: "return_customers", label: "Return Customers" },
    { value: "new", label: "New Customers" },
  ];

  console.log("watch", watch("appliesTo"));

  const selectedDate = watch("startDate", new Date());

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Discount Code</h1>

      <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-10">
        <div className="md:col-span-2 2xl:col-span-3 bg-white flex flex-col gap-6">
          <div className="border p-6 rounded">
            <div className="flex justify-between">
              <label className="mb-2 block font-semibold ">Discount Code</label>
              <button
                type="button"
                onClick={() => {
                  setValue("discountCode", generateDiscountCode());
                }}
                className="mb-2  text-[#2D9CDB]"
              >
                Generate Code
              </button>
            </div>
            <input
              type="text"
              placeholder="e.g. SPRINGSALE"
              className="border p-2 w-full"
              {...register("discountCode", {
                required: "Discount code is required",
              })}
            />
            {errors.discountCode && (
              <p className="text-red-500">{errors.discountCode.message}</p>
            )}
          </div>

          <RadioGroup
            label="Type"
            options={discountTypeOptions}
            register={register}
            name="discountType"
          />

          <div className="border p-6 rounded ">
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Value</label>
              <label className="block mb-2 capitalize">
                {watch("discountType")}
              </label>
              {watch("discountType") !== "free-shipping" &&
                watch("discountType") !== "buy-2-get-1" && (
                  <div className="flex flex-col">
                    <input
                      type="number"
                      placeholder={
                        watch("discountType") === "percentage" ? "%" : "BDT"
                      }
                      className="border p-2 w-full"
                      {...register("value", {
                        required: "Value is required",
                        min: {
                          value: 1,
                          message: "Value should be greater than 0",
                        },
                      })}
                    />
                    {errors.value && (
                      <p className="text-red-500">{errors.value.message}</p>
                    )}
                  </div>
                )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Applies to</label>
              <div className="flex flex-col gap-2">
                {appliesToOptions.map((option) => (
                  <label key={option.value} className="mr-4">
                    <input
                      type="radio"
                      {...register("appliesTo")}
                      value={option.value}
                      className="mr-2"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {watch("appliesTo") !== "all-products" && (
              <div className="border p-6 rounded">
                <label className="block mb-2 font-semibold">
                  {watch("appliesTo") === "specific-collections"
                    ? "Categories"
                    : watch("appliesTo") === "specific-products" && "Products"}
                </label>
                <div className="flex flex-col gap-2">
                  {watch("appliesTo") === "specific-collections"
                    ? categoriesOptions.map((category) => (
                        <label key={category.value} className="mr-4">
                          <input
                            type="checkbox"
                            {...register("categories")}
                            value={category.value}
                            className="mr-2"
                          />
                          {category.label}
                        </label>
                      ))
                    : watch("appliesTo") === "specific-products" &&
                      productsOptions.map((product) => (
                        <label key={product.value} className="mr-4">
                          <input
                            type="checkbox"
                            {...register("products")}
                            value={product.value}
                            className="mr-2"
                          />
                          {product.label}
                        </label>
                      ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col border rounded p-6">
            <label className="block mb-2 font-semibold">
              {"Minimum requirements"}
            </label>
            <div className="flex flex-col gap-2">
              {minimumRequirementOptions.map((option) => (
                <label key={option.value} className="mr-4">
                  <input
                    type="radio"
                    {...register("minimumRequirement")}
                    value={option.value}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {(selectedOptionMinimumRequirements === "amount" ||
              selectedOptionMinimumRequirements === "quantity") && (
              <div className="mt-4">
                <label className="block mb-2 font-semibold">
                  {selectedOptionMinimumRequirements === "amount"
                    ? "Enter Minimum Amount"
                    : "Enter Minimum Quantity"}
                </label>
                <input
                  type="number"
                  {...register(
                    selectedOptionMinimumRequirements === "amount"
                      ? "minimumAmount"
                      : "minimumQuantity"
                  )}
                  className="border rounded p-2 w-full"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col border rounded p-6">
            <label className="block mb-2 font-semibold">
              {"Customers eligibility"}
            </label>
            <div className="flex flex-col gap-2">
              {customersEligibilityOptions.map((option) => (
                <label key={option.value} className="mr-4">
                  <input
                    type="radio"
                    {...register("customerEligibility")}
                    value={option.value}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {(selectedCustomerEligibility === "specific-groups" ||
              selectedCustomerEligibility === "specific-customers") && (
              <div className="mt-4">
                <label className="block mb-2 font-semibold">
                  {selectedCustomerEligibility === "specific-groups"
                    ? "Select Customer Groups"
                    : "Select Customers"}
                </label>
                {selectedCustomerEligibility === "specific-customers" && (
                  <input
                    type="number"
                    {...register("customers")}
                    placeholder={
                      selectedCustomerEligibility === "specific-customers" &&
                      "Search customers"
                    }
                    className="border rounded p-2 w-full"
                  />
                )}
                {selectedCustomerEligibility === "specific-groups" &&
                  customerGroupsOptions.map((group) => (
                    <label key={group.value} className="mr-4">
                      <input
                        type="checkbox"
                        {...register("customerGroups")}
                        value={group.value}
                        className="mr-2"
                      />
                      {group.label}
                    </label>
                  ))}
              </div>
            )}
          </div>

          <div className="border rounded p-6">
            <label className="block mb-2 font-semibold">Usage limits</label>
            <div>
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  {...register("limitTotalUsage")}
                />
                Limit number of times discount can be used in total
              </label>
              {limitTotalUsage && (
                <div className="mt-2">
                  <label className="block mb-2 font-semibold">
                    Enter total usage limit
                  </label>
                  <input
                    type="number"
                    {...register("totalUsageLimit")}
                    className="border rounded p-2 w-full"
                  />
                </div>
              )}
              <label className="block mt-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  {...register("limitPerCustomer")}
                />
                Limit to one use per customer
              </label>
              {limitPerCustomer && (
                <div className="mt-2">
                  <label className="block mb-2 font-semibold">
                    Enter per customer usage limit
                  </label>
                  <input
                    type="number"
                    {...register("perCustomerUsageLimit")}
                    className="border rounded p-2 w-full"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border rounded p-6 w-full">
            <DateTimePicker
              selectedStartDateTime={selectedStartDateTime}
              selectedEndDateTime={selectedEndDateTime}
              onStartDateTimeChange={handleStartDateTimeChange}
              onEndDateTimeChange={handleEndDateTimeChange}
              register={register}
              setValue={setValue}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" className="bg-[#BDBDBD] primary-btn">
              Cancel
            </button>
            <button type="submit" className="bg-[#BDBDBD] primary-btn">
              Save and Draft
            </button>
            <button type="submit" className="primary-btn">
              Save and Publish
            </button>
          </div>
        </div>
        <div className="col span-1 flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="border p-4">
              <p className="font-semibold">Summary</p>
              <p>No information entered yet.</p>
            </div>
            <div className="border p-4">
              <p className="font-semibold">Performance</p>
              <p>Discount is not active yet.</p>
            </div>
          </div>
          <div className="border p-4">
            <p className="font-semibold">
              Can’t combine with other automatic discount
            </p>
            <p>
              Customer won’t be able to enter a code if an automic discount is
              already applied at checkout
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DiscountPage;
