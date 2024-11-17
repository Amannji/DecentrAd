"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { abi as advertiserContractAbi } from "../../abi/Decentrad.json";
import { ConnectPublicClient } from "../config/config";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { CircleArrowLeft } from "lucide-react";
export default function Page() {
  const router = useRouter();
  const { address } = useAccount();
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ads, setAds] = useState<any[]>([]);

  const handleViewAd = (ad: any) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  const contractAddress = "0xF819c667b5E6aa01F93fcb52B962D6C8B35F1826";
  const contractAbi = advertiserContractAbi;

  const fetchData = async () => {
    if (!address) return;

    // Get all advIds for this advertiser
    const advIds = (await ConnectPublicClient().readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "getAdvIdsOfAdvertiser",
      args: [address as `0x${string}`],
    })) as string[];

    // Get details for all ads
    const [adDetails, activeStatuses] =
      (await ConnectPublicClient().readContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getAdsByIds",
        args: [advIds],
      })) as [any[], boolean[]];

    // Combine details with active status
    const formattedAds = adDetails.map((ad, i) => ({
      ...ad,
      isActive: activeStatuses[i],
    }));

    setAds(formattedAds);
  };

  useEffect(() => {
    if (address) {
      fetchData();
    } else {
      router.push("/");
    }
  }, [address]);

  return (
    <div className="min-h-screen bg-blue-200">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center mb-8 mt-8 relative">
          <button
            onClick={() => router.push("/")}
            className="absolute left-0 text-gray-600 hover:text-gray-800"
          >
            <CircleArrowLeft width={50} height={35} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">My Ads</h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <div className="space-y-4">
            <div className="flex justify-end items-center">
              <button
                className="px-6 py-3 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => router.push("advertiser/create")}
              >
                Create New Ad
              </button>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Active Ads</h2>
              <div className="flex gap-2.5 overflow-x-auto pb-4">
                {ads
                  .filter((ad) => ad.isActive)
                  .map((ad, index) => (
                    <div
                      key={index}
                      className="min-w-[300px] border rounded-lg p-4 bg-gray-50"
                    >
                      <h3 className="font-medium">{ad.advTitle}</h3>
                      <p className="text-sm text-gray-600 my-2">{ad.advText}</p>
                      <p className="text-xs text-gray-500 mb-3">
                        Payment Rate: {ad.paymentRatePerSec.toString()} wei/sec
                      </p>
                      <button
                        className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                        onClick={() => handleViewAd(ad)}
                      >
                        View Ad
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Inactive Ads</h2>
              <div className="flex gap-2.5 overflow-x-auto pb-4">
                {ads
                  .filter((ad) => !ad.isActive)
                  .map((ad, index) => (
                    <div
                      key={index}
                      className="min-w-[300px] border rounded-lg p-4 bg-gray-50"
                    >
                      <h3 className="font-medium">{ad.advTitle}</h3>
                      <p className="text-sm text-gray-600 my-2">{ad.advText}</p>
                      <p className="text-xs text-gray-500 mb-3">
                        Payment Rate: {ad.paymentRatePerSec.toString()} wei/sec
                      </p>
                      <button
                        className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                        onClick={() => handleViewAd(ad)}
                      >
                        View Ad
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Details Modal */}
      {isModalOpen && selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedAd.advTitle}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p>{selectedAd.advText}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">IPFS Hashes</p>
                {selectedAd.ipfsHashes.map((hash: string, i: number) => (
                  <p key={i} className="font-mono">
                    {hash}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p
                  className={`capitalize ${
                    selectedAd.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedAd.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Rate</p>
                <p>{selectedAd.paymentRatePerSec.toString()} wei/sec</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
