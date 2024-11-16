"use client";

import CreatePublisherContract from "./components/CreatePublisherContract";
import CreateAdSpace from "./components/CreateAdSpace";
import { ConnectPublicClient, ConnectWalletClient } from "../config/config";
import { abi as publisherAbi } from "../../abi/DecentradFactory.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
interface PublisherData {
  siteURL: string;
  cloneAddress: string;
}

export default function Page() {
  const publisherContract = "0x808adaa716c41f69fc99ebe11c03fe7a8a9683e1";
  const publisherContractAbi = publisherAbi;
  const [publisherData, setPublisherData] = useState<PublisherData[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();
  const { router } = useRouter();

  const [showComponent, setShowComponent] = useState<
    "buttons" | "publisher" | "adspace"
  >("buttons");

  useEffect(() => {
    if (address) {
      fetchData();
    } else {
      router.push("/");
    }
  }, [address]);

  const fetchData = async () => {
    const pairs = (await ConnectPublicClient().readContract({
      address: publisherContract,
      abi: publisherContractAbi,
      functionName: "getAllPubClonesByAddress",
      args: [address],
    })) as PublisherData[];

    setPublisherData(pairs);
  };

  const renderContent = () => {
    if (publisherData.length === 0) {
      return <CreatePublisherContract />;
    }

    switch (showComponent) {
      case "publisher":
        return <CreatePublisherContract />;
      case "adspace":
        return <CreateAdSpace />;
      default:
        return (
          <div className="flex gap-4">
            <button
              onClick={() => setShowComponent("publisher")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create Publisher Contract
            </button>
            <button
              onClick={() => setShowComponent("adspace")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Create Ad Space
            </button>
          </div>
        );
    }
  };

  return <div className="min-h-screen bg-pink-200">{renderContent()}</div>;
}
