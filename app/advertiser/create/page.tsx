"use client";
import { useState } from "react";
import UploadingCreatives from "./components/UploadingCreatives";
import SettingPaymentRate from "./components/SettingPaymentRate";

const CreateNewAd = () => {
  const [isStep2, setIsStep2] = useState(false);

  return (
    <div>
      {isStep2 ? (
        <SettingPaymentRate />
      ) : (
        <UploadingCreatives setIsStep2={setIsStep2} />
      )}
    </div>
  );
};

export default CreateNewAd;
