"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "How does offline referral tracking work for physical stores?", a: "Offline businesses generate printable QR code cards and short referral codes for their ambassadors. When a customer visits the store, staff scan the QR code or enter the code into their POS terminal to verify the referral and attribute commission." },
    { q: "How quickly do ambassadors receive their cashout payments?", a: "Cleared commissions are processed within 24 hours directly into any registered Nigerian bank account via automated Paystack/NIP rails. Minimum cashout is ₦2,000." },
    { q: "What documents are required for merchant KYC verification?", a: "Merchants submit their CAC registration certificate, director government-issued ID (NIN/Voter Card/Passport), and business logo to unlock full wallet withdrawal limits." },
    { q: "How does Rippl prevent double-counting and referral fraud?", a: "Rippl's anti-fraud engine uses device fingerprinting, IP velocity monitoring, and cookie-stuffing detection algorithms to flag suspicious conversions before commission clearance." }
  ];

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

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Got Questions? We Have Answers.</h1>
        </div>

        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-4 text-left font-semibold text-xs text-slate-900 flex justify-between items-center"
              >
                <span>{f.q}</span>
                <IconChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? "rotate-180" : ""}`} />
              </button>
              {openIdx === idx && (
                <div className="p-4 pt-0 text-xs text-slate-500 font-light leading-relaxed border-t border-slate-50">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
