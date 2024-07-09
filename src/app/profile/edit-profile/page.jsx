"use client";
import React, { useState } from "react";
import profile from "../../../../public/images/profile/profile.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditProfile = () => {
  const personalInfo = [
    {
      name: "fname",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "number",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      type: "email",
    },
    {
      name: "birthday",
      label: "Birthday",
      placeholder: "DD/MM/YYYY",
      type: "text",
    },
    {
      name: "gender",
      label: "Gender",
      type: "text",
      required: true,
      options: ["Men", "Women"],
    },
  ];

  const additionalInfo = [
    {
      name: "region",
      label: "Region",
      placeholder: "Enter your region",
      type: "text",
      required: true,
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      type: "text",
      required: true,
    },
    {
      name: "area",
      label: "Area",
      placeholder: "Enter your area",
      type: "text",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      placeholder: "Enter your address",
      type: "text",
      required: true,
    },
  ];

  const [selectedGender, setSelectedGender] = useState("");
 
  const handleValueChange = (value) => {
    setSelectedGender(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("errors", errors);

  const onSubmit = async (data) => {
    console.log("formdata", data, selectedGender);
    // try {
    //   const response = await fetch("YOUR_BACKEND_ENDPOINT", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) throw new Error("Network response was not ok");
    //   console.log("Form submitted successfully:", data);
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold">Personal Info</p>
        <button type="submit" className="primary-btn">
          Save and Changes
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex items-end gap-3">
          <Image
            src={profile}
            alt="profile"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <p>Profile Photo</p>
            <div className="primary-btn bg-[#828282]">Choose a file</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-y-5 gap-x-10">
          {personalInfo.map(
            ({ label, type, name, required, options, placeholder }) => (
              <label htmlFor="" className="flex flex-col">
                <p>
                  {label}
                  {required && "*"}
                </p>
                {name === "gender" ? (
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F2F2] border-[#E0E0E0]">
                      <SelectValue placeholder={options[0]} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <input
                    type={type}
                    {...register(name, {
                      required: {
                        value: required,
                        message: `${label} is required`,
                      },
                      ...(name === "birthday" && {
                        pattern: {
                          value:
                            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
                          message: "Birthday must be in the format DD/MM/YYYY",
                        },
                      }),
                    })}
                    placeholder={placeholder}
                    className="input-box w-full bg-[#F2F2F2] border-[#E0E0E0]"
                  />
                )}{" "}
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1 w-80">
                    {errors[name].message}
                  </p>
                )}
              </label>
            )
          )}
        </div>
      </div>
      <div className="flex justify-start w-full">
        <p className="font-semibold">Additional Info</p>
      </div>
      <div className="grid grid-cols-3 gap-y-5 gap-x-10">
        {additionalInfo.map(({ label, type, name, required, placeholder }) => (
          <label htmlFor={name}>
            <p>
              {label} {required && "*"}
            </p>
            <input
              type={type}
              {...register(name, {
                required: {
                  value: required,
                  message: `${label} is required`,
                },
              })}
              placeholder={placeholder}
              className="input-box w-full bg-[#F2F2F2] border-[#E0E0E0]"
            />
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1 w-80">
                {errors[name].message}
              </p>
            )}
          </label>
        ))}
      </div>
    </form>
  );
};

export default EditProfile;
