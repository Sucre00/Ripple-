"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight, IconSparkles, IconQrcode, IconShieldCheck, IconBuildingBank } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="how-it-works" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.05 — How Rippl Works
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How Rippl Powers Online & In-Store Referral Growth
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            From initial campaign creation to instant automated NIP bank settlement — here is how merchants and ambassadors collaborate seamlessly.
          </p>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            { step: "01", icon: IconSparkles, title: "Launch Campaign", desc: "Merchants create referral programs selecting online pixel tracking or physical store QR code cards." },
            { step: "02", icon: IconShieldCheck, title: "Recruit Ambassadors", desc: "Share campaign marketplace links or invite brand ambassadors directly to join with 3-tier lazy KYC." },
            { step: "03", icon: IconQrcode, title: "Attribute Conversions", desc: "Customers convert online via tracking pixel or in-store by scanning the ambassador's QR code card at POS till." },
            { step: "04", icon: IconBuildingBank, title: "Instant NIP Bank Cashouts", desc: "Cleared commissions trigger automated Paystack NIP bank transfers directly into ambassador bank accounts in under 24h." }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex items-start gap-6">
                <span className="text-2xl font-bold text-[#e15b3e] font-mono shrink-0">{item.step}</span>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#e15b3e]" />
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Ready to Get Started?</h2>
          <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
            Launch your campaign or become a creator ambassador in less than 2 minutes.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/auth?role=business_admin" className="px-6 py-3 rounded-full bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d] transition-all shadow-md shadow-[#e15b3e]/20 inline-flex items-center gap-1.5">
              Launch Merchant Campaign <IconArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auth?role=affiliate" className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all">
              Become Ambassador
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
