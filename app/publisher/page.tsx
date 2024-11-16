"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  // Add navigation handler
  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-pink-200">
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
          <h1 className="text-sm font-bold">Website Details</h1>
          <p className="text-xs">
            Add your websiteURL and le us know more about your website
          </p>
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
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Payment Currency
              </span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                USDC
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg flex justify-between items-center">
          <button
            onClick={handleBack}
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
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent"></div>
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
