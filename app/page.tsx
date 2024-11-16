"use client";

// import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import MainApp from "./components/MainApp";

export default function Home() {
  // const { primaryWallet } = useDynamicContext();
  // const isConnected = !!primaryWallet;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-300 via-white to-blue-300">
      <main className="pt-16">
        <MainApp />
      </main>
    </div>
  );
}
