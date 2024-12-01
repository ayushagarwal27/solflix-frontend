"use client";
import React from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const resourceKey = searchParams.get("key");
  return (
    <div className={"h-full w-full flex justify-center items-center bg-black"}>
      <div className={"h-[700px] w-[1000px] rounded-md overflow-hidden"}>
        <CldVideoPlayer
          width="1000"
          height="700"
          className={"z-[90]"}
          src={
            "http://res.cloudinary.com/dbbbydpi5/video/upload/v1732473598/" +
            resourceKey
          }
          colors={{
            accent: "#c0415a",
            base: "#7f1f97",
            text: "#ddddf1",
          }}
          fontFace="Source Serif Pro"
        />
      </div>
    </div>
  );
};
export default Page;
