"use client";

import React, { useRef, useState } from "react";
import Button from "../layout/Button";
import { useUploadImageStore } from "@/app/stores/images";
import Image from "next/image";
import { FaHashtag, FaImage, FaRedo } from "react-icons/fa";
import { useSettingStore } from "@/app/stores/settings";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { useTheme } from "next-themes";
import imageCompression from "browser-image-compression";

function InputForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { imageState, setImage } = useUploadImageStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { languageState, quantityState } = useSettingStore();
  const router = useRouter();
  const { theme } = useTheme();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChangeImage = () => {
    setImage(null);
    setTimeout(() => {
      inputRef.current?.click(); // input을 강제로 클릭
    }, 0);
  };

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1, // 최대 크기 (MB)
      maxWidthOrHeight: 1024, // 최대 너비 or 높이 (px)
      useWebWorker: true,
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("이미지 압축 실패:", error);
      return file; // 압축 실패 시 원본 파일 반환
    }
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

    const compressedImage = await compressImage(imageState);

    const formData = new FormData();
    formData.append("image", compressedImage);
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
        <div
          className={`fixed flex-col gap-4 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 z-50 ${
            theme === "dark" ? "bg-neutral-800" : "bg-white"
          }`}
        >
          <HashLoader
            color={"#42A5F5"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="text-xl font-bold animate-pulse">
            생성 중입니다...
          </div>
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
              <div
                className="flex flex-row gap-1 justify-end items-center cursor-pointer transition-all duration-150 hover:text-blue-400 font-bold"
                onClick={handleChangeImage}
              >
                <button>
                  <FaRedo size={13} />
                </button>
                <p>재업로드</p>
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
