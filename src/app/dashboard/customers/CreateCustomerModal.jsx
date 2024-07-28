import React, { useState } from "react";
import ModalBox from "@/components/Shared/ModalBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import useProduct from "@/hooks/useProduct";
import useCustomer from "@/hooks/useCustomer";

const CreateCustomerModal = ({ isOpen, setIsOpen }) => {
  const paymentMethods = ["COD", "Credit Card", "Bkash", "Nagad", "Rocket"];

  const [isSameAddress, setIsSameAddress] = useState(false);
  const { CreateCustomer } = useCustomer();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleValueChange = (value) => {
    setValue("paymentMethod", value, { shouldValidate: true });
  };
  const onSubmit = (data) => {
    const {
      fname,
      lname,
      phone,
      shippingState,
      shippingCity,
      shippingStreet,
      shippingPostalCode,
      billingState,
      billingCity,
      billingStreet,
      billingPostalCode,
      paymentMethod,
    } = data;

    const shippingAddress = {
      state: shippingState,
      city: shippingCity,
      street: shippingStreet,
      postalCode: shippingPostalCode,
    };

    const billingAddress = {
      state: isSameAddress ? shippingState : billingState,
      city: isSameAddress ? shippingCity : billingCity,
      street: isSameAddress ? shippingStreet : billingStreet,
      postalCode: isSameAddress ? shippingPostalCode : billingPostalCode,
    };
    // Handle form submission with validated data
    console.log("data", data);
    const payload = {
      firstName: fname,
      lastName: lname,
      phoneNumber: phone,
      shippingAddress,
      billingAddress,
      paymentMethod,
    };
    const result = CreateCustomer(payload);

    console.log("result", result);
  };

  return (
    <ModalBox isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
      <div className="flex flex-col gap-5 px-10 py-6 bg-white rounded-xl">
        <div className="font-semibold">Create Customer</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-2 gap-x-5 gap-y-2"
        >
          <div className="flex flex-col">
            <label className="text-xs" htmlFor="name">
              First Name
            </label>
            <input
              className="input-box border-[#11111170]"
              id="fname"
              {...register("fname", { required: true })}
            />
            {errors.fname && (
              <span className="text-xs text-red-600">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xs" htmlFor="name">
              Last Name
            </label>
            <input
              className="input-box border-[#11111170]"
              id="lname"
              {...register("lname", { required: true })}
            />
            {errors.lname && (
              <span className="text-xs text-red-600">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xs" htmlFor="description">
              Phone
            </label>
            <input
              className="input-box border-[#11111170]"
              id="phone"
              type="tel"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-xs text-red-600">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 col-span-1 ">
            <label className="text-xs" htmlFor="name">
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
            {errors.paymentMethod && (
              <span className="text-xs text-red-600">
                className="text-xs text-red-600" This field is required
              </span>
            )}
          </div>
          <div className="col-span-2 flex flex-col gap-2 py-3">
            <div className="grid grid-cols-2 gap-x-5 gap-y-2">
              <div className="col-span-2">
                <p className="font-semibold">Shipping Address</p>
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="shippingState">
                  State
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="shippingState"
                  {...register("shippingState", { required: true })}
                />
                {errors.shippingState && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="shippingCity">
                  City
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="shippingCity"
                  {...register("shippingCity", { required: true })}
                />
                {errors.shippingCity && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="shippingStreet">
                  Street
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="shippingStreet"
                  {...register("shippingStreet", { required: true })}
                />
                {errors.shippingStreet && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="shippingPostalCode">
                  Postal Code
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="shippingPostalCode"
                  {...register("shippingPostalCode", { required: true })}
                />
                {errors.shippingPostalCode && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2">
              <div className="col-span-2">
                <div className="flex items-center gap-5">
                  <p className="font-semibold">Billing Address</p>
                  <div className="text-xs">
                    <input
                      type="checkbox"
                      id="whatsapp-toggle"
                      name="whatsapp-toggle"
                      checked={isSameAddress}
                      className="toggle-checkbox"
                      onClick={() => setIsSameAddress(!isSameAddress)}
                    />
                    <label htmlFor="whatsapp-toggle" className="ml-2">
                      Same Address
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="billingState">
                  State
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="billingState"
                  {...register("billingState", {
                    required: isSameAddress ? false : true,
                  })}
                  disabled={isSameAddress ? true : false}
                />
                {errors.billingState && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="billingCity">
                  City
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="billingCity"
                  {...register("billingCity", {
                    required: isSameAddress ? false : true,
                  })}
                  disabled={isSameAddress ? true : false}
                />
                {errors.billingCity && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="billingStreet">
                  Street
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="billingStreet"
                  {...register("billingStreet", {
                    required: isSameAddress ? false : true,
                  })}
                  disabled={isSameAddress ? true : false}
                />
                {errors.billingStreet && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs" htmlFor="billingPostalCode">
                  Postal Code
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="billingPostalCode"
                  {...register("billingPostalCode", {
                    required: isSameAddress ? false : true,
                  })}
                  disabled={isSameAddress ? true : false}
                />
                {errors.billingPostalCode && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-start col-span-2 gap-2">
            <button
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

export default CreateCustomerModal;
