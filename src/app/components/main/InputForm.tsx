"use client";

import React, { useRef, useState } from "react";
import Button from "../layout/Button";
import { useUploadImageStore } from "@/app/stores/images";
import Image from "next/image";
import {
  FaHashtag,
  FaImage,
  FaRedo,
  // FaTrash
} from "react-icons/fa";
import { useSettingStore } from "@/app/stores/settings";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { useTheme } from "next-themes";

function InputForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { imageState, setImage } = useUploadImageStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { languageState, quantityState } = useSettingStore();
  const router = useRouter();
  const {theme} = useTheme();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  // const handleDeleteImage = () => {
  //   setImage(null);
  // };

  const handleChangeImage = () => {
    setImage(null);
    setTimeout(() => {
      inputRef.current?.click(); // input을 강제로 클릭
    }, 0);
  };

  const handleImageSubmit = async () => {
    if (!imageState) {
      Swal.fire({
        title: "error!",
        text: "사진이 업로드되지 않았습니다!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", imageState);
    formData.append("language", languageState.join(","));
    formData.append("quantity", String(quantityState));

    setIsLoading(true);

    try {
      const res = await fetch("/api/hashtag", {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        router.push("/result");
      } else {
        Swal.fire({
          title: "Error!",
          text: "해시태그 생성에 실패했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "예상치 못한 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading && (
      <div className={`fixed flex-col gap-4 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 z-50 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
        <HashLoader 
        color={"#42A5F5"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"/>
        <div className="text-xl font-bold animate-pulse">생성 중입니다...</div>
      </div>
    )}
    <section className="flex flex-col gap-4">
      {imageState ? (
        <form>
          <div className="flex flex-col gap-2">
            <p className="text-sm">업로드한 사진 : {imageState.name}</p>
            <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(imageState)}
                alt="upload_image"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-row justify-end">
              {/* <button
                onClick={handleDeleteImage}
                className="cursor-pointer hover:scale-110 transition duration-100"
              >
                <FaTrash size={24} />
              </button> */}
              <button
                onClick={handleChangeImage}
                className="cursor-pointer hover:scale-120 transition-all duration-150 hover:text-blue-400"
              >
                <FaRedo size={24} />
              </button>
            </div>
            <div>
              <Button
                icon={<FaHashtag size={50} />}
                title={"생성"}
                type={"submit"}
                onClick={handleImageSubmit}
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <label htmlFor="image">
            <Button icon={<FaImage size={40} />} title={"업로드"} />
          </label>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        name="image"
        id="image"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div>
        <p className="text-sm font-bold">
          현재 설정 : {languageState.join(", ")}, {quantityState} 개
        </p>
      </div>
    </section>
    </>
  );
}

export default InputForm;
