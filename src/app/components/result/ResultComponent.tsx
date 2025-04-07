"use client";

import { useUploadImageStore } from "@/app/stores/images";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const fetchHashTags = async () => {
  const res = await fetch("/api/hashtag", {
    method: "GET",
  });

  const data = await res.json();
  return data;
};

const useHashTags = () => {
  return useQuery({
    queryKey: ["hashtags"],
    queryFn: fetchHashTags,
  });
};

function ResultComponent() {
  const { imageState, setImage } = useUploadImageStore();
  const router = useRouter();

  const { data, isLoading, isError } = useHashTags();

  useEffect(() => {
    if (!imageState) {
      router.push("/");
    }
  }, [imageState, router]);

  if (!imageState) {
    return null;
  }

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const handleReset = () => {
    setImage(null);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      Swal.fire({
        title: "success!",
        text: "클립보드에 복사되었습니다!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "error!",
        text: "복사에 실패하였습니다.",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <Image
            src={URL.createObjectURL(imageState)}
            alt="upload_image"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="w-[250px] h-[270px] md:w-[400px] md:h-[200px] border-1 rounded-2xl p-4 relative">
        <p className="text-sm">{imageState.name}으로 생성한 #해시태그: </p>
        <textarea
          value={data?.hashtags}
          readOnly
          className="w-[220px] md:w-[360px] h-[120px] resize-none rounded-lg  text-sm"
        />
        <div className="absolute bottom-4 right-4 flex flex-row gap-12 text-sm">
          <button className="cursor-pointer" onClick={handleReset}>
            다시하기
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleCopy(data?.hashtags)}
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultComponent;
