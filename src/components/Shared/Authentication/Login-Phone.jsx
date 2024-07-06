import { RecaptchaVerifier } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "@/config/firebase";
import { sendToServer } from "./LoginPostDB";

// Function to confirm OTP entered by the user
async function confirmOTP(otp, phoneNumber, displayName) {
  try {
    const confirmationResult = window.confirmationResult;
    const result = await confirmationResult.confirm(otp);
    console.log("Success");

    const user = result.user;
    console.log(user);
    console.log(displayName);
    const fname = displayName?.split(" ")[0];
    const lname = displayName?.split(" ")[1];
    const postData = {
      userId: user.uid,
      fname,
      lname,
      phone: phoneNumber,
    };

    console.log(postData);

    if (fname && lname && phoneNumber) {
      sendToServer(postData);
    }
    toast.success("Logged in successfully!");

    return { message: true, UID: user.uid };
  } catch (error) {
    console.log(error);
    return { message: false };
  }
}

// Function to verify reCAPTCHA. It's necessary for Google phone auth
function reVerify() {
  if (!window.recaptchaVerifier) {
    console.log("reverify");
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response);
        },
      },
      auth
    );
  }
}

export { reVerify, confirmOTP };
