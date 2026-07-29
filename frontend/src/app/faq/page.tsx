"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FAQPage() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  const faqs = [
    { category: "Compliance & NDPR", q: "Is this legal and compliant in Nigeria?", a: "Yes. Rippl is fully NDPR data compliant and operates payout clearances securely integrated with CBN-licensed central platforms like Paystack and Flutterwave." },
    { category: "Offline Commerce", q: "How does referral tracking work for physical supermarkets and offline stores without a website?", a: "Rippl generates printable QR code cards and short referral codes (e.g. JOHN-REF-01) for your cashiers to scan or confirm at point of sale, rewarding ambassadors instantly." },
    { category: "Payout Speeds", q: "How fast do creator ambassadors receive cashouts?", a: "Affiliates receive direct bank cashout transfers via NIBSS e-payments instantly in under 24 hours once merchant clearances clear." },
    { category: "Anti-Fraud Engine", q: "What if someone tries to cheat or self-refer?", a: "Our zero-trust anti-fraud engine performs device fingerprinting, logs IP velocity scopes, double-cookie checks, and triggers progressive BVN verification to block self-referrals automatically." },
    { category: "Integrations", q: "What integration options are supported?", a: "We support drop-in Javascript tracking pixels for Shopify and WooCommerce, REST Webhook APIs for custom React/SaaS apps, and physical QR cards for offline shops." },
    { category: "Plans & Billing", q: "Can I upgrade or downgrade my plan at any time?", a: "Yes. You can manage subscription plans, change billing preferences, or download FIRS/NDPR tax invoices directly from your Business Admin settings." }
  ];

  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="faq" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-slate-100 text-slate-700 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.09 — Frequently Asked Questions
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Everything You Need To Know</h1>
          <p className="text-xs text-slate-500 font-light max-w-xs mx-auto">
            Categorized queries covering payments, compliance, anti-fraud, and offline QR tracking.
          </p>
        </div>

        <div className="space-y-3.5 max-w-2xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = activeFaqIdx === i;
            return (
              <div 
                key={i} 
                className={`bg-white rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                  isOpen ? "border-[#e15b3e]/30 shadow-md shadow-slate-100" : "border-slate-200/50 hover:border-slate-350"
                }`}
              >
                <button
                  onClick={() => setActiveFaqIdx(isOpen ? null : i)}
                  className="w-full p-5 flex justify-between items-center gap-4 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                      {faq.category}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <IconChevronDown 
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#e15b3e]" : ""
                    }`}
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[160px] border-t border-slate-100/60" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-slate-500 font-light text-[11px] leading-relaxed bg-slate-50/30">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
