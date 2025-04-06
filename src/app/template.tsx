"use client";


import { useEffect, useState } from "react";
import { animatePageIn } from "./utils/animation";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true); // 애니메이션 상태

  useEffect(() => {
    animatePageIn(() => setIsAnimating(false)); // 애니메이션 종료 후 상태 변경
  }, []);

  return (
    <div>
      {/* 배너 애니메이션 */}
      {isAnimating && (
        <>
          <div
            id="banner-1"
            className="min-h-screen bg-blue-500 z-50 fixed top-0 left-0 w-1/4"
          />
          <div
            id="banner-2"
            className="min-h-screen bg-blue-500 z-50 fixed top-0 left-1/4 w-1/4"
          />
          <div
            id="banner-3"
            className="min-h-screen bg-blue-500 z-50 fixed top-0 left-2/4 w-1/4"
          />
          <div
            id="banner-4"
            className="min-h-screen bg-blue-500 z-50 fixed top-0 left-3/4 w-1/4"
          />
        </>
      )}

      {/* 콘텐츠 */}
      <div className={`${isAnimating ? "opacity-0" : "opacity-100"} transition`}>
        {children}
      </div>
    </div>
  );
}