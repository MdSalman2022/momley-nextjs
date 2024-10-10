"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FooterLinks = ({ items }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <Link
          href={!item?.slug ? item?.link : ""}
          onClick={() => router.push(item?.link)}
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
