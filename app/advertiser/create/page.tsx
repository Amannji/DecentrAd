"use client";
import { useState } from "react";
import UploadingCreatives from "./components/UploadingCreatives";
import SettingPaymentRate from "./components/SettingPaymentRate";

const CreateNewAd = () => {
  const [isStep2, setIsStep2] = useState(false);
  const [formData, setFormData] = useState<{
    advId: string;
    advTitle: string;
    advText: string;
    ipfsHashes: string[];
    paymentRatePerSec: number;
    depositAmount: number;
    advLink: string;
  }>({
    advId: "",
    advTitle: "",
    advText: "",
    ipfsHashes: [],
    paymentRatePerSec: 0,
    depositAmount: 0,
    advLink: "",
  });

  return (
    <div>
      {isStep2 ? (
        <SettingPaymentRate formData={formData} setFormData={setFormData} />
      ) : (
        <UploadingCreatives
          setIsStep2={setIsStep2}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default CreateNewAd;
