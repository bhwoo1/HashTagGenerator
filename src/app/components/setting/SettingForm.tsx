"use client";

import { useSettingStore } from "@/app/stores/settings";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Swal from 'sweetalert2'

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
          title: 'warning!',
          text: '적어도 한 개의 언어는 체크하셔야 합니다!',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
        return;
      }
  
      // 언어 제거
      setLanguage(languageState.filter((lang) => lang !== value));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);

    setQuantity(quantity)
  }

  return (
    <form className="text-sm md:text-lg font-bold">
      <section className="flex flex-row justify-between items-center px-8 py-8 md:px-12">
        <p>다크모드</p>
        <button className="md:mx-8 cursor-pointer" onClick={handleModeChange}>
          {theme === "dark" ? <FaMoon /> : <FaSun />}
        </button>
      </section>
      <section className="flex flex-row justify-between items-center px-8 py-8 md:px-12">
        <p>언어</p>
        <div className="flex flex-col gap-2 md:mx-4">
          <label className="flex flex-row gap-1">
            <input
              type="checkbox"
              value="한국어"
              checked={languageState.includes("한국어")}
              onChange={handleLanguageCheck}
            />
            <p className="text-sm">한국어</p>
          </label>
          <label className="flex flex-row gap-1">
            <input
              type="checkbox"
              value="영어"
              checked={languageState.includes("영어")}
              onChange={handleLanguageCheck}
            />{" "}
            <p className="text-sm">영어</p>
          </label>
        </div>
      </section>
      <section className="flex flex-row justify-between items-center px-8 py-8 md:px-12">
        <p>생성 갯수</p>
        <input
          type="number"
          min={1}
          max={20}
          defaultValue={quantityState}
          className="p-2"
          onChange={handleQuantityChange}
        />
      </section>
    </form>
  );
}

export default SettingForm;
