"use client";

import { useState, useCallback } from "react";
import { create } from "ipfs-http-client";
import { useDropzone } from "react-dropzone";
import { File, Upload } from "lucide-react";
import axios from "axios";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

// Initialize IPFS client
// Note: Replace with your own IPFS node address if you're not using the default

export default function IPFSUploader() {
  const [files, setFiles] = useState<Array<{ cid: string; name: string }>>([]);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // const onDrop = useCallback(async (acceptedFiles: File[]) => {
  //   setIsUploading(true);
  //   for (const file of acceptedFiles) {
  //     try {
  //       const added = await client.add(file);
  //       setFiles((prev) => [
  //         ...prev,
  //         { cid: added.cid.toString(), name: file.name },
  //       ]);
  //     } catch (error) {
  //       console.error("Error uploading file: ", error);
  //     }
  //   }
  //   setIsUploading(false);
  // }, []);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    for (const file of acceptedFiles) {
      try {
        // Create form data for Pinata
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              Authorization: `Bearer ${process.env.JWT}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setFiles((prev) => [
          ...prev,
          { cid: res.data.IpfsHash, name: file.name },
        ]);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ipfsUrl) {
      const cid = ipfsUrl.split("/").pop() || "";
      setFiles((prev) => [...prev, { cid, name: "From URL" }]);
      setIpfsUrl("");
    }
  };

  return (
    <div className="max-w-md mx-auto">
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
          value={ipfsUrl}
          onChange={(e) => setIpfsUrl(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleUrlSubmit(e);
            }
          }}
        />
        <div
          {...getRootProps()}
          className={`mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer transition-colors duration-200 ease-in-out ${
            isDragActive
              ? "border-blue-500 bg-blue-100"
              : "hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload
            className={`mx-auto mb-2 w-8 h-8 ${
              isDragActive ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? "Drop the files here..."
              : "Drag and drop files here or click to upload to IPFS"}
          </p>
        </div>
        {isUploading && (
          <p className="mt-2 text-sm text-gray-600 text-center">Uploading...</p>
        )}
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Uploaded Files:
            </h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <File className="w-4 h-4" />
                  <a
                    href={`https://ipfs.io/ipfs/${file.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 hover:underline"
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
