import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ConnectPublicClient,
  ConnectWalletClient,
} from "../../../config/config";
import { abi as publisherAbi } from "../../../../abi/DecentradFactory.json";
import { abi as someAbi } from "../../../../abi/Decentrad.json";
// import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { useAccount } from "wagmi";

export default function CreateAdSpace({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const router = useRouter();
  const [clones, setClones] = useState<
    Array<{ siteURL: string; cloneAddress: string }>
  >([]);
  // const { primaryWallet } = useDynamicContext();
  // const address = primaryWallet?.address;
  const { address } = useAccount();

  const publicClient = ConnectPublicClient();
  const walletClient = ConnectWalletClient();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    websiteUrl: "",
    contractAddress: "",
    pageUrl: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const publisherContract = "0x0b2f836957ED4028C5A1cdFAadDC1232216655f5";
  const publisherContractAbi = publisherAbi;

  const getAllPubClonesByPublisherAddress = async () => {
    const clones = await publicClient.readContract({
      address: publisherContract as `0x${string}`,
      abi: publisherContractAbi,
      functionName: "getAllPubClonesByAddress",
      args: [address],
    });
    console.log("See you tonight micky!" + clones);
    setClones(clones as []);
  };

  const handleSave = async () => {
    setIsLoading(true);
    console.log("formData websiteUrl", formData.websiteUrl);
    const hash = await walletClient.writeContract({
      address: contractAddress as `0x${string}`,
      abi: someAbi,
      functionName: "createAdvSpace",
      args: [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        formData.websiteUrl,
        0,
        formData.description,
      ],
      account: address as `0x${string}`,
    });
    const tx = await publicClient.waitForTransactionReceipt({ hash });
    console.log(tx);
    setIsLoading(false);
    router.push("/publisher");
  };

  useEffect(() => {
    if (address) {
      getAllPubClonesByPublisherAddress();
    }
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Title Section */}
      <div className="text-center m-3">
        <h1 className="text-3xl">
          <span className="font-extrabold">Publisher </span>Create Ad Space
        </h1>
        <p className="text-sm">Create an ad space in the smart contract</p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
        <div className="flex space-x-7">
          <div>
            <h1 className="text-sm font-bold">1. Website Details</h1>
            <p className="text-xs mb-4">
              Add your websiteURL and le us know more about your website
            </p>
          </div>
          <div className="text-pink-600">
            <h1 className="text-sm font-bold">2.Ad Space Details</h1>
            <p className="text-xs mb-4">
              Provide the details for your new ad space
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="websiteUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website URL*
            </label>
            <select
              id="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              {clones?.map((clone, index) => (
                <option key={index} value={clone.siteURL}>
                  {clone.siteURL}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="contractAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contract Address*
            </label>
            <input
              type="text"
              id="contractAddress"
              value={contractAddress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter contract address"
              required
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="pageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Page URL*
            </label>
            <input
              type="url"
              id="pageUrl"
              value={formData.pageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter specific page URL"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description*
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter ad space description"
              required
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white p-4 rounded-lg flex justify-between items-center">
        <button
          onClick={() => router.push("/publisher")}
          className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <h1>
          <span className="text-pink-600 font-bold">Publisher </span> Create Ad
          Space
        </h1>
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[30%] mx-auto">
              <div className="mt-4 border-2 border-pink-500 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent"></div>
                  <p className="text-sm font-medium">
                    Transaction in progress...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleSave}
          className="px-6 py-2 text-white font-bold bg-pink-600 rounded-md hover:bg-pink-400"
        >
          Save
        </button>
      </div>
    </div>
  );
}
