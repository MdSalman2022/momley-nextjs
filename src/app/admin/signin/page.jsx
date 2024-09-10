"use client";

import { AuthContext, useAuth } from "@/contexts/AuthProvider/AuthProvider";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useUser from "@/hooks/useUser";
import { storeId } from "@/libs/utils/common";
import { GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const AdminLogin = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const { refetchUserInfo } = useContext(StateContext);
  const { CreateUser } = useUser();
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
      role: "staff",
      storeId: storeId,
    };
    console.log("payload", payload);
    const createUserResult = await CreateUser(payload);
    console.log("createUserResult", createUserResult);

    router.push("/");
    if (createUserResult?.success) {
      refetchUserInfo();
    }
    console.log("createUserResult", createUserResult);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

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
            console.log("error", error?.message);
            if (error?.message === "Firebase: Error (auth/user-not-found).") {
              toast.error("User not found. Please try again.");
            } else if (
              error?.message === "Firebase: Error (auth/wrong-password)."
            ) {
              toast.error("Invalid email or password. Please try again.");
            } else if (
              error?.message === "Firebase: Error (auth/too-many-requests)."
            ) {
              toast.error("Too many requests. Please try again later.");
            } else if (
              error?.message === "Firebase: Error (auth/user-disabled)."
            ) {
              toast.error("User is disabled. Please contact support.");
            } else if (
              error?.message === "Firebase: Error (auth/invalid-email)."
            ) {
              toast.error("Invalid email. Please try again.");
            } else if (
              error?.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
              toast.error("Email already in use. Please try again.");
            } else {
              toast.error("Failed to log in");
            }
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
      console.log("resultresult", result);
    } else {
      setIsAuthModalOpen(false);
      router.push("/");
      toast.success("Logged in successfully");
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Sign In</h1>
        <div className="flex w-full items-center mb-6">
          <span
            onClick={() => setIsLogin(true)}
            className={`flex justify-center text-xl w-full p-3 cursor-pointer hover:bg-gray-200 hover:border-l-4 border-black ${
              isLogin
                ? "border-l-4 border-black bg-white"
                : "bg-gray-200 border-none"
            }`}
          >
            Sign In
          </span>
          <span
            onClick={() => setIsLogin(false)}
            className={`flex justify-center text-xl w-full p-3 cursor-pointer hover:bg-gray-200 hover:border-l-4 border-black ${
              !isLogin
                ? "border-l-4 border-black bg-white"
                : "bg-gray-200 border-none"
            }`}
          >
            Register
          </span>
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col gap-4"
        >
          {!isLogin && (
            <div className="mb-4">
              <input
                className="input-box h-12 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                name="fname"
                type="text"
                {...register("fname", { required: true })}
              />
              {errors.fname && (
                <p className="text-red-500 mt-1">Full Name is required</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <input
              className="input-box h-12 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              name="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">Email is required</p>
            )}
          </div>
          <div className="relative w-full flex items-center mb-4">
            <input
              className="input-box h-12 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {errors.password && (
              <p className="text-red-500 mt-1">Password is required</p>
            )}
          </div>
          <button
            type="submit"
            className="primary-btn w-full h-12 flex justify-center items-center bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
            className="flex items-center justify-center cursor-pointer bg-gray-200 w-full py-3 rounded-lg shadow-md hover:bg-gray-300"
          >
            <FcGoogle className="text-2xl mr-4" />
            <span className="font-semibold">Continue with Google</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
