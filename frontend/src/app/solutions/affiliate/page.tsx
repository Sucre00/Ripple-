"use client";

import React from "react";
import Link from "next/link";
import { IconUsers, IconWallet, IconCheck, IconShare } from "@tabler/icons-react";

export default function AffiliateSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-7 w-auto" />
        </Link>
        <Link href="/auth?mode=signup&role=affiliate" className="px-4 py-2 rounded-xl bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d]">
          Join As Ambassador
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Solutions For Brand Ambassadors & Creators
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Earn Commissions By Sharing What You Love</h1>
          <p className="text-xs text-slate-500 font-light max-w-xl mx-auto">
            Monetize your social media audience or offline networks. Get paid within 24 hours directly into any Nigerian bank account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <IconShare className="w-6 h-6 text-[#e15b3e]" />
            <h3 className="font-semibold text-sm text-slate-900">Multi-Channel Sharing</h3>
            <p className="text-xs text-slate-500 font-light">Custom short links with UTM generators for WhatsApp, Instagram, TikTok, and Twitter/X.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <IconWallet className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-sm text-slate-900">Instant NIP Payouts</h3>
            <p className="text-xs text-slate-500 font-light">Minimum ₦2,000 cashouts transferred directly into your registered bank account via Paystack.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <IconUsers className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-sm text-slate-900">Leaderboard Rewards</h3>
            <p className="text-xs text-slate-500 font-light">Top ambassador leaderboard tiers (Silver, Gold, Platinum) with bonus payouts.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
