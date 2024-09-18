"use client";
import React, { useState } from "react";
import bkashLogo from "../../../../../public/images/icons/bkash.png";
import nagadLogo from "../../../../../public/images/icons/nagad.png";
import rocketLogo from "../../../../../public/images/icons/rocket.png";
import codLogo from "../../../../../public/images/icons/cod.jpg";
import Image from "next/image";
import { Switch } from "@headlessui/react";
import HeadlessModalBox from "@/components/Shared/HeadlessModalBox";
import { useForm } from "react-hook-form";
import usePayment from "@/hooks/usePayment";
import { storeId } from "@/libs/utils/common";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const {
    createPaymentKeys,
    getPaymentMethods,
    getPayments,
    updatePaymentKeyStatus,
  } = usePayment();

  const {
    data: paymentMethods = [],
    isLoading: isPaymentMethodsLoading,
    refetch: refetchPaymentMethods,
  } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => storeId && getPaymentMethods(),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });
  const {
    data: paymentInfo = [],
    isLoading: isPaymentInfoLoading,
    refetch: refetchPaymentInfo,
  } = useQuery({
    queryKey: ["paymentInfo"],
    queryFn: () => storeId && getPayments(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  console.log("paymentInfo", paymentInfo);

  const logoMapping = {
    bKash: bkashLogo,
    Nagad: nagadLogo,
    Rocket: rocketLogo,
    "Cash on delivery": codLogo,
  };

  const activeStatusMapping = paymentInfo.reduce((acc, info) => {
    acc[info.methodId] = info.active;
    return acc;
  }, {});

  console.log("activeStatusMapping", activeStatusMapping);

  const Methods = paymentMethods.map((method) => ({
    ...method,
    logo: logoMapping[method.name] || null,
    isSetup: paymentInfo?.find((info) => info.methodId === method._id)
      ? true
      : false,
    isActive: paymentInfo?.find((info) => info.methodId === method._id)?.active,
    keyId: paymentInfo?.find((info) => info.methodId === method._id)?._id,
    cod: method.name === "Cash on delivery",
  }));

  console.log("Methods", Methods);
  console.log("paymentMethods", paymentMethods);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission logic here
    console.log("API Key:", data.apiKey);
    console.log("Secret Key:", data.secretKey);
    const payload = {
      storeId: storeId,
      apiKey: data.apiKey,
      secretKey: data.secretKey,
      paymentMethod: method.id,
    };

    console.log("payload", payload);

    const response = await createPaymentKeys(payload);
    console.log("response", response);
    if (response?.success) {
      refetchPaymentInfo();
      refetchPaymentMethods();
      setIsSetupOpen(false);
    }
  };

  const handleUpdatePaymentStatus = async (methodId, status, rootKey) => {
    console.log("methodId", methodId);
    console.log("status", status);

    if (!methodId) {
      const payload = {
        storeId: storeId,
        paymentMethod: rootKey,
        active: status,
      };

      const response = await createPaymentKeys(payload);
      console.log("response", response);
      if (response.success) {
        toast.success("Payment method created successfully");
        refetchPaymentInfo();
      }
    } else {
      const payload = {
        storeId: storeId,
        keyId: methodId,
        active: status,
      };

      const response = await updatePaymentKeyStatus(payload);
      console.log("response", response);
      if (response?.success) {
        toast.success("Payment status updated successfully");
        refetchPaymentInfo();
      }
    }
  };

  const [method, setMethod] = useState(null);

  console.log("method", method);
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <HeadlessModalBox
        isOpen={isSetupOpen}
        setIsOpen={setIsSetupOpen}
        title={`Set up ${method?.name}`}
      >
        <div className="flex flex-col px-4 pb-4">
          <p className="text-sm">Please enter your {method?.name} API keys.</p>
          <div className="bg-gray-100 p-2 mt-2 rounded text-center">
            <p className="text-sm">
              Don't have a {method?.name} account?{" "}
              <a
                href="https://stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Create now
              </a>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <label className="flex flex-col gap-1 mb-2">
              <span className="text-sm">API Key</span>
              <input
                type="text"
                className="input-box"
                {...register("apiKey", { required: "API Key is required" })}
              />
              {errors.apiKey && (
                <span className="text-sm text-red-600">
                  {errors.apiKey.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-1 mb-4">
              <span className="text-sm">Secret Key</span>
              <input
                type="text"
                className="input-box"
                {...register("secretKey", {
                  required: "Secret Key is required",
                })}
              />
              {errors.secretKey && (
                <span className="text-sm text-red-600">
                  {errors.secretKey.message}
                </span>
              )}
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Set up
            </button>
          </form>
        </div>
      </HeadlessModalBox>
      <h1 className="text-2xl font-bold mb-2">Payment Providers</h1>
      <p className="text-gray-600 mb-6">
        Manage payment providers to accept payments from your customers.
      </p>
      <ul className="space-y-4">
        {Methods?.map((method) => (
          <li
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center">
              <Image
                src={method.logo}
                alt={`${method.name} logo`}
                className="w-16 h-10 mr-4 object-contain rounded-lg"
              />
              <span className="text-lg font-medium">{method.name}</span>
            </div>
            <div>
              {method.isSetup || method?.cod ? (
                <Switch
                  checked={method?.isActive}
                  onChange={() =>
                    handleUpdatePaymentStatus(
                      method.keyId,
                      !method.isActive,
                      method._id
                    )
                  }
                  className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-black/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black data-[checked]:bg-black"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                  />
                </Switch>
              ) : (
                <button
                  onClick={() => {
                    setMethod({
                      id: method?._id,
                      name: method.name,
                    });
                    setIsSetupOpen(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Set up
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentPage;
