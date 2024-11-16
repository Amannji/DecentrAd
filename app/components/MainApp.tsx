"use client";
import { useRouter } from "next/navigation";
// import { useEnsName } from "wagmi";
// import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function MainApp() {
  //   const { primaryWallet } = useDynamicContext();
  //   const { data: ensName } = useEnsName({
  //     address: primaryWallet?.address as `0x${string}`,
  //   });
  const router = useRouter();
  return (
    <>
      {/* Main content with two containers */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-12 text-center">DecentrAd</h1>
        <div className="flex flex-wrap gap-8 w-full p-12 rounded-xl">
          {/* Publishers Container */}
          <div className="flex-1 p-8 border rounded-lg shadow-lg bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">For Publishers</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Monetize your content effectively</li>
              <li>Connect with premium advertisers</li>
              <li>Control your ad space</li>
              <li>Track performance in real-time</li>
            </ul>
            <button
              onClick={() => router.push("/publisher")}
              className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-400 transition-colors"
            >
              Become a publisher
            </button>
          </div>

          {/* Advertisers Container */}
          <div className="flex-1 p-8 border rounded-lg shadow-lg bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">For Advertisers</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Reach targeted audiences</li>
              <li>Access premium ad spaces</li>
              <li>Transparent pricing</li>
              <li>Detailed analytics dashboard</li>
            </ul>
            <button
              onClick={() => router.push("/advertiser")}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition-colors"
            >
              Become an advertiser
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
