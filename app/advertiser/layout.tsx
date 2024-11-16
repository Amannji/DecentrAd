import { ReactNode } from "react";

interface AdvertiserLayoutProps {
  children: ReactNode;
}

export default function AdvertiserLayout({ children }: AdvertiserLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
