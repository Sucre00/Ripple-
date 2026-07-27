import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import ProgressTrackerController from "@/components/ProgressTracker";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Rippl - Instant Referral & Affiliate Infrastructure",
  description: "Automated commission clearing, offline QR tracking, and sub-24h bank payouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {children}
        <Suspense fallback={null}>
          <ProgressTrackerController />
        </Suspense>
      </body>
    </html>
  );
}

