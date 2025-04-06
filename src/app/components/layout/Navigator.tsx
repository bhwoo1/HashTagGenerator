"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { FaHashtag } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

function Navigator() {
  const pathname = usePathname();
  const routes = useMemo(() => {
    return [
      {
        icon: <FaHashtag size={24} />,
        label: "생성",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <IoIosSettings size={24} />,
        label: "설정",
        isActive: pathname === "/setting",
        href: "/setting",
      },
    ];
  }, [pathname]);

  return (
    <div className={`w-full flex flex-row justify-between md:justify-center md:gap-96 p-8`}>
      {routes.map((route) => {
        return (
          <Link key={route.label} href={route.href}>
            <div
              className={`transition-transform text-[20px] flex flex-row gap-2 hover:scale-110 items-center font-bold p-2 ${
                route.isActive ? "text-black" : "text-neutral-600"
              }`}
            >
              {route.icon}
              <span>{route.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Navigator;
