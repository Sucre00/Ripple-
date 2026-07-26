"use client";

import React from "react";
import Link from "next/link";
import { IconQrcode, IconShieldCheck, IconWallet, IconReportAnalytics, IconShare } from "@tabler/icons-react";

export default function FeaturesPage() {
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

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Platform Capabilities
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Rippl Feature Breakdown</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconQrcode className="w-6 h-6 text-[#e15b3e]" />
            <h3 className="font-semibold text-sm text-slate-900">Offline QR Code Generator</h3>
            <p className="text-xs text-slate-500 font-light">Generate printable QR codes for supermarket, fashion store, and restaurant referral campaigns.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconShieldCheck className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-sm text-slate-900">3-Tier Lazy KYC</h3>
            <p className="text-xs text-slate-500 font-light">Email/Phone → BVN validation → NIN/ID document verification with liveness checks.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconWallet className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-sm text-slate-900">NIP Payout Rails</h3>
            <p className="text-xs text-slate-500 font-light">Automated bank account validation and 24-hour commission cashout SLA.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <IconReportAnalytics className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-sm text-slate-900">Real-time Attribution</h3>
            <p className="text-xs text-slate-500 font-light">Live conversion log with UTM source tracking, device fingerprinting, and risk scoring.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
