"use client";
import { useRouter } from "next/navigation";

export default function UploadingCreatives({
  setIsStep2,
}: {
  setIsStep2: (value: boolean) => void;
}) {
  const router = useRouter();
  // Add navigation handler
  const handleBack = () => {
    router.push("/");
  };
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
                  >
                    <option value="">Select a publisher website</option>
                    {/* Add options dynamically */}
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

                  {/* Ad Space Card Component */}
                  <div className="border rounded-lg p-4 transition-all duration-300">
                    <h3 className="font-medium mb-2">Ad Space Title</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm text-gray-600">
                          Page URL
                        </label>
                        <p className="text-sm">/example-page</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Size</label>
                        <p className="text-sm">300x250</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">
                          Description
                        </label>
                        <p className="text-sm">Premium sidebar placement</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                        Previous
                      </button>
                      <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                        Next
                      </button>
                    </div>
                  </div>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter ad URL"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label
                    htmlFor="ipfsUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    IPFS URL
                  </label>
                  <input
                    type="text"
                    id="ipfsUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter IPFS URL for uploaded files"
                  />
                  {/* IPFS Upload Component would go here */}
                  <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <p className="text-sm text-gray-600">
                      Drag and drop files here or click to upload to IPFS
                    </p>
                  </div>
                </div>
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
            onClick={() => setIsStep2(true)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
