"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { FaImage } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

function Navigator() {
  const pathname = usePathname();
  console.log(pathname)
  const routes = useMemo(() => {
    return [
      {
        icon: <FaImage size={24} />,
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
    <div className={`w-full flex flex-row justify-between p-8`}>
      {routes.map((route) => {
        return (
          <Link key={route.label} href={route.href}>
            <div
              className={`transition-transform text-[20px] flex flex-row gap-4 hover:scale-110 items-center font-bold p-2 md:mx-96 ${
                route.isActive ? "text-black" : "text-neutral-400"
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
