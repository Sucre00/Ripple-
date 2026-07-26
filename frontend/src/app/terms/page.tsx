"use client";

import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-7 w-auto" />
        </Link>
        <Link href="/auth?mode=login" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
          Sign In
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase">
            Platform Agreement
          </span>
          <h1 className="text-2xl font-bold text-slate-900">Terms of Service</h1>
          <p className="text-xs text-slate-400">Governed by Nigerian Law • Effective May 2026</p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 font-light leading-relaxed bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-900 text-sm">1. Merchant & Ambassador Obligations</h3>
          <p>Merchants agree to maintain sufficient wallet reserve balances to clear verified commission obligations. Ambassadors agree not to engage in self-referrals, cookie stuffing, or deceptive advertising.</p>

          <h3 className="font-semibold text-slate-900 text-sm">2. Offline & QR Sale Confirmations</h3>
          <p>Offline supermarket and physical shop sales verified via QR code scan or POS confirmation trigger binding commission liabilities upon business confirmation.</p>

          <h3 className="font-semibold text-slate-900 text-sm">3. Fraud Prevention & Account Holds</h3>
          <p>Rippl reserves the right to hold payouts pending audit if an account exhibits velocity anomalies or fraud scores exceeding safety thresholds.</p>
        </div>
      </main>
    </div>
  );
}
