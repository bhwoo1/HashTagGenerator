"use client";

import React, { useRef } from "react";
import Button from "../layout/Button";
import { useUploadImageStore } from "@/app/stores/images";
import Image from "next/image";
import { FaHashtag, FaImage, FaRedo, FaTrash } from "react-icons/fa";

function InputForm() {
  const { imageState, setImage } = useUploadImageStore();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleChangeImage = () => {
    setTimeout(() => {
      inputRef.current?.click(); // input을 강제로 클릭
    }, 0);
  };

  return (
    <section className="flex flex-col gap-4">
      {imageState ? (
        <form>
          <div className="flex flex-col gap-2">
            <p className="text-sm">업로드한 사진 : {imageState.name}</p>
            <Image
              src={URL.createObjectURL(imageState)}
              alt="upload_image"
              width={200}
              height={200}
            />
            <div className="flex flex-row justify-between">
              <button
                onClick={handleDeleteImage}
                className="cursor-pointer hover:scale-110 transition duration-100"
              >
                <FaTrash size={24} />
              </button>
              <button
                onClick={handleChangeImage}
                className="cursor-pointer hover:scale-110 transition duration-100"
              >
                <FaRedo size={24} />
              </button>
            </div>
            <Button icon={<FaHashtag size={50} />} title={"생성"} />
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <form>
            <label htmlFor="image">
              <Button icon={<FaImage size={40} />} title={"업로드"} />
            </label>
          </form>
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
        <p className="text-sm font-bold">현재 설정 : </p>
      </div>
    </section>
  );
}

export default InputForm;
