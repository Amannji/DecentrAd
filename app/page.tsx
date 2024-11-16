"use client";

// import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectButton from "./components/ConnectButton";
import MainApp from "./components/MainApp";

export default function Home() {
  // const { primaryWallet } = useDynamicContext();
  // const isConnected = !!primaryWallet;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-300 via-white to-blue-300">
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-centers z-50">
        <div className="text-xl font-bold">DecentrAd</div>
        <ConnectButton />
      </header>
      <main className="pt-16">
        <MainApp />
      </main>
    </div>
  );
}
