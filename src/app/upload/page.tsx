"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import CreateResource from "@/components/CreateResource";
import { useWallet } from "@solana/wallet-adapter-react";

const CreatePage = () => {
  const [resourceKey, setResourceKey] = useState<string | null>(null);
  const wallet = useWallet();

  return (
    <div className={"h-full w-full bg-black flex justify-center items-center"}>
      {resourceKey ? (
        <CreateResource resourceKey={resourceKey} />
      ) : (
        <CldUploadWidget
          // uploadPreset="solflix"
          onSuccess={(res) => {
            //   @ts-ignore
            setResourceKey(res?.info?.url?.split("/")?.pop());
          }}
          options={{ clientAllowedFormats: ["video"], multiple: false }}
          signatureEndpoint={"/api/upload"}
        >
          {({ open }) => {
            return (
              <button
                onClick={() => open()}
                className={
                  "btn bg-red-700 text-white  cus-btn-disabled disabled:cursor-no-drop"
                }
                disabled={!wallet.connected}
                //   @ts-ignore
                accept="video/*"
              >
                Upload a Video
              </button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
};
export default CreatePage;

// http://res.cloudinary.com/dbbbydpi5/video/upload/v1732473598/uwn3ebonnzar5ujzjpoq.mp4
