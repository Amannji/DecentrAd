"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function ConnectButton() {
  const { primaryWallet, handleLogOut, setShowAuthFlow } = useDynamicContext();
  const isConnected = !!primaryWallet;

  const handleConnect = () => {
    if (isConnected) {
      handleLogOut();
    } else {
      setShowAuthFlow(true);
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="px-6 py-2 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
    >
      {isConnected ? "Hi!😋" : "Log In"}
    </button>
  );
}
