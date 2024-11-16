"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [selectedAd, setSelectedAd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAd = (ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-blue-200">
      <div className="container mx-auto p-8">
        <div className="text-center m-3">
          <h1 className="text-3xl">
            <span className="font-extrabold">My Ads</span>
          </h1>
          <p className="text-sm">
            Check your ad campaign status here or create a new ad
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <div className="space-y-4">
            <div className="flex justify-end">
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
                {/* Sample Active Ad Cards */}
                <div className="min-w-[300px] border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium">Summer Sale Campaign</h3>
                  <p className="text-sm text-gray-600 my-2">
                    Get 50% off on all summer items! Limited time offer.
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    URL: summer-sale.example.com
                  </p>
                  <button
                    className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    onClick={() =>
                      handleViewAd({
                        title: "Summer Sale Campaign",
                        description:
                          "Get 50% off on all summer items! Limited time offer.",
                        url: "summer-sale.example.com",
                        status: "active",
                      })
                    }
                  >
                    View Ad
                  </button>
                </div>

                <div className="min-w-[300px] border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium">New Collection Launch</h3>
                  <p className="text-sm text-gray-600 my-2">
                    Discover our latest autumn collection now available!
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    URL: new-collection.example.com
                  </p>
                  <button
                    className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    onClick={() =>
                      handleViewAd({
                        title: "New Collection Launch",
                        description:
                          "Discover our latest autumn collection now available!",
                        url: "new-collection.example.com",
                        status: "active",
                      })
                    }
                  >
                    View Ad
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Inactive Ads</h2>
              <div className="flex gap-2.5 overflow-x-auto pb-4">
                {/* Sample Inactive Ad Card */}
                <div className="min-w-[300px] border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium">Spring Collection</h3>
                  <p className="text-sm text-gray-600 my-2">
                    Spring fashion essentials at amazing prices!
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    URL: spring-sale.example.com
                  </p>
                  <button
                    className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    onClick={() =>
                      handleViewAd({
                        title: "Spring Collection",
                        description:
                          "Spring fashion essentials at amazing prices!",
                        url: "spring-sale.example.com",
                        status: "inactive",
                      })
                    }
                  >
                    View Ad
                  </button>
                </div>
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
              <h2 className="text-xl font-semibold">{selectedAd.title}</h2>
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
                <p>{selectedAd.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">URL</p>
                <p className="font-mono">{selectedAd.url}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p
                  className={`capitalize ${
                    selectedAd.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedAd.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
