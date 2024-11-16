"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  // Add navigation handler
  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-blue-200">
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
            <span className="text-blue-600 font-bold">Advertiser </span> Step 1
          </h1>
          <button className="px-6 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
