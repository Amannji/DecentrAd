"use client";
import CreateAdSpace from "./components/CreateAdSpace";
import CreatePublisherContract from "./components/CreatePublisherContract";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const [isStep2, setIsStep2] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    const contract = searchParams.get("contract");
    if (type === "adspace") {
      setIsStep2(true);
      setContractAddress(contract as string);
    }
  }, [searchParams]);

  return (
    <>
      {isStep2 ? (
        <CreateAdSpace contractAddress={contractAddress} />
      ) : (
        <CreatePublisherContract
          setIsStep2={setIsStep2}
          setContractAddress={setContractAddress}
        />
      )}
    </>
  );
}
