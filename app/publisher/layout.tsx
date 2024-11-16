import { ReactNode } from "react";

interface PublisherLayoutProps {
  children: ReactNode;
}

export default function PublisherLayout({ children }: PublisherLayoutProps) {
  return <div className="min-h-screen bg-pink-100">{children}</div>;
}
