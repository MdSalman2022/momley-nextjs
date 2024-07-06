"use client";

import { AuthContext, useAuth } from "@/contexts/AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const Login = () => {
  const { handleMobileLogin, handleVerifyOTP } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [otp, setOTP] = useState("");
  const [phone, setPhone] = useState("");
  const [otpDisplay, setOTPDisplay] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleMobileLoginSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "+" + 88 + phone;
    console.log(phoneNumber);
    setOTPDisplay(true);
    handleMobileLogin(phoneNumber);
  };

  const handleVerifyOTPSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "+" + 88 + phone;
    console.log(phoneNumber);
    const displayName = fname + " " + lname;
    console.log(displayName);

    !isLogin && handleVerifyOTP(otp, phoneNumber, displayName);
    isLogin && handleVerifyOTP(otp);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center  bg-[#ffffff] sm:max-w-2xl  rounded-lg border p-5">
      <img
        className=""
        src="https://i.ibb.co/TW8T2kc/logo-momley.png"
        width={180}
        height={56}
      />

      <div className="flex  ">
        <span
          onClick={() => setIsLogin(true)}
          className={`flex justify-center text-xl w-40 p-3 cursor-pointer hover:bg-[#f5f5f5] hover:border-l-8 border-black ${
            isLogin
              ? " border-l-8 border-black bg-[#ffffff]"
              : "bg-[#f5f5f5] border-none"
          }}`}
        >
          Sign In
        </span>
        <span
          onClick={() => setIsLogin(false)}
          className={`flex justify-center text-xl w-40 p-3 cursor-pointer hover:bg-[#f5f5f5] hover:border-l-8 border-black ${
            !isLogin
              ? "border-l-8 border-black bg-[#ffffff]"
              : "bg-[#f5f5f5] border-none"
          }}`}
        >
          Register
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full ">
        <form onSubmit={handleMobileLoginSubmit}>
          <div className="mb-4">
            {!isLogin && (
              <input
                className="input-box h-12 w-full border-[#f5f5f5] "
                placeholder="First Name"
                name="fname"
                type="text"
                onChange={(e) => setFname(e.target.value)}
              />
            )}
            {!isLogin && (
              <input
                className="input-box h-12 w-full  border-[#f5f5f5] "
                placeholder="Last Name"
                name="lname"
                type="text"
                onChange={(e) => setLname(e.target.value)}
              />
            )}
            <div id="recaptcha-container" className="mb-4"></div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="input-box h-12 w-full border-[#f5f5f5]"
              value={phone}
              placeholder="01314534677"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="primary-btn w-full h-12 flex justify-center"
          >
            Send OTP
          </button>
        </form>

        {otpDisplay && (
          <form onSubmit={handleVerifyOTPSubmit}>
            <div className="mt-8 mb-4">
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="input-box w-full"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="primary-btn w-full h-12 flex justify-center"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>

      {/* <button className="primary-btn w-full h-12 hidden">SEND CODE</button> */}
      {/* <button className="primary-btn w-full h-12">SIGN IN</button> */}
      <div className="flex items-start gap-2">
        <FaExclamationCircle className="text-xl mt-1" /> By continuing, you
        agree to Momley's <br />
        Conditions of Use and Privacy Policy
      </div>
    </div>
  );
};

export default Login;
