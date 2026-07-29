"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight, IconBook } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const articles = [
    {
      category: "Merchant Guide",
      title: "How Physical Retailers in Lagos Are Scaling Foot Traffic 3x via QR Codes",
      summary: "Learn how supermarket chains use printable QR cards to turn cashiers and local influencers into active sales channels.",
      date: "May 2026",
      readTime: "5 min read"
    },
    {
      category: "Ambassador Tips",
      title: "5 Ways Creator Ambassadors Earn Consistent Income with Sub-24h NIP Payouts",
      summary: "Discover top-performing WhatsApp broadcast strategies and custom link placement techniques for Nigerian creators.",
      date: "May 2026",
      readTime: "4 min read"
    },
    {
      category: "E-Commerce",
      title: "Shopify & WooCommerce Referral Attribution without Cookie Loss in 2026",
      summary: "How double-cookie validation and server-side webhook fallbacks maintain 100% referral accuracy.",
      date: "Apr 2026",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="blog" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.11 — Rippl Blog & Growth Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Merchant Growth Guides & Ambassador Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Case studies, technical setup guides, and earning strategies for African commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item, idx) => (
            <article key={idx} className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{item.summary}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>{item.date} • {item.readTime}</span>
                <span className="text-[#e15b3e] font-bold flex items-center gap-1">Read &rarr;</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
