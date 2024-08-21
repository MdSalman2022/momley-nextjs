"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadCrumbComponent({ items }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      setIsHydrated(true);
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return null; // or a loading spinner, etc.
  }

  // Add "Home" to the beginning of the items array
  const breadcrumbItems = [...items, { name: "Home", slug: "/" }].reverse();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.name ? (
                <BreadcrumbLink>
                  <Link
                    href={
                      item?.name !== "Home" ? `/category/${item.slug}` : "/"
                    }
                  >
                    {item.name}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
