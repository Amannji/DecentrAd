"use client";
import { useRouter } from "next/navigation";
import IpfsUploader from "./IpfsUploader";
import {
  ConnectPublicClient,
  ConnectWalletClient,
} from "../../../config/config";
import { useState, useEffect } from "react";
import { abi as publisherContractAbi } from "../../../../abi/DecentradFactory.json";
import { abi as advertiserContractAbi } from "../../../../abi/Decentrad.json";
import { useAccount } from "wagmi";
import { toBytes } from "viem";

interface PublisherData {
  siteURL: string;
  cloneAddress: string;
}

export default function UploadingCreatives({
  setIsStep2,
  formData,
  setFormData,
}: {
  setIsStep2: (value: boolean) => void;
  formData: any;
  setFormData: (value: any) => void;
}) {
  const { address } = useAccount();
  const router = useRouter();
  // Add navigation handler
  const publisherContract = "0x808ADaA716C41F69Fc99ebE11c03fe7a8a9683e1";
  const advertiserContract = "0x1A11eC2Cc811e610eBAa8975daA0A8c1a080d2d0";
  const [publisherData, setPublisherData] = useState<PublisherData[]>([]);
  const handleBack = () => {
    router.push("/");
  };

  const fetchPublisherData = async () => {
    const pairs = (await ConnectPublicClient().readContract({
      address: publisherContract,
      abi: publisherContractAbi,
      functionName: "getAllPublisherContracts",
      args: [],
    })) as PublisherData[];

    setPublisherData(pairs);
  };

  interface AdSpace {
    size: string;
    pageURL: string;
    moderators: string[];
    moderationFees: bigint;
    name: string;
    description: string;
    isEnabled: boolean;
  }

  const [adSpaces, setAdSpaces] = useState<AdSpace[]>([]);
  const [currentAdSpaceIndex, setCurrentAdSpaceIndex] = useState<number>(0);
  const [selectedPublisherAddr, setSelectedPublisherAddr] =
    useState<string>("");

  const fetchAdSpaces = async (publisherAddr: string) => {
    try {
      // Get all ad space IDs
      const spaceIds = (await ConnectPublicClient().readContract({
        address: publisherAddr as `0x${string}`,
        abi: advertiserContractAbi,
        functionName: "getAllAdvSpaceIds",
        args: [],
      })) as string[];

      // Get details for all ad spaces
      const spaces = (await ConnectPublicClient().readContract({
        address: publisherAddr as `0x${string}`,
        abi: advertiserContractAbi,
        functionName: "getAdvSpacesByIds",
        args: [spaceIds],
      })) as AdSpace[];

      setAdSpaces(spaces);
      setCurrentAdSpaceIndex(0);
    } catch (error) {
      console.error("Error fetching ad spaces:", error);
      setAdSpaces([]);
    }
  };

  const handlePublisherSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pubAddr = e.target.value;
    setSelectedPublisherAddr(pubAddr);
    if (pubAddr) {
      fetchAdSpaces(pubAddr);
    } else {
      setAdSpaces([]);
    }
  };

  const handlePrevious = () => {
    if (currentAdSpaceIndex > 0) {
      setCurrentAdSpaceIndex((prev) => prev - 1);
      setFormData({
        ...formData,
        advSpaceId: adSpaces[currentAdSpaceIndex - 1].size,
      });
    }
  };

  const handleNext = () => {
    if (currentAdSpaceIndex < adSpaces.length - 1) {
      setCurrentAdSpaceIndex((prev) => prev + 1);
      setFormData({
        ...formData,
        advSpaceId: adSpaces[currentAdSpaceIndex + 1].size,
      });
    }
  };
  useEffect(() => {
    if (address) {
      fetchPublisherData();
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-200">
      <div className="container mx-auto p-8">
        <div className="text-center m-3">
          <h1 className="text-3xl">
            <span className="font-extrabold">Advertiser </span>Step 1
          </h1>
          <p className="text-sm">Select ad space and upload your creatives</p>
        </div>

        <div className="flex gap-6">
          {/* Left Column */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="publisherWebsite"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Publisher Website
                  </label>
                  <select
                    id="publisherWebsite"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onChange={handlePublisherSelect}
                    value={selectedPublisherAddr}
                  >
                    <option value="">Select a publisher website</option>
                    {publisherData.map((publisher) => (
                      <option
                        key={publisher.cloneAddress}
                        value={publisher.cloneAddress}
                      >
                        {publisher.siteURL}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter description"
                  />
                </div>

                {/* Ad Space Cards Container */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Available Ad Spaces</h2>

                  {/* Dynamic Ad Space Card Component */}
                  {adSpaces.length > 0 && (
                    <div className="border rounded-lg p-4 transition-all duration-300">
                      <h3 className="font-medium mb-2">
                        {adSpaces[currentAdSpaceIndex].name}
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm text-gray-600">
                            Page URL
                          </label>
                          <p className="text-sm">
                            {adSpaces[currentAdSpaceIndex].pageURL}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Size</label>
                          <p className="text-sm">
                            {adSpaces[currentAdSpaceIndex].size}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Description
                          </label>
                          <p className="text-sm">
                            {adSpaces[currentAdSpaceIndex].description}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                          onClick={handlePrevious}
                          disabled={currentAdSpaceIndex === 0}
                        >
                          Previous
                        </button>
                        <button
                          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                          onClick={handleNext}
                          disabled={currentAdSpaceIndex === adSpaces.length - 1}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Ad Details</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="adTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ad Title
                  </label>
                  <input
                    type="text"
                    id="adTitle"
                    value={formData.advTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, advTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter ad title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="adText"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ad Text
                  </label>
                  <textarea
                    id="adText"
                    rows={3}
                    value={formData.advText}
                    onChange={(e) =>
                      setFormData({ ...formData, advText: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter ad text"
                  />
                </div>

                <div>
                  <label
                    htmlFor="adUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ad URL
                  </label>
                  <input
                    type="url"
                    id="adUrl"
                    value={formData.advLink}
                    onChange={(e) =>
                      setFormData({ ...formData, advLink: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter ad URL"
                  />
                </div>

                <IpfsUploader />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Back
          </button>
          <h1>
            <span className="text-blue-600 font-bold">Advertiser </span> Step 1
          </h1>
          <button
            className="px-6 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              if (adSpaces.length > 0 && !formData.advSpaceId) {
                setFormData({
                  ...formData,
                  advSpaceId: adSpaces[0].size,
                });
              }
              setIsStep2(true);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
