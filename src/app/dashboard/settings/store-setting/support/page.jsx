"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useStore from "@/hooks/useStore";
import { storeId } from "@/libs/utils/common";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SupportPage = () => {
  const { storeInfo, refetchStoreInfo } = useContext(StateContext);
  const { UpdateStore } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (storeInfo?._id) {
      reset({
        email: storeInfo?.supportInfo?.email,
        mobile: storeInfo?.supportInfo?.phone,
        headOffice: storeInfo?.supportInfo?.officeAddress,
        facebook: storeInfo?.supportInfo?.socialMediaLinks?.facebook,
        instagram: storeInfo?.supportInfo?.socialMediaLinks?.instagram,
        twitter: storeInfo?.supportInfo?.socialMediaLinks?.twitter,
        linkedin: storeInfo?.supportInfo?.socialMediaLinks?.linkedin,
        youtube: storeInfo?.supportInfo?.socialMediaLinks?.youtube,
        pinterest: storeInfo?.supportInfo?.socialMediaLinks?.pinterest,
      });
    }
  }, [storeInfo, reset]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Add your save logic here
    const payload = {
      storeId: storeId,
      supportInfo: {
        email: data.email,
        phone: data.mobile,
        officeAddress: data.headOffice,
        socialMediaLinks: {
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          linkedin: data.linkedin,
          youtube: data.youtube,
          pinterest: data.pinterest,
        },
      },
    };

    console.log("payload", payload);

    const response = await UpdateStore(payload);
    console.log("response", response);
    if (response.success) {
      toast.success("Store updated successfully");
      refetchStoreInfo();
    }
  };

  console.log("storeInfo", storeInfo);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between mb-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Customer Support</h1>
            <p className="text-sm text-gray-600">
              Stay connected and responsive to your customers’ needs.
            </p>
          </div>
          <button type="submit" className="primary-btn">
            Save
          </button>
        </div>
        <div className="mb-8 flex flex-col gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input-box w-full"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              {...register("mobile", { required: "Mobile number is required" })}
              className="input-box w-full"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Head Office
            </label>
            <input
              type="text"
              {...register("headOffice", {
                required: "Head office is required",
              })}
              className="input-box w-full"
              placeholder="Enter your head office"
            />
            {errors.headOffice && (
              <p className="text-red-500 text-sm">
                {errors.headOffice.message}
              </p>
            )}
          </div>
        </div>
        <div className="border p-4 rounded bg-white">
          <h2 className="text-xl font-semibold">Social Profiles</h2>
          <p className="text-sm text-gray-600 mb-4">
            Connect with customers and grow your online presence.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Facebook URL
              </label>
              <input
                type="url"
                {...register("facebook")}
                className="input-box w-full"
                placeholder="Enter your Facebook URL"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Instagram URL
              </label>
              <input
                type="url"
                {...register("instagram")}
                className="input-box w-full"
                placeholder="Enter your Instagram URL"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Twitter URL
              </label>
              <input
                type="url"
                {...register("twitter")}
                className="input-box w-full"
                placeholder="Enter your Twitter URL"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                LinkedIn URL
              </label>
              <input
                type="url"
                {...register("linkedin")}
                className="input-box w-full"
                placeholder="Enter your LinkedIn URL"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                YouTube URL
              </label>
              <input
                type="url"
                {...register("youtube")}
                className="input-box w-full"
                placeholder="Enter your YouTube URL"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Pinterest URL
              </label>
              <input
                type="url"
                {...register("pinterest")}
                className="input-box w-full"
                placeholder="Enter your Pinterest URL"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SupportPage;
