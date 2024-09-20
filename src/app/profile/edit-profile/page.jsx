"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useCustomer from "@/hooks/useCustomer";
import toast from "react-hot-toast";
import imageRename from "@/libs/utils/imageRename";
import { maxSize, supportedImageTypes } from "@/libs/utils/common";
import useFileUpload from "@/hooks/UploadFiles/useFileUploadHooks";
import useMoveAssetsUsersHooks from "@/hooks/UploadFiles/useMoveAssetsUsersHooks";
import GeneratedProfileImage from "@/components/Shared/GeneratedProfileImage";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";
import LocationSelection from "./LocationSelection";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const { userInfo, isUserInfoLoading } = useContext(StateContext);

  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [prevImage, setPrevImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [previewImageName, setPreviewImageName] = useState("");
  const [previewImage, setPreviewImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { UpdateCustomer } = useCustomer();
  const personalInfo = [
    {
      name: "fname",
      label: "First Name",
      placeholder: "Enter your first name",
      type: "text",
      required: true,
    },
    {
      name: "lname",
      label: "Last Name",
      placeholder: "Enter your last name",
      type: "text",
      required: false,
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
      options: ["male", "female"],
    },
  ];

  function handleFileSelect(event) {
    setIsUploading(true);
    let files = Array.from(event.target.files);
    console.log("files", files);
    files = imageRename(files);
    console.log("sanitizedFiles", files);
    const previewImageArray = [];
    const largeFiles = [];
    let lastapproved = null;

    const maxSizeInBytes = maxSize;

    files.forEach((file) => {
      if (!supportedImageTypes.includes(files[0].type)) {
        toast.error(
          "Unsupported image type. Please upload a supported image (JPEG, PNG, GIF, WebP, svg, bmp,,tiff, ico, jp2)."
        );
        return;
      }

      if (file.size < maxSizeInBytes) {
        lastapproved = file;

        setPrevImage(URL.createObjectURL(file));
        previewImageArray.push(URL.createObjectURL(file));
      } else if (file.size > maxSizeInBytes) {
        largeFiles.push(file);
        toast.error(
          "File size too large. Please upload an image smaller than 4MB."
        );
      }
    });

    console.log("lastapproved", lastapproved, files[0]);
    setIsUploading(true); // Set uploading status to true

    setPreviewImage(previewImageArray);
    console.log("previewImageArray", previewImageArray);

    setSelectedFile([largeFiles?.includes(lastapproved) ? null : lastapproved]);
  }

  useFileUpload(
    selectedFile,
    setImageUploadProgress,
    setPreviewImageName,
    setImageList,
    setIsUploading
  );

  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    setSelectedGender(userInfo?.customer?.gender);
  }, [userInfo]);

  const handleValueChange = (value) => {
    setSelectedGender(value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      birthday: "",
      gender: "",
      division: "",
      city: "",
      area: "",
      address: "",
    },
  });

  useEffect(() => {
    if (userInfo?._id) {
      reset({
        fname: userInfo?.customer?.firstName,
        lname: userInfo?.customer?.lastName,
        phone: userInfo?.customer?.phoneNumber,
        gender: userInfo?.customer?.gender || "",
        email: userInfo?.email || "",
        division: userInfo?.customer?.shippingAddress[0]?.state || "",
        city: userInfo?.customer?.shippingAddress[0]?.city || "",
        area: userInfo?.customer?.shippingAddress[0]?.street || "",
        address: userInfo?.customer?.shippingAddress[0]?.street || "",
      });
    }
  }, [userInfo, reset]);

  console.log("errors", errors);

  const onSubmit = async (data) => {
    console.log("formdata", data, selectedGender);

    const destPathText = `${userInfo?.customerId}`;

    useMoveAssetsUsersHooks([imageList[imageList?.length - 1]], destPathText);

    const payload = {
      profilePicture: imageList[imageList?.length - 1]?.split("/")[2],
      id: userInfo.customer?._id,
      firstName: data.fname,
      lastName: data.lname,
      phoneNumber: data.phone,
      email: data.email,
      birthday: data.birthday,
      gender: selectedGender,
      shippingAddress: {
        division: data.division,
        city: data.city,
        area: data.area,
        address: data.address,
      },
    };
    console.log("payload", payload);

    const response = await UpdateCustomer(payload);
    console.log("response", response);
    if (response?.success) {
      toast.success("Profile updated successfully");
    }
  };

  console.log("selectedGender", selectedGender);

  if (isUserInfoLoading) {
    return <LoadingAnimation />;
  }

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
          {userInfo?.customer?.profilePicture ? (
            <Image
              className="rounded-full border"
              src={userInfo?.cloudFrontURL?.replace(
                "*",
                `${userInfo?.customerId}/${userInfo?.customer?.profilePicture}`
              )}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <GeneratedProfileImage
              name={
                userInfo?.customer?.firstName || user?.displayName || "user"
              }
              size={100}
            />
          )}

          {prevImage && (
            <Image
              src={prevImage}
              alt="profile"
              className="rounded-full border-2 border-blue-600"
              width={100}
              height={100}
            />
          )}
          <div className="flex flex-col gap-2 relative">
            <p>Profile Photo</p>
            <div className="primary-btn bg-[#828282]">
              <input
                onChange={handleFileSelect}
                accept="image/*"
                type="file"
                name="image"
                className="opacity-0 w-full h-32 absolute cursor-pointer"
                placeholder="Enter number of designers"
              />
              Choose a file
            </div>
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
                  <Select
                    onValueChange={handleValueChange}
                    className="capitalize"
                  >
                    <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F2F2] border-[#E0E0E0] capitalize">
                      <SelectValue
                        placeholder={options[0]}
                        className="capitalize"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem value={option} className="capitalize">
                          {option}
                        </SelectItem>
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
      <div className="flex flex-col gap-5">
        <p className="font-semibold">Additional Info</p>
        <LocationSelection
          register={register}
          setValue={setValue}
          userInfo={userInfo}
        />
      </div>
    </form>
  );
};

export default EditProfile;
