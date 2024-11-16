"use client";

import { ConnectPublicClient } from "../config/config";
import { abi as publisherAbi } from "../../abi/DecentradFactory.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { CircleArrowLeft } from "lucide-react";

interface PublisherData {
  siteURL: string;
  cloneAddress: string;
}

export default function Page() {
  const publisherContract = "0x808adaa716c41f69fc99ebe11c03fe7a8a9683e1";
  const publisherContractAbi = publisherAbi;
  const [publisherData, setPublisherData] = useState<PublisherData[]>([]);

  const { address } = useAccount();
  const router = useRouter();

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

  return (
    <div className="p-8 min-h-screen">
      <div className="flex items-center justify-center mb-8 mt-8 relative">
        <button
          onClick={() => router.push("/")}
          className="absolute left-0 text-gray-600 hover:text-gray-800"
        >
          <CircleArrowLeft width={50} height={35} />
        </button>
        <h1 className="text-3xl font-bold">Publisher Dashboard</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Website URL
              </label>
              <select className="w-full p-2 border rounded-md">
                {publisherData.map((data, index) => (
                  <option key={index} value={data.siteURL}>
                    {data.siteURL}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium">Contract Address:</p>
              <p className="text-gray-600 break-all">
                {publisherData[0]?.cloneAddress}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium">
                Total Ad Spaces: <span>3</span>
              </p>
            </div>

            <div className="space-y-4">
              <button
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-400"
                onClick={() =>
                  router.push(
                    `/publisher/create?type=adspace&contract=${publisherData[0]?.cloneAddress}`
                  )
                }
              >
                Create Another Ad Space
              </button>
              <button
                className="w-full text-pink-600 py-2 px-4 rounded-md border border-pink-600 hover:text-pink-400 hover:border-pink-400"
                onClick={() => router.push("/publisher/create")}
              >
                Create Another Publisher Contract
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Ad Spaces</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium">Header Banner</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Enabled
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 shadow">
                  <div className="space-y-3">
                    <p>
                      <span className="font-medium">Type:</span> Banner
                    </p>
                    <p>
                      <span className="font-medium">URL:</span>{" "}
                      https://example.com/header
                    </p>
                    <p>
                      <span className="font-medium">URL for Advertisers:</span>{" "}
                      https://ads.example.com/header
                    </p>
                    <p>
                      <span className="font-medium">Description:</span> Premium
                      header banner position
                    </p>
                    <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50">
                      Disable Ad Space
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <span>←</span> Previous
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  Next <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
