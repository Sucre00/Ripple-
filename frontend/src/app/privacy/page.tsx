"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
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
            NDPR Compliant
          </span>
          <h1 className="text-2xl font-bold text-slate-900">Privacy & Data Protection Notice</h1>
          <p className="text-xs text-slate-400">Effective Date: May 2026</p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 font-light leading-relaxed bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-900 text-sm">1. Data Collection Scope</h3>
          <p>Rippl collects business information, director KYC documents (CAC, BVN, NIN), ambassador bank account details, device fingerprints, and anonymized referral conversion logs to provide secure affiliate tracking and automated payouts.</p>

          <h3 className="font-semibold text-slate-900 text-sm">2. Compliance with NDPR & CBN Regulations</h3>
          <p>All data is processed strictly in accordance with the Nigeria Data Protection Regulation (NDPR) and Central Bank of Nigeria (CBN) financial guidelines. We enforce TLS 1.3 encryption in transit and AES-256 encryption at rest.</p>

          <h3 className="font-semibold text-slate-900 text-sm">3. Data Subject Rights</h3>
          <p>Users maintain the right to access, rectify, or request deletion of their personal data by contacting privacy@rippl.io.</p>
        </div>
      </main>
    </div>
  );
}
