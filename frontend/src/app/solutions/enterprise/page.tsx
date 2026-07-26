"use client";

import React from "react";
import Link from "next/link";
import { IconShieldCheck, IconFileCode, IconBuildingBank } from "@tabler/icons-react";

export default function EnterpriseSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-7 w-auto" />
        </Link>
        <Link href="/contact" className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black">
          Contact Enterprise Sales
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            White-Label & Custom API Solutions
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Infrastructure For Banks, Telcos, & Major Retailers</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <IconBuildingBank className="w-6 h-6 text-slate-900" />
            <h3 className="font-semibold text-sm text-slate-900">Custom Domain White-Labeling</h3>
            <p className="text-xs text-slate-500 font-light">Host the ambassador portal on your domain (e.g. referral.yourcompany.com) with brand styling.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <IconFileCode className="w-6 h-6 text-[#e15b3e]" />
            <h3 className="font-semibold text-sm text-slate-900">Dedicated REST Webhooks</h3>
            <p className="text-xs text-slate-500 font-light">Direct server-to-server webhook events with HMAC signature validation for core banking sync.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <IconShieldCheck className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-sm text-slate-900">Enterprise SLA & Account Manager</h3>
            <p className="text-xs text-slate-500 font-light">99.9% uptime SLA guarantee with dedicated account engineer support.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
