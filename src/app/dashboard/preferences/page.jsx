"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useStore from "@/hooks/useStore";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import TagsInput from "@/libs/utils/tagsInput";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Preferences = () => {
  const { userInfo, isUserInfoLoading } = useContext(StateContext);
  const { UpdateStore } = useStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo?._id) {
      reset({
        storeName: userInfo.store?.storeName,
        homepageTitle: userInfo.store?.seoSettings.homepageTitle,
        homepageMetaDescription: userInfo.store?.seoSettings.metaDescription,
      });
      setTags(userInfo.store?.seoSettings.metaKeywords);
    }
  }, [userInfo, reset]);

  const [tags, setTags] = useState([]);

  const onSubmit = async (data) => {
    const payload = {
      storeId: userInfo?.storeId,
      storeName: data.storeName,
      seoSettings: {
        homepageTitle: data.homepageTitle,
        metaDescription: data.homepageMetaDescription,
        metaKeywords: tags,
      },
    };

    const response = await UpdateStore(payload);
    console.log("response", response);
    if (response.success) {
      toast.success("Store updated successfully");
    }
  };

  if (isUserInfoLoading) {
    return <LoadingAnimation />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex justify-between items-center gap-3">
        <p className="font-semibold">Preferences</p>
        <button type="submit" className="primary-btn">
          Save
        </button>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        <div className="border rounded p-6 grid grid-cols-2 gap-10 w-full">
          <div className="flex flex-col gap-3 ">
            <p className="font-semibold">Title and meta description</p>
            <span>
              The title and meta description help define how your store shows up
              on search engines
            </span>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="storeName" className="flex flex-col w-full">
              <span className="text-sm">Store name</span>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="input-box w-full"
                  placeholder="e.g. Daraz"
                  {...register("storeName", { required: true, maxLength: 70 })}
                />
                <span className="text-[#BDBDBD] text-sm">
                  {watch("storeName")?.length || 0} of 70 characters used
                </span>
                {errors.storeName && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </label>
            <label htmlFor="homepageTitle" className="flex flex-col w-full">
              <span className="text-sm">Homepage title</span>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="input-box w-full"
                  {...register("homepageTitle", {
                    required: false,
                    maxLength: 70,
                  })}
                  placeholder="e.g. Daraz - Online Shopping in Bangladesh"
                />
                <span className="text-[#BDBDBD] text-sm">
                  {watch("homepageTitle")?.length || 0} of 70 characters used
                </span>
                {errors.homepageTitle && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </label>
            <label htmlFor="homepageMetaDescription" className="flex flex-col">
              <span className="text-sm">Homepage meta description</span>
              <div className="w-full">
                <textarea
                  className="input-box h-[98px] w-full py-2"
                  placeholder="Enter a description to get a better ranking on search engines like Google"
                  {...register("homepageMetaDescription", {
                    required: false,
                    maxLength: 320,
                  })}
                ></textarea>
                <span className="text-[#BDBDBD] text-sm">
                  {watch("homepageMetaDescription")?.length || 0} of 320
                  characters used
                </span>
                {errors.homepageMetaDescription && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </label>
            <TagsInput tags={tags} setTags={setTags} />
          </div>
        </div>
        <div className="border rounded p-6 grid grid-cols-2 gap-10 w-full">
          <div className="flex flex-col gap-3 ">
            <p className="font-semibold">Google Analytics</p>
            <span>
              Google analytics enables you to track the visitors to your store,
              and generates reports that will help you with your marketing.
              Learn more about google analytics
            </span>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label
              htmlFor="googleAnalyticsAccount"
              className="flex flex-col w-full text-sm"
            >
              <span>Google analytics account. (how do i set this up?)</span>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="input-box w-full"
                  placeholder="Paste your code from Google here"
                  {...register("googleAnalyticsAccount", { required: false })}
                />
                {errors.googleAnalyticsAccount && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </label>
            <label htmlFor="enhancedEcommerce" className="flex flex-col">
              <span className="text-sm">Enhanced Ecommerce</span>
              <div className="w-full flex flex-col">
                <textarea
                  className="input-box h-[98px] w-full  py-2"
                  placeholder="You must upgrade to the latest version of Google analytics in order to use Enhanced Ecommerce"
                  {...register("enhancedEcommerce", {
                    required: false,
                    maxLength: 320,
                  })}
                ></textarea>
                <span className="text-[#BDBDBD] text-sm">
                  {watch("enhancedEcommerce")?.length || 0} of 320 characters
                  used
                </span>
                {errors.enhancedEcommerce && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </label>
          </div>
        </div>
        <div className="border rounded p-6 grid grid-cols-2 gap-10 w-full">
          <div className="flex flex-col gap-3 ">
            <p className="font-semibold">Facebook Pixel</p>
            <span>
              Google analytics enables you to track the visitors to your store,
              and generates reports that will help you with your marketing.
              Learn more about Facebook Pixes
            </span>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label
              htmlFor="facebookPixel"
              className="flex flex-col gap-2 w-full"
            >
              <span className="text-sm">
                Connect your pixel with the Facebook app. The app ensures proper
                setup, while enabling advanced tracking options and other
                features that help you target new and existing customers.
              </span>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="input-box w-full"
                  placeholder="Paste your code from Google here"
                  {...register("googleAnalyticsAccount", { required: false })}
                />
                {errors.googleAnalyticsAccount && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Preferences;
