import ModalBox from "@/components/Shared/ModalBox";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCourier from "@/hooks/useCourier";
import { storeId } from "@/libs/utils/common";
import toast from "react-hot-toast";

const CreateCourierModal = ({ isOpen, setIsOpen }) => {
  const { createCourier } = useCourier();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("payload", data);
    // Handle form submission logic here
    const payload = {
      name: data.courierName,
      courierProvider: courierOptions.find(
        (option) => option.value === data.courierName
      ).ref,
      apiKey: data.apiKey,
      secret: data.secretKey,
      chargeInDhaka: data.chargeInsideDhaka,
      chargeOutsideDhaka: data.chargeOutsideDhaka,
      storeId: storeId,
    };

    const response = await createCourier(payload);

    console.log("response", response);

    if (response) {
      toast.success("Courier added successfully");
    }
  };

  const courierOptions = [
    { value: "steadfast", label: "Steadfast", ref: "66f3c94efbab98330aad9f48" },
    { value: "pathao", label: "Pathao", ref: "66f3c986fbab98330aad9f49" },
    { value: "redx", label: "RedX", ref: "66f3c997fbab98330aad9f4a" },
  ];

  return (
    <div>
      <ModalBox isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
        <div className="flex flex-col gap-1 px-6 py-6 bg-white rounded-xl w-96">
          <div className="font-semibold">Add Courier</div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col gap-2">
              <div>
                <label className="block mb-1 text-sm">Courier Name</label>
                <Controller
                  name="courierName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Courier name is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
                        <SelectValue placeholder="Select Courier" />
                      </SelectTrigger>
                      <SelectContent>
                        {courierOptions.map((option, index) => (
                          <SelectItem key={index} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.courierName && (
                  <span className="text-red-500 text-xs">
                    {errors.courierName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm">
                  Charge Inside Dhaka
                </label>
                <input
                  type="text"
                  className="input-box w-full"
                  {...register("chargeInsideDhaka", {
                    required: "Charge inside Dhaka is required",
                  })}
                />
                {errors.chargeInsideDhaka && (
                  <span className="text-red-500 text-xs">
                    {errors.chargeInsideDhaka.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm">
                  Charge Outside Dhaka
                </label>
                <input
                  type="text"
                  className="input-box w-full"
                  {...register("chargeOutsideDhaka", {
                    required: "Charge outside Dhaka is required",
                  })}
                />
                {errors.chargeOutsideDhaka && (
                  <span className="text-red-500 text-xs">
                    {errors.chargeOutsideDhaka.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm">API Key</label>
                <input
                  type="text"
                  className="input-box w-full"
                  {...register("apiKey", { required: "API key is required" })}
                />
                {errors.apiKey && (
                  <span className="text-red-500 text-xs">
                    {errors.apiKey.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm">Secret Key</label>
                <input
                  type="text"
                  className="input-box w-full"
                  {...register("secretKey", {
                    required: "Secret key is required",
                  })}
                />
                {errors.secretKey && (
                  <span className="text-red-500 text-xs">
                    {errors.secretKey.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="primary-btn mt-5 flex justify-center"
            >
              Submit
            </button>
          </form>
        </div>
      </ModalBox>
    </div>
  );
};

export default CreateCourierModal;
