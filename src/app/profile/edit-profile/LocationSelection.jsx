"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUser from "@/hooks/useUser";
import { useQuery } from "react-query";
import { storeId } from "@/libs/utils/common";
import useLocationData from "@/hooks/useLocationData";

const LocationSelection = ({ register, setValue, userInfo }) => {
  console.log("userInfo", userInfo);

  const {
    allCity,
    allArea,
    completeAddress,
    allDivisions,
    shippingAddress,
    isDivisionLoading,
    handleDivisionSelect,
    handleCitySelect,
    handleAreaSelect,
    selectedDivision,
    selectedCity,
    selectedArea,
  } = useLocationData(userInfo, setValue);

  console.log("completeAddress area", completeAddress, completeAddress?.area);

  if (isDivisionLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-y-5 gap-x-10 w-full">
      <label htmlFor="state">
        <p>State</p>
        <Select
          onValueChange={handleDivisionSelect}
          value={completeAddress?.division}
          className="capitalize"
        >
          <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F2F2] border-[#E0E0E0] capitalize">
            <SelectValue
              placeholder={
                selectedDivision || shippingAddress?.division || "Select State"
              }
              className="capitalize"
            />
          </SelectTrigger>
          <SelectContent>
            {allDivisions?.length > 0 &&
              allDivisions.map((option) => (
                <SelectItem
                  key={option?._id}
                  value={option?.id}
                  className="capitalize"
                >
                  {option?.displayName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </label>
      <label htmlFor="city">
        <p>City</p>
        <Select
          onValueChange={handleCitySelect}
          value={completeAddress?.city}
          className="capitalize"
        >
          <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F2F2] border-[#E0E0E0] capitalize">
            <SelectValue
              placeholder={
                selectedCity || shippingAddress?.city || "Select City"
              }
              className="capitalize"
            />
          </SelectTrigger>
          <SelectContent>
            {allCity?.map((option) => (
              <SelectItem
                key={option?._id}
                value={option?.id}
                className="capitalize"
              >
                {option?.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label htmlFor="area">
        <p>Area</p>
        <Select
          onValueChange={handleAreaSelect}
          value={completeAddress?.area}
          className="capitalize"
        >
          <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F2F2] border-[#E0E0E0] capitalize">
            <SelectValue
              placeholder={
                selectedArea || shippingAddress?.area || "Select Area"
              }
              className="capitalize"
            />
          </SelectTrigger>
          <SelectContent>
            {allArea?.map((option) => (
              <SelectItem
                key={option?._id}
                value={option?.id}
                className="capitalize"
              >
                {option?.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label htmlFor="address">
        <p>Address</p>
        <input
          type="text"
          {...register("address")}
          placeholder="Enter your address"
          className="input-box w-full bg-[#F2F2F2] border-[#E0E0E0]"
        />
      </label>
    </div>
  );
};

export default LocationSelection;
