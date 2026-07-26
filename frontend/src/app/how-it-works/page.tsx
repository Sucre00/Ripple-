"use client";

import React from "react";
import Link from "next/link";

export default function HowItWorksPage() {
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

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Step-by-Step Guide
          </span>
          <h1 className="text-3xl font-bold text-slate-900">How Rippl Powers Commerce</h1>
          <p className="text-xs text-slate-500 font-light max-w-xl mx-auto">
            From initial campaign creation to instant automated NIP bank settlement — here is how merchants and ambassadors collaborate.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { step: "01", title: "Launch Campaign", desc: "Merchants create referral programs selecting online pixel tracking or physical store QR codes." },
            { step: "02", title: "Recruit Ambassadors", desc: "Share campaign marketplace links or invite brand ambassadors directly to join." },
            { step: "03", title: "Attribute Conversions", desc: "Customers convert online via pixel or in-store by scanning the ambassador's QR code card." },
            { step: "04", title: "Instant Bank Payouts", desc: "Cleared commissions trigger automated Paystack NIP bank transfers directly into ambassador accounts." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-start gap-5">
              <span className="text-2xl font-bold text-[#e15b3e] font-mono">{item.step}</span>
              <div>
                <h3 className="font-semibold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 font-light mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
