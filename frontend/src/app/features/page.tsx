"use client";

import React from "react";
import Link from "next/link";
import { IconQrcode, IconShieldCheck, IconWallet, IconReportAnalytics, IconSparkles, IconBuildingBank, IconArrowRight } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="features" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.03 — Platform Features
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Full Platform Capabilities</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Automated tracking, offline POS QR cards, zero-trust fraud protection, and sub-24h bank settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center">
              <IconSparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Online Pixel & REST Webhooks</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Drop-in Javascript tracking pixel for Shopify, WooCommerce, or custom React apps with real-time conversion callbacks.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <IconQrcode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Offline Point-Of-Sale QR Verification</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Printable QR code cards & store till camera scanning for physical supermarket and retail sales.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <IconShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Zero-Trust Fraud Prevention Engine</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Device fingerprinting, velocity tracking, double-cookie checks, and automated BVN verification to block self-referrals.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <IconBuildingBank className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Sub-24h NIP Bank Settlement</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Direct integration with NIBSS e-payments for sub-24h affiliate cashouts into any Nigerian bank account.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Explore Rippl Platform Specs</h2>
          <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
            Experience our growth infrastructure built specifically for emerging market commerce.
          </p>
          <div className="pt-2">
            <Link href="/auth?mode=signup" className="px-6 py-3 rounded-full bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d] transition-all shadow-md shadow-[#e15b3e]/20 inline-flex items-center gap-1.5">
              Get Started Now <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
