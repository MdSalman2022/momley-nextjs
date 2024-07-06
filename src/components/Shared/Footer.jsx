"use client";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-20 border-t flex flex-col items-center w-full bg-[#111111] text-white">
      <div className="flex items-start justify-between w-full container mx-auto">
        <img
          src="https://i.ibb.co/s5VRytN/momley.png"
          alt="momley"
          width={250}
          height={120}
        />
        <div>
          <p className="font-semibold">Useful Links</p>
          <p>Contact Us</p>
          <p>Blog</p>
          <p>Cart</p>
          <p>FAQ</p>
          <p>Conditions</p>
        </div>
        <div>
          <p className="font-semibold">Popular</p>
          <p>Favorites</p>
          <p>General & Academy</p>
          <p>Pre-Order</p>
          <p>Package</p>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <p>Head Office</p>
          <p>Mirpur,Dhaka-1216</p>
          <p>Phone:</p>
          <p>017********</p>
          <p>test@test.com</p>
          <p className="flex items-center gap-3 text-xl">
            <FaFacebookF /> <FaTwitter /> <FaLinkedinIn /> <FaYoutube />{" "}
            <FaInstagram />
          </p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col items-start container mx-auto">
        <div className="grid grid-cols-4">
          <p>Mom & Baby: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
        <div className="grid grid-cols-4">
          <p>Bath & Shower: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
        <div className="grid grid-cols-4">
          <p>Fragrance: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
        <div className="grid grid-cols-4">
          <p>Healthy: </p>
          <span className="col-span-3 text-gray-400">
            Lorem | ipsum | dolor | sit | amet | consectetur | adipisicing |
            elit | Molestias | quidem
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
