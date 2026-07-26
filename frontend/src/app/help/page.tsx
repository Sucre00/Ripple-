"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconSearch, IconHelp, IconBriefcase, IconWallet, IconShieldCheck, IconQrCode } from "@tabler/icons-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-7 w-auto" />
        </Link>
        <Link href="/auth?mode=signup" className="px-4 py-2 rounded-xl bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d]">
          Get Started
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Help Center & Knowledge Base
          </span>
          <h1 className="text-3xl font-bold text-slate-900">How Can We Help You?</h1>

          <div className="relative max-w-md mx-auto pt-2">
            <IconSearch className="w-4 h-4 text-slate-400 absolute left-4 top-6" />
            <input
              type="text"
              placeholder="Search help articles (e.g. NIP payouts, QR codes, CAC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs shadow-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconBriefcase className="w-5 h-5 text-[#e15b3e]" />
            <h3 className="font-semibold text-xs text-slate-900">Campaign Management</h3>
            <p className="text-[11px] text-slate-500 font-light">How to set commission rates, upload banner creative assets, and pause live programs.</p>
          </div>
          <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconQrCode className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-xs text-slate-900">Offline Store QR Codes</h3>
            <p className="text-[11px] text-slate-500 font-light">Generating printable QR codes for supermarket POS terminals and physical fashion boutiques.</p>
          </div>
          <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconWallet className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-xs text-slate-900">Bank Cashouts & NIP Payouts</h3>
            <p className="text-[11px] text-slate-500 font-light">Understanding cleared balances, Paystack NIP bank account resolution, and 24h SLA processing.</p>
          </div>
          <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-xs text-slate-900">KYC & Document Verification</h3>
            <p className="text-[11px] text-slate-500 font-light">Submitting CAC registration certificates, BVN validation, and NIN government IDs.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
