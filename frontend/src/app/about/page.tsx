"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight, IconShieldCheck, IconSparkles, IconUsers, IconBriefcase } from "@tabler/icons-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans selection:bg-[#e15b3e]/20 selection:text-[#e15b3e]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth?mode=login" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
            Sign In
          </Link>
          <Link href="/auth?mode=signup" className="px-4 py-2 rounded-xl bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d] transition-all">
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            About Rippl Infrastructure
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Building Africa's Referral & Affiliate Growth Engine
          </h1>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Rippl is built specifically for emerging markets — empowering both online e-commerce stores and offline neighbourhood supermarkets with automated referral tracking and instant bank cashouts.
          </p>
        </div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#e15b3e] flex items-center justify-center font-bold">
              <IconSparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base text-slate-900">Online + Offline Reach</h3>
            <p className="text-xs text-slate-500 font-light leading-normal">
              Whether you sell on Shopify or run a physical supermarket, Rippl connects referral links, QR code cards, and POS checkout verification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
              <IconShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base text-slate-900">Anti-Fraud Engine</h3>
            <p className="text-xs text-slate-500 font-light leading-normal">
              Real-time device fingerprinting and velocity anomaly checks prevent double-counting and fraudulent commission payouts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <IconUsers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base text-slate-900">Instant NIP Cashouts</h3>
            <p className="text-xs text-slate-500 font-light leading-normal">
              Ambassadors receive cleared commissions directly into any Nigerian bank account via automated Paystack/NIP rails.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
