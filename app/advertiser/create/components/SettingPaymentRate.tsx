"use client";
import { useRouter } from "next/navigation";

export default function SettingPaymentRate() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-blue-200">
      <div className="container mx-auto p-8">
        <div className="text-center m-3">
          <h1 className="text-3xl">
            <span className="font-extrabold">Advertiser </span>Step 2
          </h1>
          <p className="text-sm">
            Selecting the deposit amount and payment rate
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          {/* Wallet Balance Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Connected Wallet</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Balance:</span>
                <span className="font-semibold">0.00 ETH</span>
              </div>
            </div>
          </div>

          {/* Ad Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Ad Details</h2>

            <div>
              <label
                htmlFor="depositAmount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Deposit Amount (ETH)
              </label>
              <input
                type="number"
                id="depositAmount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter deposit amount"
                step="0.01"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Deposit Fee (2%):</span>
                <span>0.00 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount for Ad Spend:</span>
                <span>0.00 ETH</span>
              </div>
            </div>

            <div>
              <label
                htmlFor="paymentRate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment Rate
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  id="paymentRate"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter rate"
                  step="0.000001"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="second">Per Second</option>
                  <option value="minute">Per Minute</option>
                  <option value="hour">Per Hour</option>
                  <option value="day">Per Day</option>
                </select>
              </div>
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
            <span className="text-blue-600 font-bold">Advertiser </span> Step 2
          </h1>
          <button className="px-6 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
