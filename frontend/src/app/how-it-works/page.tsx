"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  IconArrowRight, 
  IconBriefcase, 
  IconUsers, 
  IconFileCode, 
  IconShare, 
  IconBuildingBank, 
  IconQrcode, 
  IconShieldCheck, 
  IconChartBar, 
  IconWallet
} from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState<"merchants" | "ambassadors">("merchants");

  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="how-it-works" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Step-by-Step Workflow Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How Rippl Powers Online & In-Store Referral Growth
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Select your role below to explore how business merchants and creator ambassadors collaborate seamlessly from campaign launch to sub-24h bank settlement.
          </p>

          {/* Interactive Role Switcher Toggle */}
          <div className="inline-flex bg-white p-1.5 rounded-full border border-slate-200/80 max-w-[340px] mx-auto shadow-sm mt-6">
            <button
              onClick={() => setActiveRole("merchants")}
              className={`px-6 py-2.5 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${
                activeRole === "merchants"
                  ? "bg-[#e15b3e] text-white shadow-md shadow-[#e15b3e]/20"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <IconBriefcase className="w-4 h-4" />
              For Businesses
            </button>
            <button
              onClick={() => setActiveRole("ambassadors")}
              className={`px-6 py-2.5 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${
                activeRole === "ambassadors"
                  ? "bg-[#e15b3e] text-white shadow-md shadow-[#e15b3e]/20"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <IconUsers className="w-4 h-4" />
              For Affiliates
            </button>
          </div>
        </div>

        {/* Step-by-Step Workflow Content Grid */}
        <div className="space-y-6 max-w-4xl mx-auto pt-2">
          {activeRole === "merchants" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Merchant Step 1 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center">
                    <IconFileCode className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#e15b3e] font-mono bg-[#fcece9] px-3 py-1 rounded-full">
                    STEP 01
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Install Pixel or POS QR Cards</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Embed our lightweight tracking script on Shopify/WooCommerce checkouts, or generate printable QR code cards for physical store cashiers and till scanning.
                  </p>
                </div>
              </div>

              {/* Merchant Step 2 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <IconShare className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-purple-700 font-mono bg-purple-50 px-3 py-1 rounded-full">
                    STEP 02
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Set Commission & Anti-Fraud Rules</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Define flat rates or percentage commissions per product category, set cookie clearance windows, and enable zero-trust BVN anti-fraud protection.
                  </p>
                </div>
              </div>

              {/* Merchant Step 3 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <IconChartBar className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono bg-blue-50 px-3 py-1 rounded-full">
                    STEP 03
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Recruit Brand Ambassadors</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Publish your campaign to the Rippl Marketplace or send direct invite links to influencers, customer advocates, and store staff to start sharing.
                  </p>
                </div>
              </div>

              {/* Merchant Step 4 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <IconBuildingBank className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-3 py-1 rounded-full">
                    STEP 04
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Automated NIP Bank Settlement</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Once referred orders pass your holding window, cleared commissions resolve automatically into available reserve balances with zero spreadsheet hassle.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Affiliate Step 1 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center">
                    <IconUsers className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#e15b3e] font-mono bg-[#fcece9] px-3 py-1 rounded-full">
                    STEP 01
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Free Sign Up & Quick KYC</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Create your creator ambassador account in under 60 seconds with zero upfront fees, complete progressive BVN KYC, and browse top verified campaigns.
                  </p>
                </div>
              </div>

              {/* Affiliate Step 2 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <IconQrcode className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-purple-700 font-mono bg-purple-50 px-3 py-1 rounded-full">
                    STEP 02
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Grab UTM Links & Physical QR Cards</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Generate unique affiliate tracking links for WhatsApp, Instagram, or TikTok, or request printable QR cards for in-person physical store promotion.
                  </p>
                </div>
              </div>

              {/* Affiliate Step 3 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <IconShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono bg-blue-50 px-3 py-1 rounded-full">
                    STEP 03
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Track Live Conversions</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Monitor clicks, pending sales, and cleared commissions in real-time from your personal affiliate mobile portal with full transparency.
                  </p>
                </div>
              </div>

              {/* Affiliate Step 4 */}
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <IconWallet className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-3 py-1 rounded-full">
                    STEP 04
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900">Sub-24h NIP Bank Cashouts</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Request cashout withdrawals directly to any Nigerian bank account. Cleared funds transfer directly into your account in under 24 hours.
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Action Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-10 text-center space-y-5 max-w-3xl mx-auto shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Ready to Launch or Earn?</h2>
          <p className="text-xs text-slate-500 font-light max-w-md mx-auto leading-relaxed">
            Join hundreds of Nigerian businesses and creator ambassadors scaling referral commerce today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              href="/auth?role=business_admin" 
              className="px-6 py-3.5 rounded-full bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d] transition-all shadow-md shadow-[#e15b3e]/20 inline-flex items-center justify-center gap-1.5"
            >
              <IconBriefcase className="w-4 h-4" />
              Launch Merchant Campaign <IconArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/auth?role=affiliate" 
              className="px-6 py-3.5 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-1.5"
            >
              <IconUsers className="w-4 h-4 text-[#e15b3e]" />
              Become Creator Ambassador
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
