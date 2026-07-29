"use client";

import React from "react";
import Link from "next/link";
import { IconSearch, IconBook, IconFileCode, IconHelp, IconMessage } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="help" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-blue-100 text-blue-800 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.13 & 16.01 — Help Center & Documentation
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Support Knowledge Base</h1>
          <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
            Search developer documentation, merchant integration guides, and ambassador withdrawal steps.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-2 relative">
            <input 
              type="text" 
              placeholder="Search help articles, SDK docs, payout rules..." 
              className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-white text-xs shadow-sm focus:outline-none focus:border-[#e15b3e]"
            />
            <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <IconBook className="w-6 h-6 text-[#e15b3e]" />
            <h3 className="font-bold text-sm text-slate-900">Merchant Setup Guides</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Step-by-step guides for installing pixels on Shopify, WooCommerce, and custom checkout flows.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <IconFileCode className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Developer API & Webhooks</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              REST endpoint specs, conversion signature validation, and event webhook selectors.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <IconHelp className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Ambassador Cashouts</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              How NIP 24h bank payouts resolve, BVN identity verification, and referral link creation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
