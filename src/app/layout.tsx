import Header from "@/components/header";
import RightSideBar from "@/components/right-sidebar";
import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dynamic 365",
  description: "Frontend Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-screen w-full`}>
        <div className="flex flex-col h-full">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <main className="h-full w-full">{children}</main>
            </div>
            <RightSideBar />
          </div>
        </div>
      </body>
    </html>
  );
}
