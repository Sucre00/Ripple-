"use client";

import React from "react";
import Link from "next/link";
import { IconBriefcase, IconCheck, IconArrowRight, IconSparkles, IconQrcode } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BusinessSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="solutions-business" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-purple-100 text-purple-800 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Business Merchant Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Scale E-Commerce & In-Store Customer Acquisition
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Pay commissions only on verified sales — online via tracking pixel or in-store via printable QR codes and cashier till confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-5">
            <div className="w-10 h-10 rounded-2xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center">
              <IconSparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Online E-Commerce Merchants</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Drop-in Javascript tracking pixel for Shopify, WooCommerce, or custom React apps. Track conversion attribution in real time with zero manual spreadsheets.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-slate-600 font-medium">
              <p className="flex items-center gap-2.5"><IconCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Drop-in Javascript & REST API integration</p>
              <p className="flex items-center gap-2.5"><IconCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Automatic double-cookie attribution clearing</p>
              <p className="flex items-center gap-2.5"><IconCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Live EPC, conversion rate, and GMV analytics</p>
            </div>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <IconQrcode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Offline Physical Stores & Supermarkets</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Printable QR code cards & store till camera scanning for physical supermarket sales in Lagos, Abuja, and Port Harcourt.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-slate-600 font-medium">
              <p className="flex items-center gap-2.5"><IconCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Printable ambassador QR code cards</p>
              <p className="flex items-center gap-2.5"><IconCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Cashier till camera scanning app</p>
              <p className="flex items-center gap-2.5"><IconCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Instant POS referral sale validation</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Ready to Launch Your Merchant Campaign?</h2>
          <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
            Set your commission percentage, invite ambassadors, and pay only for verified customer growth.
          </p>
          <div className="pt-2">
            <Link href="/auth?role=business_admin" className="px-6 py-3 rounded-full bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d] transition-all shadow-md shadow-[#e15b3e]/20 inline-flex items-center gap-1.5">
              Launch Merchant Campaign <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
