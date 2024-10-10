"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";

const FooterLinks = ({ items }) => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, logOut } =
    useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <Link
          href={!item?.slug ? item?.link : ""}
          onClick={() =>
            item?.slug && !user?.uid & setIsAuthModalOpen(!isAuthModalOpen)
          }
          key={index}
          className="cursor-pointer"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default FooterLinks;
