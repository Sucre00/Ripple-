"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconCheck, IconArrowRight } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="pricing" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-slate-900 text-white px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.04 — NGN Pricing Matrix
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Flexible SaaS Pricing Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xs mx-auto">
            Choose the right plan for your online shop or physical retail chain.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/50 max-w-[220px] mx-auto shadow-inner mt-4">
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-6 py-1.5 text-[10px] font-bold rounded-full transition-all ${
                billingCycle === "annually" ? "bg-[#e15b3e] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Yearly (Save 15%)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-1.5 text-[10px] font-bold rounded-full transition-all ${
                billingCycle === "monthly" ? "bg-[#e15b3e] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Starter Plan */}
          <div className="h-full bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="p-6 text-left flex flex-col justify-between min-h-[220px] bg-white">
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">Starter Plan</h4>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                  For emerging online shops & single-branch stores.
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-3xl font-extrabold text-slate-950 leading-none">
                  {billingCycle === "monthly" ? "₦15,000" : "₦12,750"}{" "}
                  <span className="text-[10px] text-slate-400 font-light">/month</span>
                </p>
                <Link
                  href="/auth"
                  className="w-full block py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold text-center rounded-xl transition-all active:scale-[0.98]"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
            <div className="p-6 bg-slate-50 text-left border-t border-slate-200/50 flex-grow flex flex-col gap-4">
              <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Includes:</h5>
              <div className="space-y-3.5 text-xs text-slate-650 font-medium">
                {[
                  "Up to 50 active ambassadors",
                  "Shopify & WooCommerce pixel tracking",
                  "Standard email & chat support",
                  "Paystack & Flutterwave NIP clearances"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Growth Plan */}
          <div className="h-full bg-white rounded-3xl border-2 border-[#e15b3e] shadow-xl flex flex-col justify-between overflow-hidden relative">
            <div className="p-6 text-left flex flex-col justify-between min-h-[220px] bg-white relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                <span className="bg-[#e15b3e] text-white text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Most Popular</span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-1">Growth Plan</h4>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                  For growing retail chains & active ambassador networks.
                </p>
              </div>
              <div className="mt-4 space-y-4 relative z-10">
                <p className="text-3xl font-extrabold text-slate-950 leading-none">
                  {billingCycle === "monthly" ? "₦45,000" : "₦38,250"}{" "}
                  <span className="text-[10px] text-slate-400 font-light">/month</span>
                </p>
                <Link
                  href="/auth"
                  className="w-full block py-2.5 bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-bold text-center rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#e15b3e]/10"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="p-6 bg-[#e15b3e] text-left flex-grow flex flex-col gap-4">
              <h5 className="text-[10px] font-bold text-[#fcece9] uppercase tracking-wide">Includes:</h5>
              <div className="space-y-3.5 text-xs text-white font-medium">
                {[
                  "Up to 500 active ambassadors",
                  "Printable POS QR cards & till scanning",
                  "Sub-24h NIBSS NIP bank transfers",
                  "Device fingerprinting & anti-fraud",
                  "BVN progressive KYC validation"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-white shrink-0" />
                    <span className="text-[10px] text-[#fcece9] font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Pro Enterprise Plan */}
          <div className="h-full bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="p-6 text-left flex flex-col justify-between min-h-[220px] bg-white">
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">Pro Enterprise Plan</h4>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                  For high-volume merchants with custom domain white-labeling.
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-3xl font-extrabold text-slate-950 leading-none">
                  {billingCycle === "monthly" ? "₦120,000" : "₦102,000"}{" "}
                  <span className="text-[10px] text-slate-400 font-light">/month</span>
                </p>
                <Link
                  href="/auth"
                  className="w-full block py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold text-center rounded-xl transition-all active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="p-6 bg-slate-50 text-left border-t border-slate-200/50 flex-grow flex flex-col gap-4">
              <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Includes:</h5>
              <div className="space-y-3.5 text-xs text-slate-650 font-medium">
                {[
                  "Unlimited active ambassadors & campaigns",
                  "Custom domain white-labeling",
                  "Dedicated SLA account manager",
                  "Custom webhook event triggers",
                  "FIRS, CBN, and NDPR compliance tax exports"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
