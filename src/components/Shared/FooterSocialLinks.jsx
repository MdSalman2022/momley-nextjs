"use client";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const FooterSocialLinks = ({ socialLinks }) => {
  const {
    facebook = "",
    twitter = "",
    linkedin = "",
    youtube = "",
    instagram = "",
  } = socialLinks;
  return (
    <div className="mt-2">
      <p className="flex items-center gap-3 text-xl">
        {facebook && (
          <Link href={facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </Link>
        )}
        {twitter && (
          <Link href={twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </Link>
        )}
        {linkedin && (
          <Link href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </Link>
        )}
        {youtube && (
          <Link href={youtube} target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </Link>
        )}
        {instagram && (
          <Link href={instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </Link>
        )}
      </p>
    </div>
  );
};

export default FooterSocialLinks;
