import CryptoJS from "crypto-js";

export const setCookie = (key, value, days) => {
  const secretKey = process.env.SECRET_KEY;
  const originalValue = JSON.stringify(value);
  const encryptedValue = CryptoJS.AES.encrypt(
    originalValue,
    secretKey
  ).toString();

  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  // Determine if the environment is localhost
  const isLocalhost = window.location.hostname === "localhost";

  // Build the cookie string
  let cookieString = `${key}=${encryptedValue}; expires=${expires}; path=/;`;
  if (!isLocalhost) {
    cookieString += " Secure; SameSite=Strict;";
  } else {
    cookieString += " SameSite=Strict;";
  }

  // Set the cookie
  document.cookie = cookieString;
};

// Get and decrypt a cookie
export const getCookie = (key) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  if (parts.length === 2) {
    const encryptedValue = parts.pop().split(";").shift();
    const secretKey = process.env.SECRET_KEY; // Use the same key for decryption
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return null;
};

export const clearCart = () => {
  document.cookie = "userCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  console.log("Cart has been cleared.");
};
