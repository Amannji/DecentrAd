import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConnectButton from "./components/ConnectButton";
import Providers from "./providers";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DecentraAd",
  description:
    "One stop solution for adding a layer of crypto to your web traffic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div>
            <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-centers z-50 mb-2">
              <div className="text-xl font-bold">DecentrAd</div>
              <ConnectButton />
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
