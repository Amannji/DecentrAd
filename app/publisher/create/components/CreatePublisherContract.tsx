import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ConnectWalletClient,
  ConnectPublicClient,
} from "../../../config/config";
import { abi as publisherAbi } from "../../../../abi/DecentradFactory.json";

export default function CreatePublisherContract({
  setIsStep2,
  setContractAddress,
}: {
  setIsStep2: (value: boolean) => void;
  setContractAddress: (value: string) => void;
}) {
  const router = useRouter();
  const walletClient = ConnectWalletClient();
  const publicClient = ConnectPublicClient();

  const publisherContract = "0x0b2f836957ED4028C5A1cdFAadDC1232216655f5";
  const publisherContractAbi = publisherAbi;

  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    setIsLoading(true);
    const account = await walletClient.getAddresses();
    try {
      const hash = await walletClient.writeContract({
        address: publisherContract as `0x${string}`,
        abi: publisherContractAbi,
        functionName: "createPublisherClone",
        args: [url, description, "0x1D9C9dDF1Eca111f4EBCf47F362f7b6503fFF914"],
        account: account[0],
      });
      const tx = await publicClient.waitForTransactionReceipt({ hash });

      setContractAddress(tx.contractAddress as string);
      console.log(tx);
      setIsStep2(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="container mx-auto p-8">
        <div className="text-center m-3 ">
          <h1 className="text-3xl ">
            <span className="font-extrabold">Publisher </span>Create Contract
          </h1>
          <p className="text-sm">
            Creating the smart contract for the website.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <div className="flex space-x-7">
            <div className="text-pink-600">
              <h1 className="text-sm font-bold">1. Website Details</h1>
              <p className="text-xs mb-4">
                Add your websiteURL and le us know more about your website
              </p>
            </div>
            <div>
              <h1 className="text-sm font-bold">2.Ad Space Details</h1>
              <p className="text-xs mb-4">
                Provide the details for your new ad space
              </p>
            </div>
          </div>
          <div className="space-y-4 mt-3">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL*
              </label>
              <input
                type="url"
                id="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter advertisement URL"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter advertisement description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-between space-y-2">
              <span className="text-sm font-medium text-gray-700">
                Payment Currency
              </span>
              <button className="px-3 py-1 text-sm text-left border border-gray-300 rounded-md hover:bg-gray-50">
                USDC
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Back
          </button>
          <h1>
            <span className="text-pink-600 font-bold">Publisher </span> Create
            Contract
          </h1>
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-[30%] mx-auto">
                <h2 className="text-lg font-bold mb-2">
                  Please wait while your transaction is being processed...
                </h2>
                <p>
                  Transactions can take up to 30 seconds to complete. Do not
                  refresh or relad this webpage. Please check your metamask
                  wallet to verify and approve any pending transactions
                </p>
                <div className="mt-4 border-2 border-pink-500 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-8 md:w-8 border-4 border-pink-500 border-t-transparent"></div>
                    <p className="text-sm font-medium">
                      Creating Published Smart Contract
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              handleCreate();
            }}
            className="px-6 py-2 text-white font-bold bg-pink-600 rounded-md hover:bg-pink-400"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
