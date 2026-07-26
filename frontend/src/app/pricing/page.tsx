"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

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

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Transparent NGN Pricing
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Plans Built For Growth</h1>

          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="w-12 h-6 rounded-full bg-slate-200 p-1 flex items-center transition-all"
            >
              <div className={`w-4 h-4 rounded-full bg-[#e15b3e] transition-transform ${billingCycle === "annual" ? "translate-x-6" : ""}`}></div>
            </button>
            <span className={`text-xs font-semibold ${billingCycle === "annual" ? "text-slate-900" : "text-slate-400"}`}>
              Annual <span className="text-[9px] text-[#e15b3e] font-bold bg-[#fcece9] px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: billingCycle === "annual" ? "₦12,000" : "₦15,000", desc: "For new online & offline stores launching referral programs.", features: ["Up to 50 Ambassadors", "Online Pixel Tracking", "Offline QR Codes", "Paystack Payout Integration"] },
            { name: "Growth", price: billingCycle === "annual" ? "₦36,000" : "₦45,000", popular: true, desc: "For scaling businesses expanding brand ambassador reach.", features: ["Up to 500 Ambassadors", "Automated POS Sales Logging", "3-Tier KYC Verification", "Fraud Anomaly Detection Engine"] },
            { name: "Pro Enterprise", price: billingCycle === "annual" ? "₦96,000" : "₦120,000", desc: "For major retailers, banks, and telcos with custom APIs.", features: ["Unlimited Ambassadors", "Dedicated Account Manager", "White-label Custom Domain", "Custom REST Webhooks"] }
          ].map((plan, i) => (
            <div key={i} className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 ${plan.popular ? "bg-white border-[#e15b3e] shadow-lg ring-1 ring-[#e15b3e]" : "bg-white border-slate-100 shadow-sm"}`}>
              <div className="space-y-4">
                {plan.popular && <span className="text-[9px] bg-[#e15b3e] text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Most Popular</span>}
                <h3 className="font-semibold text-lg text-slate-900">{plan.name}</h3>
                <p className="text-2xl font-bold text-slate-900">{plan.price} <span className="text-xs text-slate-400 font-normal">/month</span></p>
                <p className="text-xs text-slate-500 font-light">{plan.desc}</p>
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <IconCheck className="w-4 h-4 text-green-600" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/auth?mode=signup" className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold text-center">
                Select {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
