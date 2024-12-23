"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectWalletClient } from "../../../config/config";
import { abi as advertiserContractAbi } from "../../../../abi/Decentrad.json";
import { parseEther, parseGwei, formatEther, toBytes } from "viem";

export default function SettingPaymentRate({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  const router = useRouter();
  const { address } = useAccount();
  const { data: balance } = useBalance({ 
    address,
    token: '0x1D9C9dDF1Eca111f4EBCf47F362f7b6503fFF914' // ERC20 token contract address
  });
  const [depositAmount, setDepositAmount] = useState(parseEther("0"));

  const contractAddress = "0x9c1961f76B62A4B149722a652dFe4AC96bdAF27c";//"0x1A11eC2Cc811e610eBAa8975daA0A8c1a080d2d0";
  const contractAbi = advertiserContractAbi;

  const handleCreate = async () => {
    if (!address) return;
    console.log("depositAmount", formatEther(depositAmount));
    // First approve ERC20 spending
    await ConnectWalletClient().writeContract({
      address: "0x1D9C9dDF1Eca111f4EBCf47F362f7b6503fFF914", // ERC20 token address
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256", 
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      functionName: "approve",
      args: [
        "0x9c1961f76B62A4B149722a652dFe4AC96bdAF27c", // Spender contract
        depositAmount // Amount to approve
      ],
      account: address,
    });
    const hash = await ConnectWalletClient().writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "createAdvAndAddToAdvSpace",
      args: [
        "0x268cd244f656e632452c9d1c05c45ffa0a9bab2555c3236d53500e2749a79a1a",//toBytes(formData.advId),
        formData.advTitle,
        formData.advText,
        formData.ipfsHashes,
        formData.paymentRatePerSec,
        depositAmount,
        formData.advLink,
      ],
      account: address,
    });
    // Show transaction hash with blockscout link
    console.log("Transaction submitted:", hash);
    const blockscoutUrl = `https://eth-sepolia.blockscout.com/tx/${hash}`;
    alert(`Transaction submitted! View on Blockscout: ${blockscoutUrl}`);
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
                <span className="font-semibold">
                  {Number(balance?.formatted).toFixed(2)} tDRT
                </span>
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
                value={formatEther(depositAmount)}
                onChange={(e) => setDepositAmount(parseEther(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter deposit amount"
                step="0.01"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Deposit Fee (2%):</span>
                <span>
                  {(Number(formatEther(depositAmount)) * 0.02).toFixed(2)} tDRT
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount for Ad Spend:</span>
                <span>
                  {(Number(formatEther(depositAmount)) * 0.98).toFixed(2)} tDRT
                </span>
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
                  value={formData.paymentRatePerSec}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentRatePerSec: (e.target.value),
                    })
                  }
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
            onClick={() => router.back()}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Back
          </button>
          <h1>
            <span className="text-blue-600 font-bold">Advertiser </span> Step 2
          </h1>
          <button
            className="px-6 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
