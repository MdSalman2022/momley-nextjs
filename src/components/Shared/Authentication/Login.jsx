"use client";

import { AuthContext, useAuth } from "@/contexts/AuthProvider/AuthProvider";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useUser from "@/hooks/useUser";
import { storeId } from "@/libs/utils/common";
import { GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const { refetchUserInfo } = useContext(StateContext);
  const { CreateUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    signInWithEmailPassword,
    createUserWithEmailPassword,
    providerLogin,
    setIsAuthModalOpen,
    updateUser,
  } = useContext(AuthContext);

  const saveToDb = async (user) => {
    const idToken = await user.getIdToken();
    const payload = {
      idToken: idToken,
      email: user.email,
      firstName: user.displayName,
      role: "customer",
      storeId: storeId,
    };
    console.log("payload", payload);
    const createUserResult = await CreateUser(payload);
    if (createUserResult?.success) {
      refetchUserInfo();
    }
    console.log("createUserResult", createUserResult);
  };

  async function createUserWithEmailAndPassword(
    email,
    password,
    username,
    setIsAuthModalOpen
  ) {
    try {
      const result = await createUserWithEmailPassword(email, password);
      console.log("result", result);
      const user = result.user;
      const userInfo = { displayName: username };

      await updateUser(userInfo);
      try {
        await sendEmailVerification(user);
        toast.success("Verification email sent");
        setIsAuthModalOpen(false);
        await saveToDb(user);
      } catch (error) {
        console.log("Error sending verification email:", error);
      }
    } catch (error) {
      console.log(error);
    }
    toast.success("Account created successfully");
  }

  async function loginAndSaveData(email, password, saveDataToDatabase) {
    try {
      const result = await signInWithEmailPassword(email, password);
      console.log("result", result);
      const user = result.user;
      toast.success("Logged in successfully");

      // Assuming saveDataToDatabase is a function that takes user data and saves it
      await saveDataToDatabase(user);

      setIsAuthModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to log in");
    }
  }

  const handleSignUp = async (data) => {
    console.log("sign up data", data);
    const email = data.email;
    const password = data.password;
    const username = data.fname;

    if (isLogin) {
      try {
        signInWithEmailPassword(email, password)
          .then((result) => {
            console.log("result", result);
            const user = result.user;
            toast.success("Logged in successfully");

            setIsAuthModalOpen(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        toast.error("Failed to log in");
      }
    } else {
      try {
        const result = createUserWithEmailAndPassword(
          email,
          password,
          username,
          setIsAuthModalOpen
        );
        console.log("result", result);
      } catch (error) {
        toast.error("Failed to create account");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await providerLogin(googleProvider);
    const user = result.user;

    console.log(user, "useruseruseruser");
    console.log("user.metadata", user);

    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      setIsAuthModalOpen(false);
      toast.success("Account created successfully");

      const result = await saveToDb(user);
    } else {
      setIsAuthModalOpen(false);
      toast.success("Logged in successfully");
    }
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
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="mb-4">
            {!isLogin && (
              <input
                className="input-box h-12 w-full"
                placeholder="Full Name"
                name="fname"
                type="text"
                {...register("fname", { required: true })}
              />
            )}
            <input
              className="input-box h-12 w-full"
              placeholder="Email"
              name="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <p>Email is required</p>}
            <div className="relative w-full flex items-center">
              <input
                className="input-box h-12 w-full"
                placeholder="Password"
                name="password"
                type={passwordShow ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <span className="absolute top-5 right-3 text-xl text-black cursor-pointer">
                {passwordShow ? (
                  <FaEyeSlash onClick={() => setPasswordShow(false)} />
                ) : (
                  <FaEye onClick={() => setPasswordShow(true)} />
                )}
              </span>
            </div>
            {errors.password && <p>Password is required</p>}
          </div>
          <button
            type="submit"
            className="primary-btn w-full h-12 flex justify-center"
          >
            {isLogin ? `Sign In` : `Register`}
          </button>
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div
            onClick={handleGoogleLogin}
            className={`${"flex items-center justify-center cursor-pointer bg-[#F2F2F2] w-80 py-3 rounded-lg"} mb-4`}
            // style={{ border: "1px solid rgba(41, 41, 41, 0.20)" }}
          >
            <FcGoogle className={"text-blue-600 text-2xl mr-4"} />
            <span className={"font-semibold"}>Continue with Google</span>
          </div>
        </form>
      </div>

      <div className="flex items-start gap-2">
        <FaExclamationCircle className="text-xl mt-1" />
        <span className="text-sm">
          {" "}
          By continuing, you agree to Momley's <br />
          Conditions of Use and Privacy Policy
        </span>
      </div>
    </div>
  );
};

export default Login;
