import ModalBox from "@/components/Shared/ModalBox";
import React, { useContext } from "react";
import LocationSelection from "../profile/edit-profile/LocationSelection";
import { useForm } from "react-hook-form";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import { setCookie } from "@/libs/utils/cookieUtils";

const AddDeliveryAddressModal = ({ isOpen, setIsOpen }) => {
  const { userInfo } = useContext(StateContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fname: "",
      phone: "",
      division: "",
      city: "",
      area: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("formdata", data);

    // Store form data in cookies
    setCookie("deliveryAddress", data, 7); // Store for 7 days

    // Log a success message or show a toast if needed
    console.log("Form data saved in cookies:", data);
    setIsOpen(false);
  };

  return (
    <div>
      <ModalBox isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
        <div className="bg-white flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-lg font-semibold">Add Delivery Address</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 flex flex-col gap-5"
          >
            <label htmlFor="fname" className="w-full col-span-3">
              <p>Name</p>
              <input
                type="text"
                {...register("fname")}
                placeholder="Enter Your Name"
                className="input-box w-full bg-[#F2F2F2] border-[#E0E0E0]"
              />
            </label>
            <label htmlFor="phone" className="w-full col-span-3">
              <p>Phone</p>
              <input
                type="text"
                {...register("phone")}
                placeholder="Enter Your Phone"
                className="input-box w-full bg-[#F2F2F2] border-[#E0E0E0]"
              />
            </label>
            <LocationSelection
              register={register}
              setValue={setValue}
              userInfo={userInfo}
            />
            <button
              type="submit"
              className="primary-btn w-full flex justify-center"
            >
              Save
            </button>
          </form>
        </div>
      </ModalBox>
    </div>
  );
};

export default AddDeliveryAddressModal;
