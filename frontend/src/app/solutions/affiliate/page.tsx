"use client";

import React from "react";
import Link from "next/link";
import { IconUsers, IconCheck, IconArrowRight, IconBuildingBank, IconShare } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AffiliateSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="solutions-affiliate" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.07 — Creator & Ambassador Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Earn Daily Commissions Sharing Products You Love
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            No minimum cashout thresholds. Sub-24h NIBSS NIP bank transfers straight to any bank account in Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center">
              <IconShare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Custom Links & QR Cards</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Generate trackable UTM links for WhatsApp/Instagram or download printable QR cards for offline sharing.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <IconBuildingBank className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Sub-24h NIP Bank Cashouts</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Withdraw cleared earnings directly into any Nigerian bank account in under 24 hours with zero delays.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <IconUsers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Verified Brand Campaigns</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Access top e-commerce merchants and physical store brands offering up to 30% per referred sale.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Start Earning Today as a Creator Ambassador</h2>
          <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
            Free to join with instant campaign link generation and 24h bank settlement.
          </p>
          <div className="pt-2">
            <Link href="/auth?role=affiliate" className="px-6 py-3 rounded-full bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d] transition-all shadow-md shadow-[#e15b3e]/20 inline-flex items-center gap-1.5">
              Become an Ambassador <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
