"use client";

import { useSettingStore } from "@/app/stores/settings";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Swal from "sweetalert2";

function SettingForm() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { languageState, quantityState, setLanguage, setQuantity } =
    useSettingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleModeChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleLanguageCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked) {
      // 언어 추가
      setLanguage([...languageState, value]);
    } else {
      // 마지막 하나일 경우 해제 막기
      if (languageState.length === 1) {
        Swal.fire({
          title: "warning!",
          text: "적어도 한 개의 언어는 체크하셔야 합니다!",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      // 언어 제거
      setLanguage(languageState.filter((lang) => lang !== value));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);

    setQuantity(quantity);
  };

  return (
    <form className="text-sm md:text-base font-semibold space-y-6">
      {/* 다크모드 설정 */}
      <section className="flex justify-between items-center border-2 rounded-xl px-6 py-4 md:px-12 md:py-6">
        <label className="text-base md:text-lg">다크모드</label>
        <button
          type="button"
          className="text-xl md:text-2xl transition-transform duration-200 hover:scale-110"
          onClick={handleModeChange}
        >
          {theme === "dark" ? <FaMoon /> : <FaSun />}
        </button>
      </section>

      {/* 언어 설정 */}
      <section className="flex justify-between items-center border-2 rounded-xl px-6 py-4 md:px-12 md:py-6">
        <label className="text-base md:text-lg">언어</label>
        <div className="flex flex-col gap-2 text-sm md:text-base">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="한국어"
              checked={languageState.includes("한국어")}
              onChange={handleLanguageCheck}
            />
            <span>한국어</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="영어"
              checked={languageState.includes("영어")}
              onChange={handleLanguageCheck}
            />
            <span>영어</span>
          </label>
        </div>
      </section>

      {/* 해시태그 생성 갯수 */}
      <section className="flex justify-between items-center border-2 rounded-xl px-6 py-4 md:px-12 md:py-6">
        <label htmlFor="quantity" className="text-base md:text-lg">
          생성 갯수
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={20}
          defaultValue={quantityState}
          onChange={handleQuantityChange}
          className="w-20 px-2 py-1 border rounded-md text-center"
        />
      </section>
    </form>
  );
}

export default SettingForm;
