"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.module.css";
import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { checkAuth } = useAppStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
