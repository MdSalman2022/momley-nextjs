"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useCourier from "@/hooks/useCourier";
import { useQuery } from "react-query";
import { storeId } from "@/libs/utils/common";
import useStore from "@/hooks/useStore";
import toast from "react-hot-toast";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import CreateCourierModal from "./CreateCourierModal";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit, FaTrash } from "react-icons/fa";

const Shipping = () => {
  const { storeInfo, isStoreInfoLoading, refetchStoreInfo } =
    useContext(StateContext);
  const { UpdateStore } = useStore();
  const { getCouriers } = useCourier();

  const {
    data: couriers = [],
    isLoading: isLoadingCouriers,
    refetch: refetchCouriers,
  } = useQuery({
    queryKey: ["couriers", storeId],
    queryFn: () => storeId && getCouriers(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("couriers shipping", couriers);
  console.log("storeInfo shipping", storeInfo);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (storeInfo?.deliveryInfo) {
      reset({
        insideDhaka:
          storeInfo?.deliveryInfo?.deliveryCharge?.shipmentInsideDhaka,
        outsideDhaka:
          storeInfo?.deliveryInfo?.deliveryCharge?.shipmentOutsideDhaka,
        storePickup: storeInfo?.deliveryInfo?.deliveryCharge?.storePickup,
        deliveryTimeDhaka:
          storeInfo?.deliveryInfo?.deliveryTime?.shippingInsideDhaka,
        deliveryTimeOutsideDhaka:
          storeInfo?.deliveryInfo?.deliveryTime?.shippingOutsideDhaka,
      });
    }
  }, [storeInfo, reset]);

  const deliveryTimeOptions = [
    { value: "1-2 days", label: "1-2 days" },
    { value: "3-4 days", label: "3-4 days" },
    { value: "5-6 days", label: "5-6 days" },
    { value: "7-8 days", label: "7-8 days" },
    { value: "9-10 days", label: "9-10 days" },
  ];

  const onSubmit = async (data) => {
    console.log("payload data", data);
    const payload = {
      storeId: storeId,
      deliveryInfo: {
        deliveryCharge: {
          shipmentInsideDhaka: data.insideDhaka,
          shipmentOutsideDhaka: data.outsideDhaka,
          storePickup: data.storePickup,
        },
        deliveryTime: {
          shippingInsideDhaka: data.deliveryTimeDhaka,
          shippingOutsideDhaka: data.deliveryTimeOutsideDhaka,
        },
      },
    };

    const response = await UpdateStore(payload);
    console.log("response", response);
    if (response.success) {
      toast.success("Shipping information updated successfully");
      refetchCouriers();
      refetchStoreInfo();
    }
  };

  const handleErrorText = (error) => (
    <span className="text-red-500 text-xs">{error.message}</span>
  );

  const [isAddCourierModalOpen, setIsAddCourierModalOpen] = useState(false);

  if (isStoreInfoLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="">
      <CreateCourierModal
        isOpen={isAddCourierModalOpen}
        setIsOpen={setIsAddCourierModalOpen}
      />
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="m-0 text-xl font-bold">Couriers</h1>
        <button
          type="button"
          onClick={() => setIsAddCourierModalOpen(true)}
          className="primary-btn"
        >
          Add courier
        </button>
      </div>

      {/* Courier List Section */}

      <div className="border border-black/10 p-3 mb-5 rounded-lg shadow-sm">
        <h2 className="m-0 mb-4 text-lg font-semibold">Courier Services</h2>
        <div className="flex flex-col gap-2">
          {couriers?.map((courier, index) => (
            <div
              key={index}
              className="py-2 px-3 flex justify-between items-center bg-white rounded-lg border hover:shadow-md transition-shadow duration-200"
            >
              <span className="capitalize font-medium">{courier?.name}</span>
              <div className="flex items-center gap-5">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Charge Section */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-black/10 p-3 rounded-lg flex flex-col gap-5 relative">
          <button
            type="submit"
            className="primary-btn absolute right-5 bottom-5"
          >
            Save Changes
          </button>

          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Delivery charge</h2>
            <p className="text-gray-400 text-sm">
              Flexibility to set rates based on payment methods.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="mb-2">
              <label className="block mb-1">Inside Dhaka</label>
              <input
                type="text"
                className="input-box w-full"
                {...register("insideDhaka", {
                  required: "This field is required",
                })}
              />
              {errors.insideDhaka && handleErrorText(errors.insideDhaka)}
            </div>
            <div className="mb-2">
              <label className="block mb-1">Outside Dhaka</label>
              <input
                type="text"
                className="input-box w-full"
                {...register("outsideDhaka", {
                  required: "This field is required",
                })}
              />
              {errors.outsideDhaka && handleErrorText(errors.outsideDhaka)}
            </div>
            <div>
              <label className="block mb-1">Store Pickup</label>
              <input
                type="text"
                className="input-box w-full"
                {...register("storePickup", {
                  required: "This field is required",
                })}
              />
              {errors.storePickup && handleErrorText(errors.storePickup)}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Average delivery time</h2>
            <p className="text-gray-400 text-sm">
              Manage expectations with clear, consistent timelines. This is
              shown on checkout page.{" "}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="mb-2">
              <label className="block mb-1">Inside Dhaka</label>
              <Controller
                name="deliveryTimeDhaka"
                control={control}
                defaultValue={
                  storeInfo?.deliveryInfo?.deliveryTime?.shippingInsideDhaka
                }
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
                      <SelectValue placeholder="Select Average Delivery Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryTimeOptions.map((option, index) => (
                        <SelectItem key={index} value={option?.value}>
                          {option?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.deliveryTimeDhaka &&
                handleErrorText(errors.deliveryTimeDhaka)}
            </div>
            <div className="mb-2">
              <label className="block mb-1">Outside Dhaka</label>
              <Controller
                name="deliveryTimeOutsideDhaka"
                control={control}
                defaultValue={
                  storeInfo?.deliveryInfo?.deliveryTime?.shippingOutsideDhaka
                }
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
                      <SelectValue placeholder="Select Average Delivery Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryTimeOptions.map((option, index) => (
                        <SelectItem key={index} value={option?.value}>
                          {option?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.deliveryTimeOutsideDhaka &&
                handleErrorText(errors.deliveryTimeOutsideDhaka)}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
