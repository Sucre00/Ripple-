"use client";

import React from "react";
import Link from "next/link";
import { IconBriefcase, IconCheck, IconArrowRight, IconSparkles, IconQrcode } from "@tabler/icons-react";

export default function BusinessSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-7 w-auto" />
        </Link>
        <Link href="/auth?mode=signup&role=business_admin" className="px-4 py-2 rounded-xl bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d]">
          Launch Merchant Program
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Solutions For Online & Offline Merchants
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Scale Customer Acquisition With Zero Upfront Risk</h1>
          <p className="text-xs text-slate-500 font-light max-w-xl mx-auto">
            Pay commissions only when verified sales occur — online via tracking pixel or in-store via printable QR codes and POS confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <IconSparkles className="w-4 h-4 text-[#e15b3e]" />
              Online E-Commerce Merchants
            </h3>
            <div className="space-y-2 text-xs text-slate-600 font-light">
              <p className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-green-600" /> Shopify, WooCommerce, & Custom API pixels</p>
              <p className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-green-600" /> Automated purchase conversion attribution</p>
              <p className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-green-600" /> Real-time ROI analytics & EPC metrics</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <IconQrcode className="w-4 h-4 text-purple-600" />
              Offline Physical Stores & SMBs
            </h3>
            <div className="space-y-2 text-xs text-slate-600 font-light">
              <p className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-green-600" /> Printable QR code cards for ambassadors</p>
              <p className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-green-600" /> Manual sale logger & POS receipt validation</p>
              <p className="flex items-center gap-2"><IconCheck className="w-3.5 h-3.5 text-green-600" /> Works for supermarkets, pharmacies, & restaurants</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
