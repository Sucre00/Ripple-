"use client";

import React from "react";
import Link from "next/link";
import { IconSparkles, IconShieldCheck, IconUsers, IconBuildingBank } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="about" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            About Rippl Infrastructure
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Building Africa's Referral Growth Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Rippl is built specifically for emerging markets — empowering both online e-commerce stores and offline neighbourhood supermarkets with automated referral tracking and instant bank cashouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <IconSparkles className="w-6 h-6 text-[#e15b3e]" />
            <h3 className="font-bold text-base text-slate-900">Online + Offline Reach</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Shopify links or physical store QR code cards — unified in one system.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <IconShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900">Zero-Trust Fraud Engine</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Device fingerprinting, velocity tracking, and automated BVN verification prevent fraud.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
            <IconBuildingBank className="w-6 h-6 text-purple-600" />
            <h3 className="font-bold text-base text-slate-900">Instant NIP Cashouts</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Ambassadors cash out directly to any Nigerian bank in under 24 hours.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
